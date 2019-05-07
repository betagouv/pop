import React, { useState } from "react";

import { Tooltip } from "reactstrap";

export default function CustomTooltip() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  return (
    <>
      <span id="aboutSearch" className="badge badge-info">
        ?
      </span>
      <Tooltip
        placement="right"
        className="tooltipInfo"
        isOpen={tooltipOpen}
        target="aboutSearch"
        toggle={() => setTooltipOpen(!tooltipOpen)}
      >
        <h4>Définition de certains opérateurs :</h4>
        <dl>
          <dt>Égal à</dt>
          <dd>
            Stricte égalité. Entrer ici un champ de texte avec respect de la casse ou un code
            alphanumérique.
          </dd>
          <dt>Contient</dt>
          <dd>
            Entrer ici un champ de texte ou un code alphanumérique ou numérique. Ressortiront les
            notices pour lesquelles le champ contient les valeurs entrées, indépendamment de ce
            précède ou suit.
          </dd>
          <dt>Existe</dt>
          <dd>
            Cet opérateur permet d'indiquer la liste des notices pour lesquelles le champ "existe",
            i.e. le champ "est non vide".
          </dd>
        </dl>
      </Tooltip>
    </>
  );
}
