import React from "react";

export default class ContactUs extends React.Component {
  render() {
    return (
      <a
        href={`mailto:${this.props.contact ||
          "pop.reseaux@gmail.com"}?subject=Demande à propos de la notice n°${this.props.reference}`}
        className="notice-btn"
      >
        Contactez-nous
      </a>
    );
  }
}
