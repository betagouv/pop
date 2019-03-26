import React from "react";
import API from "../src/services/api";
import queryString from "query-string";
import { pushSearchRoute, paramsToUrlAlias } from "../src/services/url";
import throw404 from "../src/services/throw404";

export default class extends React.Component {
  static async getInitialProps({ query: { id }, res }) {
    try {
      // Load gallery the redirect
      const gallery = await API.getGallery(id);
      if (gallery.params) {
        let { view, mode, ...params } = gallery.params;
        if (res) {
          res.writeHead(302, {
            Location: paramsToUrlAlias(mode, view, params.base, queryString.stringify(params))
          });
          res.end();
        } else {
          pushSearchRoute({ mode, view, base: params.base, params });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    // It cannot be rendered
    throw404();
  }
}
