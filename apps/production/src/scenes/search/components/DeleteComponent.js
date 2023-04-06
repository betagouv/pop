import React, { useState, useEffect } from "react";
import { CustomWidget } from "@popproject/pop-react-elasticsearch";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { es_url } from "../../../config";
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
          return ["mh", "admin", "inv"];
        case "memoire":
          return ["mh", "memoire", "admin"];
        default:
          return [collection, "admin"];
      }
    }
    return (
      role === "administrateur" &&
      ["joconde", "merimee", "palissy", "mnr", "memoire", "autor"].includes(collection) &&
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
  async function confirmDeletion() {
    // Can not delete if there is no authorization restriction on any of these notices.
    const notices = widgetResult.result.data;
    for (let i in notices) {
      const notice = notices[i];
      const producteur = notice._source.PRODUCTEUR;
      // The longest "if" clause of history

      //M42397 dynamisation du contrôle du producteur en fonction du group
      if(group != "admin"){
        const respProducteurs = await API.getGroupByLabel(group).then((resp) => {
          return resp.group.PRODUCTEURS;
        }).catch((e) => { console.log('error group', e)});
        
        if(respProducteurs){
          if(!respProducteurs.includes(producteur)){
            const alertText =
              `En tant qu'administrateur du groupe "${group}", vous ne pouvez pas supprimer ` +
              `des notices de "${collection}" dont le producteur est "${producteur}".`;
            toastr.error(alertText);
            return;
          }
        }
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
    // Delete data with query, using scroll API.
    async function deleteData(query) {
      let docs = [];
      const headers = {
        Accept: "application/json",
        "User-Agent": "POP Prod",
        "Content-Type": "application/x-ndjson"
      };

      try {
        // First "iteration", send parameters, and get results + scroll_id.
        let rawResponse = await fetch(`${es_url}/scroll?index=${collection}`, {
          method: "POST",
          headers,
          body: `${JSON.stringify({ query, size: 1000 })}\n`
        });
        let response = await rawResponse.json();
        const scrollId = response._scroll_id;
        let hits = response.hits.hits.map(e => e._source.REF);
        docs = hits;

        // Next iterations, send scroll_id, get results.
        while (hits && hits.length) {
          rawResponse = await fetch(`${es_url}/scroll?scroll_id=${scrollId}`, {
            method: "POST",
            headers
          });
          response = await rawResponse.json();
          hits = response.hits.hits.map(e => e._source.REF);
          docs = [...docs, ...hits];
        }

        // Delete all.
        for (let i in docs) {
          await API.deleteNotice(collection, docs[i]);
          await API.createDeleteHistorique(docs[i], collection);
        }

        // Success, end process.
        let message =
          total === 1 ? `1 notice a été supprimée.` : `${total} notices ont été supprimées.`;
        toastr.success(`${message} Cela sera visible dans 1 à 5 min en diffusion.`);
        onFinish();
      } catch (e) {
        // Fail.
        toastr.warning(`Erreur lors de la suppression. ${JSON.stringify(e)}`);
        onFinish();
      }
    }

    const queries = [];
    for (let w of ctx.widgets.values()) {
      if (w && w.query) {
        queries.push(w.query);
      }
    }
    const query = { bool: { must: queries.length === 0 ? { match_all: {} } : queries } };
    deleteData(query);
  }, []);
  return <>Suppression de {total} notices en cours…</>;
}

function mapStateToProps({ Auth }) {
  const { role, group } = Auth.user;
  return { role, group };
}

export default connect(
  mapStateToProps,
  {}
)(DeleteComponent);
