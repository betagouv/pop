# pop-shared 
[![NPM](https://img.shields.io/npm/v/pop-shared.svg)](https://www.npmjs.com/package/pop-shared)

Composants partagés pour la plateforme ouverte du patrimoine.



## Installation

```bash
npm install --save-dev pop-shared
```

## Tests

Pour lancer les tests automatisés : `npm test`.

Il est aussi possible de tester manuellement les composants depuis le dossier `example` :
```bash
cd example
npm run start
```

## Usage

### MultiList

```jsx
import React, { Component } from "react";
import { MultiList } from "pop-shared";

class Example extends Component {
  render() {
    return (
      <MultiList
        dataField="PERI.keyword"
        title="Période"
        componentId="periode"
        placeholder="Rechercher une période"
      />
    );
  }
}
```

## Publication

```
npm publish
```
