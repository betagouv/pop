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
      <a
        href={mailTo}
        className="notice-btn"
        onClick={e =>
          amplitude
            .getInstance()
            .logEvent("notice_contact_us", { base: this.props.base, notice: this.props.REF })
        }
      >
        Contactez-nous
      </a>
    );
  }
}
