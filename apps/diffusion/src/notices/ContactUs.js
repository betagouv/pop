import React from "react";

export default class ContactUs extends React.Component {
  render() {
    const subject = `subject=Demande à propos de la notice n°${this.props.REF}`;
    let mailTo;
    if (this.props.contact) {
      mailTo = `mailto:${this.props.contact}?${subject}&cc=pop@culture.gouv.fr`;
    } else {
      mailTo = `mailto:pop@culture.gouv.fr?${subject}`;
    }
    return (
      <div>
        <a href={mailTo} className="notice-btn onPrintHide">
          Contactez-nous
        </a>
        <div className="onPrintShow" style={{display: "none"}}>
          {"Contact : "}
          <a href={this.props.contact}>
            {this.props.contact}
          </a>
        </div>
      </div>
    );
  }
}
