import API from "../../src/services/api";
import Layout from "../../src/components/Layout";
import Mnr from "../../src/notices/Mnr";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("mnr", id);
    return { notice };
  }

  render() {
    return (
      <Layout>
        <Mnr notice={this.props.notice} />
      </Layout>
    );
  }
}
