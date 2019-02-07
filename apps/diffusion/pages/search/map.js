import Search from "../../src/search/Search"
import Router from "next/router";

export default class extends React.Component {
  static async getInitialProps({ asPath }) {
    return { asPath }
  }
  componentDidMount() {
    Router.prefetch("/search/list");
    Router.prefetch("/search/mosaic");
  }
  render = () => <Search display="map" location={this.props.asPath}></Search>;
}
