# pop-shared 
[![NPM](https://img.shields.io/npm/v/pop-shared.svg)](https://www.npmjs.com/package/pop-shared)

Composants partagés pour la plateforme ouverte du patrimoine.



## Installation

```bash
yarn add --dev pop-shared
```

## Tests

Pour lancer les tests automatisés : `yarn test`.

Il est aussi possible de tester manuellement les composants depuis le dossier `example` :
```bash
cd example
yarn start
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
