import React from "react";

export default class ContactUs extends React.Component {
  render() {
    return (
      <a
        href={`mailto:${this.props.contact ||
          "pop.reseaux@gmail.com"}?subject=Demande à propos de la notice n°${this.props.REF}`}
        className="notice-btn"
        onClick={() => {
          amplitudeService.logEvent("notice_contact_us", {
            base: this.props.base || "",
            notice: this.props.REF
          });
        }}
      >
        Contactez-nous
      </a>
    );
  }
}
