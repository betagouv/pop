import API from "../../src/services/api";
import Layout from "../../src/components/Layout";
import Joconde from "../../src/notices/Joconde";
import throw404 from "../../src/services/throw404";
import logEvent from "../../src/services/amplitude";

export default class extends React.Component {
  static loadMuseo(m) {
    try {
      return API.getMuseo(m);
    } catch (e) {}
    return null;
  }
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("joconde", id);
    const museo = notice && notice.MUSEO && (await this.loadMuseo(notice.MUSEO));
    return {
      notice,
      museo
    };
  }

  componentDidMount() {
    logEvent("notice_open", { base: "joconde", notice: this.props.notice.REF });
  }

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    return (
      <Layout>
        <Joconde notice={this.props.notice} museo={this.props.museo} />
      </Layout>
    );
  }
}
