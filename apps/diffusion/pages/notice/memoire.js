import API from "../../services/api";
import Layout from "../../components/Layout";
import Memoire from "../../components/notices/Memoire";
import { findCollection } from "../../components/notices/utils";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("memoire", id);
    const collection = findCollection(notice.LBASE);
    let links = [];
    if (collection) {
      const values = await API.getNotice(collection, notice.LBASE);
      links = values.filter(v => v);
    }
    console.log({ notice, links })
    return { notice, links };
  }

  render() {
    return (
      <Layout>
        <Memoire notice={this.props.notice} />
      </Layout>
    );
  }
}
