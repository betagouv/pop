import API from "../../src/services/api";
import Layout from "../../src/components/Layout";
import Palissy from "../../src/notices/Palissy";
import { findCollection } from "../../src/notices/utils";
import throw404 from "../../src/services/throw404";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("palissy", id);
    const arr = [];

    if (notice) {
      const { RENV, REFP, REFE, REFA, LBASE2, REF } = notice;
      [...RENV, ...REFP, ...REFE, ...REFA, LBASE2]
        .filter(e => e && e != REF)
        .forEach(e => {
          const collection = findCollection(e);
          arr.push(API.getNotice(collection, e));
        });
    }

    const links = (await Promise.all(arr)).filter(l => l);
    return { notice, links };
  }

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    return (
      <Layout>
        <Palissy notice={this.props.notice} links={this.props.links} />
      </Layout>
    );
  }
}
