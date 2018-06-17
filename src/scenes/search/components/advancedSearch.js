import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import { Modal, Button } from 'reactstrap';
import 'brace/mode/json';
import 'brace/theme/monokai';
import {
    ReactiveComponent,
} from '@appbaseio/reactivesearch';

import ExportComponent from './export';
import CustomButton from './button'

import './advancedSearch.css'

export default class Search extends React.Component {
    render() {
        return (
            <ReactiveComponent
                componentId="advancedSearch"   // a unique id we will refer to later
            >
                <CustomComponent />
            </ReactiveComponent>
        );
    }
}


class CustomComponent extends React.Component {

    state = {
        value: `{
            "query_string": {
                "query": "DENO:(église OR château) AND CONTIENT_IMAGE:oui"
            }
        }`,
        modal: false,
    }

    exec() {
        try {
            let query = JSON.parse(this.state.value);
            console.log('Set query', query)
            this.props.setQuery({ query });
        } catch (er) {
            console.log('ERR', err)
        };
    }

    render() {
        return (
            <div className='advancedSearch' >
                <ExistingScenario load={(value) => this.setState({ value, modal: false })} isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })} />
                <AceEditor
                    mode="json"
                    theme="monokai"
                    name="blah2"
                    height='300px'
                    width='600px'
                    showGutter={true}
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e })}
                    name="queryeditor"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
                <div>
                    <CustomButton icon={require('../../../assets/play.png')} text='Executer' onClick={this.exec.bind(this)} />
                    <CustomButton icon={require('../../../assets/load.png')} text='Charger des scenarios existants' onClick={() => this.setState({ modal: true })} />
                    <ExportComponent />
                </div>
            </div>
        );
    }
}


class ExistingScenario extends React.Component {
    constructor(props) {
        super(props);
        const scenarios = [
            {
                title: 'OR et AND',
                description: <div>Récupèration de toutes les notices dont la denomination est <b>tableau</b> ou <b>calice</b> et qui contiennent une <b>image</b> à l’aide de query_string </div>,
                query: `{
                    "query" : {
                        "query_string": {
                            "query": "DENO:(église OR château) AND CONTIENT_IMAGE:oui"
                        }
                    }
                }`
            },
            {
                title: 'Range, not et sort',
                description: <div>Récupèration de tous les tableaux créés entre <b>1980</b> et <b>1990</b> (DATE) et qui ne sont pas produits par <b>monument historique</b> et trier par ordre descendant du champs de leur <b>date d'enquête (DENQ)</b></div>,
                query: `
                { 
                    "query" : {
                      "bool": {
                        "must": [
                          {
                            "match": {
                              "DENO": "église"
                            }
                          },
                          {
                            "range": {
                              "DATE": {
                                "from": 1980,
                                "to": 1990
                              }
                            }
                          }
                        ],
                        "must_not": [
                          {
                            "match": {
                              "PRODUCTEUR": "Monument Historique"
                            }
                          }
                        ]
                      }
                    },
                    "sort": [
                      {
                        "DENQ.keyword": {
                          "order": "desc"
                        }
                      }
                      ]
                    }
                  
              `
            },
            {
                title: 'Regex',
                description: <div>Recupere toutes les notices qui match avec le <b>regex</b> sur le champs <b>deno</b>. C'est a dire toutes les dénominations qui contiennent le terme ca****</div>,
                query: `
                {
                    "query": {
                        "regexp": {
                        "DENO": "ca.*"
                        }
                    }
                }
                `
            },
            {
                title: 'Distance',
                description: <div>Affiche tous les <b>chateaux</b> et <b>églises</b> qui sont a moins de 200 km de Paris </div>,
                query: `
                {
                    "query": {
                        "bool": {
                            "should": [
                                {
                                    "term": {
                                    "DENO": "église"
                                    }
                                },
                                {
                                    "term": {
                                    "DENO": "château"
                                    }
                                }
                            ],
                            "filter": {
                            "geo_distance": {
                                "distance": "200km",
                                "location": {
                                "lat": 48.86,
                                "lon": 2.34
                                }
                            }
                        }
                    }
                }
              `
            },
            {
                title: 'Est dans une zone',
                description: <div>Afficher les <b>églises</b> qui sont contenues dans le polygon défini</div>,
                query: `
                {
                    "query" : {
                    "bool": {
                        "must": {
                          "match": {
                            "DENO": "eglise"
                          }
                        },
                        "filter": {
                          "geo_polygon": {
                            "location": {
                              "points": [
                                {
                                  "lat": 40,
                                  "lon": -70
                                },
                                {
                                  "lat": 30,
                                  "lon": -80
                                },
                                {
                                  "lat": 20,
                                  "lon": -90
                                }
                              ]
                            }
                          }
                        }
                      }
                    }
                }
              `
            },
        ]
        this.state = { scenarios, selected: 0 }
    }


    loadScenario() {
        this.props.load(this.state.scenarios[this.state.selected].query)
    }

    renderMenu() {
        const arr = [];
        for (var i = 0; i < this.state.scenarios.length; i++) {
            ((i) => {
                arr.push(
                    <div>
                        <Button onClick={() => { this.setState({ selected: i }) }} color='primary' outline={i !== this.state.selected}>{this.state.scenarios[i].title}</Button>
                    </div>
                )
            })(i)
        }

        return arr;
    }

    renderDescription() {
        const { description, query } = this.state.scenarios[this.state.selected];
        return (
            <div className='descriptionContainer'>
                <div>{query}</div>
                {description}
                <div className='buttons'>
                    <Button color='primary' onClick={this.loadScenario.bind(this)}>Charger</Button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Modal className='advancedSearchModal' size='lg' isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <div >
                    <h2>Charger des scenarios existants</h2>
                    <div className='searchContainer'>
                        <div className='menu'>
                            {this.renderMenu()}
                        </div>
                        <div>
                            {this.renderDescription()}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}