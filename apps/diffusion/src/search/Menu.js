import React from "react";
import { ActiveFilters, Facet } from "react-elasticsearch";
import { CollapsableFacet } from "./utils";

const Menu = ({ closeMenu, initialValues }) => (
  <aside className="search-filters-sidebar">
    <div className="close_mobile_menu" onClick={closeMenu}>
      x
    </div>
    <ActiveFilters
      id="af"
      items={(activeFilters, removeFilter) => (
        <ul>
          {activeFilters.map(({ key, value }) => {
            return (
              <li key={key}>
                <span>{`${key}: ${value}`}</span>
                <button onClick={() => removeFilter(key)}>x</button>
              </li>
            );
          })}
        </ul>
      )}
    />
    <h4>Affiner par</h4>
    <CollapsableFacet
      id="base"
      initialValue={initialValues.get("base")}
      items={(data, { handleChange, isChecked }) => {
        return data
          .filter(
            item =>
              item.key !== "Photographies (Mémoires)" &&
              item.key !== "Inventaire patrimoine mobilier (Palissy)"
          )
          .map(item => (
            <label key={item.key}>
              <input
                type="checkbox"
                checked={isChecked(item)}
                onChange={e => handleChange(item, e.target.checked)}
              />
              {item.key} ({item.doc_count})
            </label>
          ));
      }}
      itemsModifier={items =>
        items.filter(
          i =>
            i.key !== "Photographies (Mémoires)" &&
            i.key !== "Inventaire patrimoine mobilier (Palissy)"
        )
      }
      fields={["BASE.keyword"]}
      title="Base"
    />
    <CollapsableFacet
      id="producteur"
      initialValue={initialValues.get("producteur")}
      fields={["PRODUCTEUR.keyword"]}
      title="Producteur"
    />
    <CollapsableFacet
      id="auteur"
      initialValue={initialValues.get("auteur")}
      fields={["AUTP.keyword", "AUTR.keyword"]}
      title="Auteur"
    />
    <CollapsableFacet
      id="domn"
      initialValue={initialValues.get("domn")}
      fields={["DOMN.keyword", "CATE.keyword"]}
      title="Domaine"
    />

    <CollapsableFacet
      id="ou"
      initialValue={initialValues.get("ou")}
      fields={["REG.keyword", "COM.keyword", "LOCA.keyword"]}
      title="Où voir l'oeuvre ?"
    />
    <CollapsableFacet
      id="periode"
      initialValue={initialValues.get("periode")}
      fields={["PERI.keyword"]}
      title="Période"
    />
    <CollapsableFacet
      id="image"
      initialValue={initialValues.get("image")}
      fields={["CONTIENT_IMAGE.keyword"]}
      title="Contient une image"
    />
    <CollapsableFacet
      id="geolocalisation"
      initialValue={initialValues.get("geolocalisation")}
      fields={["POP_CONTIENT_GEOLOCALISATION.keyword"]}
      title="Est géolocalisée"
    />
    <div style={{ display: "none" }}>
      {initialValues.get("import") ? (
        <Facet
          id="import"
          initialValue={initialValues.get("import")}
          fields={["POP_IMPORT.keyword"]}
        />
      ) : null}
      {initialValues.get("museo") ? (
        <Facet id="museo" initialValue={initialValues.get("museo")} fields={["MUSEO.keyword"]} />
      ) : null}
      {initialValues.get("ref") ? (
        <Facet id="ref" initialValue={initialValues.get("ref")} fields={["REF.keyword"]} />
      ) : null}
    </div>
  </aside>
);

export default Menu;
