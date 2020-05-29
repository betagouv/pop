import React from "react";
import { Button } from "reactstrap";
import { toastr } from "react-redux-toastr";
import API from "../../../services/api";

export default class DeleteButton extends React.Component {
  delete() {
    const ref = this.props.noticeRef;
    const confirmText =
      `Vous êtes sur le point de supprimer la notice REF ${ref}. ` +
      `Êtes-vous certain·e de vouloir continuer ?`;
    const toastrConfirmOptions = {
      onOk: () => {
        API.deleteNotice(this.props.noticeType, ref).then(() => {
          API.createDeleteHistorique(ref, this.props.noticeType).then(() => {
            toastr.success(
              "Notice supprimée et historique de suppression sauvegardé",
              "La modification sera visible dans 1 à 5 min en diffusion"
            );
          });
        });
      }
    };
    toastr.confirm(confirmText, toastrConfirmOptions);
  }

  render() {
    return (
      <Button disabled={this.props.disabled} color="danger" onClick={() => this.delete()}>
        Supprimer
      </Button>
    );
  }
}
