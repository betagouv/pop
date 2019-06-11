import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import { getNoticeInfo } from "../../src/utils";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import mapping from "../../src/services/mapping";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import Title from "../../src/notices/Title";
import Link from "next/link";
import ContactUs from "../../src/notices/ContactUs";
import FieldImages from "../../src/notices/FieldImages";
import { schema, toFieldImages } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("museo", id);
    return { notice };
  }

  render() {
    const { notice } = this.props;
    if (!notice) {
      return throw404();
    }

    const { title, image, metaDescription } = getNoticeInfo(notice);

    const obj = {
      name: title,
      image,
      description: metaDescription
    };
    return (
      <Layout>
        <div className="notice">
          <Container>
            <Head>
              <title>{title}</title>
              <meta content={metaDescription} name="description" />
              <script type="application/ld+json">{schema(obj)}</script>
              {image ? <meta property="og:image" content={image} /> : <meta />}
            </Head>
            <h1 className="heading">{title}</h1>
            <Row>
              <Col className="image" md="8">
                <div className="notice-details">
                  <Title
                    content="Nom du musée"
                    notice={notice}
                    fields={["NOMOFF", "NOMUSAGE", "NOMANC"]}
                  />
                  <Field title={mapping.museo.NOMOFF.label} content={notice.NOMOFF} />
                  <Field title={mapping.museo.NOMUSAGE.label} content={notice.NOMUSAGE} />
                  <Field title={mapping.museo.NOMANC.label} content={notice.NOMANC} />
                  <Title
                    content="Adresse"
                    notice={notice}
                    fields={["ADRL1_M", "LIEU_M", "CP_M", "VILLE_M", "VILLE_M", "DPT", "REGION"]}
                  />
                  <Field title={mapping.museo.ADRL1_M.label} content={notice.ADRL1_M} />
                  <Field title={mapping.museo.LIEU_M.label} content={notice.LIEU_M} />
                  <Field title={mapping.museo.CP_M.label} content={notice.CP_M} />
                  <Field title={mapping.museo.VILLE_M.label} content={notice.VILLE_M} />
                  <Field title={mapping.museo.DPT.label} content={notice.DPT} />
                  <Field title={mapping.museo.REGION.label} content={notice.REGION} />
                  <Title
                    content="Collection"
                    notice={notice}
                    fields={[
                      "CATEG",
                      "DOMPAL",
                      "HIST",
                      "ATOUT",
                      "THEMES",
                      "CATEG",
                      "ARTISTE",
                      "PHARE",
                      "AN_CREAT",
                      "INTERET"
                    ]}
                  />
                  <Field title={mapping.museo.CATEG.label} content={notice.CATEG} />
                  <Field title={mapping.museo.DOMPAL.label} content={notice.DOMPAL} />
                  <Field title={mapping.museo.HIST.label} content={notice.HIST} />
                  <Field title={mapping.museo.ATOUT.label} content={notice.ATOUT} />
                  <Field title={mapping.museo.THEMES.label} content={notice.THEMES} />
                  <Field title={mapping.museo.CATEG.label} content={notice.CATEG} />
                  <Field title={mapping.museo.ARTISTE.label} content={notice.ARTISTE} />
                  <Field title={mapping.museo.PHARE.label} content={notice.PHARE} />
                  <Field title={mapping.museo.AN_CREAT.label} content={notice.AN_CREAT} />
                  <Field title={mapping.museo.INTERET.label} content={notice.INTERET} />
                </div>
              </Col>
              <Col md="4">
                <FieldImages
                  reference={notice.REF}
                  base="museo"
                  images={[{ source: image }]}
                  disabled
                  name={title}
                  external={false}
                />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.museo.REF.label} content={notice.REF} />
                    <Field title={mapping.museo.BASE.label} content={notice.BASE} />
                    <Field title={mapping.museo.COPY.label} content={notice.COPY} />
                  </div>
                  <ContactUs contact={notice.CONTACT_GENERIQUE} REF={notice.REF} base="museo" />
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Link href={`/search/list?museo=["${notice.REF}"]`}>
                    <a className="btn btn-secondary" style={{ backgroundColor: "#C43A2F" }}>
                      Voir les collections du musée
                    </a>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <style jsx>{noticeStyle}</style>
      </Layout>
    );
  }
}
