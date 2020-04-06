import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import queryString from "query-string";
import { getNoticeInfo, printPdf } from "../../src/utils";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import mapping from "../../src/services/mapping";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import Title from "../../src/notices/Title";
import Link from "next/link";
import ContactUs from "../../src/notices/ContactUs";
import FieldImages from "../../src/notices/FieldImages";
import { schema } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";
import BucketButton from "../../src/components/BucketButton";

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

    const { title, images, image_preview, metaDescription } = getNoticeInfo(notice);

    const obj = {
      name: title,
      image: image_preview,
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
              {images.length ? <meta property="og:image" content={images[0].src} /> : <meta />}
            </Head>

            <h1 className="heading">{title}</h1>

            <div className="top-container">
              <div className="addBucket onPrintHide">
                <BucketButton base="museo" reference={notice.REF} />
              </div>
              <div className="printPdfBtn onPrintHide" onClick={() => printPdf("museo_" + notice.REF)}>
              Imprimer la notice
              </div>
            </div>

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
                    content="Contact"
                    notice={notice}
                    fields={["TEL_M", "CONTACT_GENERIQUE", "URL_M", "ACCES"]}
                  />
                  <Field title={mapping.museo.TEL_M.label} content={notice.TEL_M} />
                  <Field title={mapping.museo.CONTACT_GENERIQUE.label} content={notice.CONTACT_GENERIQUE} />
                  <Field
                    title={mapping.museo.URL_M.label}
                    content={<a href={"https://" + notice.URL_M} target="_blank">{notice.URL_M}</a>}
                    key="notice.URL_M"
                  />
                  <Field title={mapping.museo.ACCES.label} content={notice.ACCES} />
				  <Title
                    content="Appellation/Protection"
                    notice={notice}
                    fields={["LABEL"]}
                  />
                  <Field title={mapping.museo.LABEL.label} content={notice.LABEL} />

                  <Title
                    content="Collection"
                    notice={notice}
                    fields={[
                      "CATEG",
                      "DOMPAL",
                      "HIST",
                      "ATOUT",
                      "THEMES",
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
                  <Field title={mapping.museo.ARTISTE.label} content={notice.ARTISTE} />
                  <Field title={mapping.museo.PHARE.label} content={notice.PHARE} />
                  <Field title={mapping.museo.AN_CREAT.label} content={notice.AN_CREAT} />
                  <Field title={mapping.museo.INTERET.label} content={notice.INTERET} />
                  <Field title={mapping.museo["PROT-BAT"].label} content={notice["PROT-BAT"]} />
                  <Field title={mapping.museo["PROT-ESP"].label} content={notice["PROT-ESP"]} />
                </div>
              </Col>
              <Col md="4">
                <FieldImages images={images} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.museo.REF.label} content={notice.REF} />
                    <Field title={mapping.museo.BASE.label} content={notice.BASE} />
                    <Field title={mapping.museo.COPY.label} content={notice.COPY} />
					<Field title={mapping.museo.DT_SAISI.label} content={notice.DT_SAISI} />
                  </div>
                  <ContactUs contact={notice.CONTACT_GENERIQUE} REF={notice.REF} base="museo" />
                </div>
                <div className="onPrintHide" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Link
                    href={`/search/list?${queryString.stringify({
                      museo: JSON.stringify([notice.REF])
                    })}`}
                  >
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
