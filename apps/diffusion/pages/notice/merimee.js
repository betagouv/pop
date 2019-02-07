import API from "../../src/services/api";
import Layout from "../../src/components/Layout";
import Merimee from "../../src/notices/Merimee";

const pushLinkedNotices = (a, d, base) => {
  for (let i = 0; Array.isArray(d) && i < d.length; i++) {
    a.push(API.getNotice(base, d[i]));
    if (a.length > 50) break;
  }
}

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("merimee", id);
    const { RENV, REFP, REFE, REFO } = notice;
    const arr = [];
    pushLinkedNotices(arr, RENV, "merimee");
    pushLinkedNotices(arr, REFP, "merimee");
    pushLinkedNotices(arr, REFE, "merimee");
    pushLinkedNotices(arr, REFO, "palissy");
    const links = (await Promise.all(arr)).filter(l => l);
    return { notice, links };
  }

  render() {
    return (
      <Layout>
        <Merimee notice={this.props.notice} links={this.props.links} />
      </Layout>
    );
  }
}
