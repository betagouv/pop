import API from "../../src/services/api";
import Layout from "../../src/components/Layout";
import Merimee from "../../src/notices/Merimee";
import throw404 from "../../src/services/throw404";
import logEvent from "../../src/services/amplitude";

const pushLinkedNotices = (a, d, base) => {
  for (let i = 0; Array.isArray(d) && i < d.length; i++) {
    a.push(API.getNotice(base, d[i]));
    if (a.length > 50) break;
  }
};

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("merimee", id);
    const arr = [];

    if (notice) {
      const { RENV, REFP, REFE, REFO } = notice;
      pushLinkedNotices(arr, RENV, "merimee");
      pushLinkedNotices(arr, REFP, "merimee");
      pushLinkedNotices(arr, REFE, "merimee");
      pushLinkedNotices(arr, REFO, "palissy");
    }

    const links = (await Promise.all(arr)).filter(l => l);
    return { notice, links };
  }

  componentDidMount() {
    logEvent("notice_open", { base: "merimee", notice: this.props.notice.REF });
  }

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    return (
      <Layout>
        <Merimee notice={this.props.notice} links={this.props.links} />
      </Layout>
    );
  }
}
