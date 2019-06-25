import React from "react";
import SearchSimple from "./SearchSimple";
import SearchAdvanced from "./SearchAdvanced";

export default function Search({ mode, base, initialValues }) {
  if (mode !== "advanced") {
    return <SearchSimple initialValues={initialValues} />;
  } else {
    return <SearchAdvanced initialValues={initialValues} base={base} />;
  }
}
