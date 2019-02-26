import React from "react";

export default class ContactUs extends React.Component {
  render() {
    const subject = `subject=Demande à propos de la notice n°${this.props.reference}`;
    let mailTo;
    if (this.props.contact) {
      mailTo = `mailto:${this.props.contact}?${subject}&cc=pop.reseaux@gmail.com`;
    } else {
      mailTo = `mailto:pop.reseaux@gmail.com?${subject}`;
    }
    return (
      <a href={mailTo} className="notice-btn">
        Contactez-nous
      </a>
    );
  }
}
