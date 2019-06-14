import React, { useState, useEffect } from "react";
import { CustomWidget } from "react-elasticsearch";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import API from "../../../services/api";

// The main component. It can display nothing, a button or a loader according to its state.
function DeleteComponent({ role, group, collection }) {
  const [deleting, setDeleting] = useState(false);

  // This component is only visible for admins in the allowed group.
  function deleteComponentVisible({ role, group, collection }) {
    // Map collection to groups, get allowed groups list.
    function allowedGroups(collection) {
      switch (collection) {
        case "palissy":
        case "merimee":
          return ["mh", "admin"];
        case "memoire":
          return ["mh", "memoire", "admin"];
        default:
          return [collection, "admin"];
      }
    }
    return (
      role === "administrateur" &&
      ["joconde", "merimee", "palissy", "mnr", "memoire"].includes(collection) &&
      allowedGroups(collection).includes(group)
    );
  }

  if (!deleteComponentVisible({ role, group, collection })) {
    return null;
  }

  // Deleting in progress.
  if (deleting) {
    return (
      <CustomWidget>
        <DeleteProcessor onFinish={() => setDeleting(false)} collection={collection} />
      </CustomWidget>
    );
  }

  // Display the button.
  return (
    <CustomWidget>
      <DeleteButton onConfirm={() => setDeleting(true)} group={group} collection={collection} />
    </CustomWidget>
  );
}

// The delete button component. Handles confirmaton and some autorizations checks.
function DeleteButton({ onConfirm, ctx, group, collection }) {
  const widgetResult = ctx.widgets.get("result");
  if (!(widgetResult && widgetResult.result && widgetResult.result.total > 0)) {
    return null;
  }
  // Confirmation handler.
  function confirmDeletion() {
    // Can not delete if there is no authorization restriction on any of these notices.
    const notices = widgetResult.result.data;
    for (let i in notices) {
      const notice = notices[i];
      const producteur = notice._source.PRODUCTEUR;
      // The longest "if" clause of history
      if (
        // Merimee + palissy
        (["merimee", "palissy"].includes(collection) &&
          group === "mh" &&
          !["Monuments Historiques", "Etat", "Autre"].includes(producteur)) ||
        // Memoire (groupe mh)
        (collection === "memoire" &&
          group === "mh" &&
          !["CRMH", "CAOA", "UDAP", "ETAT", "AUTRE", "MAP"].includes(producteur)) ||
        // Memoire (group memoire)
        (collection === "memoire" &&
          group === "memoire" &&
          !["MAP", "AUTRE"].includes(producteur)) ||
        // Memoire (group admin)
        (collection === "memoire" &&
          group === "admin" &&
          !["CRMH", "CAOA", "UDAP", "INV", "ETAT", "AUTRE", "MAP", "SDAP", ""].includes(producteur))
      ) {
        const alertText =
          `En tant qu'administrateur du groupe "${group}", vous ne pouvez pas supprimer ` +
          `des notices de "${collection}" dont le producteur est "${producteur}".`;
        toastr.error(alertText);
        return;
      }
    }
    // Can not delete if there is more than 100 items.
    if (widgetResult.result.total > 1000) {
      const alertText =
        `Vous ne pouvez pas supprimer plus de 1000 notices à la fois. ` +
        `${widgetResult.result.total} notices sont actuellement sélectionnées.`;
      toastr.error(alertText);
      return;
    }
    // Return the confirmation message.
    const confirmText =
      `Vous êtes sur le point de supprimer définitivement ${widgetResult.result.total} notices. ` +
      `Êtes-vous certain·e de vouloir continuer ?`;
    toastr.confirm(confirmText, { onOk: () => onConfirm() });
  }
  return (
    <button className="delete-collection" onClick={() => confirmDeletion()}>
      Supprimer
    </button>
  );
}

// The actual deletion module.
function DeleteProcessor({ ctx, onFinish, collection }) {
  const total = ctx.widgets.get("result").result.total;
  useEffect(() => {
    // A simple loop on data, delete each.
    async function deleteData() {
      const data = ctx.widgets.get("result").result.data;
      for (let i in data) {
        const notice = data[i];
        await API.deleteNotice(collection, notice._source.REF);
      }
      // Success, end process.
      let message =
        total === 1 ? `1 notice a été supprimée.` : `${total} notices ont été supprimées.`;
      toastr.success(`${message} Cela sera visible dans 1 à 5 min en diffusion.`);
      onFinish();
    }
    deleteData();
  }, []);
  return <>Supression de {total} notices en cours…</>;
}

function mapStateToProps({ Auth }) {
  const { role, group } = Auth.user;
  return { role, group };
}

export default connect(
  mapStateToProps,
  {}
)(DeleteComponent);
