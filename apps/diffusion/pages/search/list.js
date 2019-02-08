import Search from "../../src/search/Search";
import Router from "next/router";

export default class extends React.Component {
  static async getInitialProps({ asPath }) {
    return { asPath }
  }
  componentDidMount() {
    Router.prefetch("/advancedsearch/map");
    Router.prefetch("/advancedsearch/mosaic");
  }
  render = () => <Search display="list" location={this.props.asPath} />;
}
