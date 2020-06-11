import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import "./accordionHistorique.css";
import { Table } from "reactstrap";

export default class AccordionHistorique extends React.Component {
    constructor(props){
        super(props);
        this.state = {historique: this.props.historique}
    }

    triByNom(a,b){ return (a.nom > b.nom)?1:-1;}
    triByPrenom(a,b){ return (a.prenom > b.prenom)?1:-1;}
    triByEmail(a,b){ return (a.email > b.email)?1:-1;}
    triByMoyen(a,b){ return (a.updateMode > b.updateMode)?1:-1;}
    triByDate(a,b){ 
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return (dateA > dateB)?1:-1;
    }

    sort(mode){
        let historique = this.state.historique;
        switch(mode){
            case "nom":
                historique.sort(this.triByNom);
                break;
            case "prenom":
                historique.sort(this.triByPrenom);
                break;
            case "email":
                historique.sort(this.triByEmail);
                break;
            case "date":
                historique.sort(this.triByDate);
                break;
            case "updateMode":
                historique.sort(this.triByMoyen);
                break;
            default:
                return null;
        }
        this.setState({historique: historique});
    }
    
    render() {
        return (
            this.state.historique.length > 0 &&
            <div className="historique">
                <Accordion allowZeroExpanded={true}>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Historique
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <Table>
                                <thead className="historiqueHeader">
                                    <tr className="historiqueTitles">
                                        <th className="historiqueTitle" onClick={() => this.sort("nom")}>Nom</th>
                                        <th className="historiqueTitle" onClick={() => this.sort("prenom")}>Prenom</th>
                                        <th className="historiqueTitle" onClick={() => this.sort("email")}>Email</th>
                                        <th className="historiqueTitle" onClick={() => this.sort("updateMode")}>Moyen</th>
                                        <th className="historiqueTitle" onClick={() => this.sort("date")}>Date de modification</th>
                                    </tr>
                                </thead>
                                <tbody className="historiqueBody">
                                    {this.state.historique.map( item => {
                                        return(
                                            <tr className="historiqueRow">
                                                <td>{item.nom}</td>
                                                <td>{item.prenom}</td>
                                                <td>{item.email}</td>
                                                <td>{item.updateMode}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
      );
    }
  }