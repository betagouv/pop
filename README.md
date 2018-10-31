# pop-shared

> pop shared components

[![NPM](https://img.shields.io/npm/v/pop-shared.svg)](https://www.npmjs.com/package/pop-shared) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add --dev pop-shared
```

## Usage

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

## License

MIT © [betagouv](https://github.com/betagouv)
