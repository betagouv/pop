import React from "react";
import SearchAdvanced from "./SearchAdvanced";
import SearchSimple from "./SearchSimple";

export default function Search({ mode, base, initialValues }) {
	if (mode !== "advanced") {
		return <SearchSimple initialValues={initialValues} />;
	}
	return <SearchAdvanced initialValues={initialValues} base={base} />;
}
