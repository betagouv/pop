import React from "react";
import TextSearch from "./Search";
import AdvancedSearch from "./SearchAdvanced";

export default function Search({ mode, base, initialValues }) {
  if (mode !== "advanced") {
    return <TextSearch initialValues={initialValues} />;
  } else {
    return <AdvancedSearch initialValues={initialValues} base={base} />;
  }
}
