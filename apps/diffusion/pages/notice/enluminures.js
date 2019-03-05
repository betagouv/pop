import API from "../../src/services/api";
import Layout from "../../src/components/Layout";
import Enluminures from "../../src/notices/Enluminures";
import throw404 from "../../src/services/throw404";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("enluminures", id);
    return { notice };
  }

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    return (
      <Layout>
        <Enluminures notice={this.props.notice} />
      </Layout>
    );
  }
}
