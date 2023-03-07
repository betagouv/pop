import React from "react";
import API from "../src/services/api";
import queryString from "query-string";
import { pushSearchRoute, paramsToUrlAlias } from "../src/services/url";
import throw404 from "../src/services/throw404";
// import { tag } from "./../src/services/tags";
import EAnalytics from "../src/services/eurelian";

export default class extends React.Component {

  componentDidMount() {
    /*
    tag.sendPage({
      name: 'Page Galerie'
    });
    */
    // Tracking Eurelian
    EAnalytics.initialize();
    EAnalytics.track([
      'path', `Page Galerie`,
      'pagegroup', 'Page Galerie'
    ]);
  }

  static async getInitialProps({ query: { id }, res }) {
    try {
      // Load gallery, then redirect.
      const gallery = await API.getGallery(id);
      // Gallery should have params.
      if (gallery.params) {
        let { view, mode, ...params } = gallery.params;
        // Add gallery id to params
        params.gallery = JSON.stringify(id);
        // "res" means server-side.
        if (res) {
          const location = paramsToUrlAlias(mode, view, params.base, queryString.stringify(params));
          res.writeHead(302, { Location: location });
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
    // It cannot be rendered, should have been redirected in `getInitialProps`.
    throw404();
  }
}
