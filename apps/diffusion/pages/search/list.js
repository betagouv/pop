import Search from "../../src/search/Search";
import Layout from "../../src/components/Layout";
import Router from "next/router";

export default class extends React.Component {
  static async getInitialProps({ asPath }) {
    return { asPath };
  }
  componentDidMount() {
    Router.prefetch("/advancedsearch/map");
    Router.prefetch("/advancedsearch/mosaic");
  }
  render = () => {
    return (
      <Layout>
        <Search display="list" location={this.props.asPath} />
      </Layout>
    );
    //
  };
}

// <Layout>
//   <div className="search">
//     <Head>
//       <title>Recherche - POP</title>
//       <meta
//         name="description"
//         content="Effectuer une recherche sur POP. Découvrez le moteur de cherche qui vous aidera à trouver facilement ce que vous recherchez sur POP."
//       />
//     </Head>
//     <Container fluid style={{ maxWidth: 1860 }}>
//       <h1 className="title">Votre recherche</h1>
//       <Header location={this.props.location} />
//       <ReactiveBase url={`${es_url}`} app={BASES}>
//         <Menu location={this.props.location} mobile_menu={this.state.mobile_menu} />
//         <Row className="search-row">
//           <Col sm={6}>
//             <MobileFilters mobile_menu={this.state.mobile_menu} />
//           </Col>
//           <Col sm={2} className="advanced">
//             <Link prefetch href={this.props.advanced ? "/search/list" : "/advancedsearch/list"}>
//               <a>{this.props.advanced ? "Recherche normale" : "Recherche avancée"}</a>
//             </Link>
//           </Col>
//           <Col sm={4}>
//             <Tabs location={this.props.location} />
//           </Col>
//         </Row>
//       </ReactiveBase>
//     </Container>
//   </div>
// </Layout>;
