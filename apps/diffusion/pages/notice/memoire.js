import API from "../../src/services/api";
import Layout from "../../src/components/Layout";
import Memoire from "../../src/notices/Memoire";
import { findCollection } from "../../src/notices/utils";
import throw404 from "../../src/services/throw404";
import logEvent from "../../src/services/amplitude";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("memoire", id);
    const collection = notice && findCollection(notice.LBASE);
    let links = [];
    if (collection) {
      const values = await API.getNotice(collection, notice.LBASE);
      links = values.filter(v => v);
    }
    return { notice, links };
  }

  componentDidMount() {
    logEvent("notice_open", { base: "memoire", notice: this.props.notice.REF });
  }

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    return (
      <Layout>
        <Memoire notice={this.props.notice} />
      </Layout>
    );
  }
}
