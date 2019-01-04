import React, { Component } from "react";
import { Input, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";
import api from "../../services/api";

import "./index.css";

export default class ImportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arc: "",
      done: false,
      loading: false,
      error: "",
      messages: []
    };
  }

  addMessage(message, edit = false) {
    console.log("MESSAGE", message);
    if (edit) {
      const messages = [...this.state.messages];
      messages[messages.length - 1] = message;
      this.setState({
        messages
      });
    } else {
      this.setState({
        messages: [...this.state.messages, message]
      });
    }
  }

  async onUpdate() {
    try {
      this.setState({
        loading: true
      });
      this.addMessage("Ne fermez pas cette page");
      this.addMessage(`Récupération des "top" concepts`);
      const topconctps = await api.getTopConceptsByThesaurusId(this.state.arc);
      this.addMessage(
        `Récupération de  ${topconctps.length} "top" concepts...`
      );
      this.addMessage(`Récupération des concepts enfants`);
      let allconcepts = [];
      for (let i = 0; i < topconctps.length; i++) {
        const childs = await api.getAllChildrenConcept(topconctps[i]);
        allconcepts.push(...childs);
        this.addMessage(
          `Récupération de ${allconcepts.length} concepts enfants...`,
          true
        );
      }
      this.addMessage(`Récupération des termes préférés...`);
      const terms = [];
      for (let i = 0; i < allconcepts.length; i++) {
        const childs = await api.getPreferredTermByConceptId(allconcepts[i]);
        terms.push(...childs);
        this.addMessage(`Récupération de ${terms.length} termes...`, true);
      }
      this.addMessage(`Suppression des anciennes valeurs thesaurus`);
      await api.deleteAllThesaurus(this.state.arc);
      this.addMessage(`Ajout des thésaurus dans la base`);

      while (terms.length) {
        const tmp = terms.splice(0, 100);
        await api.createThesaurus(this.state.arc, { terms: tmp });
        this.addMessage(
          `${terms.length} Thésaurus restant à ajouter dans la base`,
          true
        );
      }
      this.setState({ loading: false, done: true });
      this.addMessage(`FIN ! `, true);
    } catch (e) {
      console.log("ERROR", e);
      this.setState({ loading: false, done: true, error: "error" });
    }
  }

  render() {
    const messages = this.state.messages.map(e => <div key={e}>{e}</div>);

    if (this.state.loading) {
      return (
        <div className="import-container">
          <Container>
            <Loader />
            <div>{messages}</div>
          </Container>
        </div>
      );
    }

    if (this.state.done) {
      return (
        <div className="import-container">
          <div>{messages}</div>
          <Link to="/">Revenir a la page d'accueil</Link>
        </div>
      );
    }

    return (
      <Container className="thesaurus">
        <div className="inputzone">
          <Input
            onChange={e => this.setState({ arc: e.target.value })}
            value={this.state.arc}
            placeholder="http://data.culture.fr/thesaurus/resource/ark:/67717/T84"
          />
          <Button color="primary" onClick={this.onUpdate.bind(this)}>
            Update
          </Button>
        </div>
        <div>{this.state.error}</div>
      </Container>
    );
  }
}
