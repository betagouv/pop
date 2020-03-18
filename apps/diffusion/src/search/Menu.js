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
        <>
          {activeFilters.length ? <h4>Vos filtres</h4> : null}
          <ul>
            {activeFilters.map(({ key, value }) => {
              return (
                <li key={key} onClick={() => removeFilter(key)}>
                  <span>{`${key}: ${value}`}</span>
                  <button>✕</button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    />
    <h4>Affiner par</h4>

    <CollapsableFacet
      id="auteur"
      initialValue={initialValues.get("auteur")}
      fields={["AUTP.keyword", "AUTR.keyword"]}
      title="Auteur"
    />
    <CollapsableFacet
      id="domn"
      initialValue={initialValues.get("domn")}
      fields={["DOMN.keyword", "CATE.keyword", "DOMPAL.keyword"]}
      title="Domaine"
    />
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
      id="où"
      initialValue={initialValues.get("où")}
      fields={[
        "REG.keyword",
        "COM.keyword",
        "DPT.keyword",
        "DPT_LETTRE.keyword",
        "PAYS.keyword",
        "NOMOFF.keyword",
        "VILLE_M.keyword",
        "REGION.keyword",
        "NOMUSAGE.keyword"
      ]}
      title="Localisation"
    />
    <CollapsableFacet
      id="periode"
      initialValue={initialValues.get("periode")}
      fields={["PERI.keyword"]}
      title="Période"
    />
    <CollapsableFacet
      id="producteur"
      initialValue={initialValues.get("producteur")}
      fields={["PRODUCTEUR.keyword"]}
      title="Producteur"
    />
    <CollapsableFacet
      id="type"
      initialValue={initialValues.get("type")}
      fields={[
        "EDIF.keyword",
        "OBJT.keyword",
        "DENO.keyword",
        "PDEN.keyword",
        "APPL.keyword",
        "ACTU.keyword",
        "PARN.keyword",
        "UTIL.keyword"
      ]}
      title="Type de bien ou d'édifice"
    />
    <CollapsableFacet
      id="tech"
      initialValue={initialValues.get("tech")}
      fields={["TECH.keyword", "TYPDOC.keyword"]}
      title="Techniques"
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
    <CollapsableFacet
      id="manquant"
      initialValue={initialValues.get("manquant")}
      fields={["MANQUANT.keyword"]}
      title="Objets manquants ou volés"
    />
    <div style={{ display: "none" }}>
      {[
        ["import", "POP_IMPORT.keyword"],
        ["museo", "MUSEO.keyword"],
        ["ref", "REF.keyword"],
        ["expo", "EXPO.keyword"],
        ["deno", "DENO.keyword"],
        ["serie", "SERIE.keyword"],
        ["repr", "REPR.keyword"],
        ["util", "UTIL.keyword"]
      ].map(([value, field]) => {
        return (
          <CollapsableFacet
            key={value}
            id={value}
            initialValue={initialValues.get(value)}
            fields={[field]}
            title={value}
          />
        );
      })}
    </div>
    <style jsx global>{`
      .search-filters-sidebar {
        background-color: #fff;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
      }
      .search-filters-sidebar h4,
      .react-es-active-filters h4 {
        color: #19414c;
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 15px;
        text-align: center;
      }
      .react-es-active-filters ul {
        margin-block-start: 0;
        padding-inline-start: 0;
        margin-block-end: 1em;
      }
      .react-es-active-filters li {
        color: #19414c;
        font-weight: 400;
        font-size: 14px;
        width: 100%;
        margin-bottom: 5px;
        list-style: none;
        justify-content: space-between;
        background-color: transparent;
        position: relative;
        box-shadow: 1px 2px 2px 0 rgba(197, 197, 197, 0.5);
        border: 1px solid #d7d3d3;
        border-radius: 5px;
        cursor: pointer;
      }
      .react-es-active-filters li > span {
        max-width: 260px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
        margin-right: 26px;
        padding: 5px;
        overflow: hidden;
        display: block;
      }
      .react-es-active-filters li > span:hover {
        text-decoration: line-through;
      }

      .react-es-active-filters li > button {
        display: flex;
        height: 100%;
        top: 0px;
        right: 8px;
        position: absolute;
        align-items: center;
        border: none;
        background: transparent;
        cursor: pointer;
      }

      .search-sidebar {
        flex: 0 0 25%;
        max-width: 25%;
        position: relative;
        width: 100%;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px;
      }
    `}</style>
  </aside>
);

export default Menu;
