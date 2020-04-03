import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import mapping from "../../src/services/mapping";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import Title from "../../src/notices/Title";
import FieldImages from "../../src/notices/FieldImages";
import ContactUs from "../../src/notices/ContactUs";
import { schema } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";
import { getNoticeInfo, printPdf } from "../../src/utils";
import BucketButton from "../../src/components/BucketButton";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("autor", id);
    return { notice };
  }

  fieldImage(notice) {
    const { images } = getNoticeInfo(notice);
    const imageComponents = images.map(e => ({
      src: e.src,
      alt: e.name,
      footer: (
        <div style={{ marginTop: "5px" }}>
          <div style={{ textAlign: "center", fontWeight: "bold" }}>{e.name}</div>
          <div style={{ fontSize: "13px" }}>{e.copy}</div>
          <a
            style={{ fontSize: "13px" }}
            target="_blank"
            rel="noopener"
            href={`/notice/memoire/${e.ref}`}
          >
            Voir la notice image
          </a>
        </div>
      )
    }));

    if (imageComponents.length) {
      return <FieldImages images={imageComponents} />;
    }
  }

  render() {
    const notice = this.props.notice;

    if (!notice) {
      return throw404();
    }

    const { title, images, datesLieus, datesActivites, referenceArk } = getNoticeInfo(notice);

    return (
      <Layout>
        <div className="notice">
          <Container>
            <Head>
              <title>{title}</title>
            </Head>

            <h1 className="heading">{title}</h1>

            <div className="top-container">
              <div className="addBucket onPrintHide">
                <BucketButton base="autor" reference={notice.REF} />
              </div>
              <div className="printPdfBtn onPrintHide" onClick={() => printPdf("autor_" + notice.REF)}>
                Imprimer la notice
              </div>
            </div>

            <Row>
              <Col md="8">
                <div className="notice-details">
                  <Title
                      content="Identification"
                      notice={notice}
                      fields={[
                        "NOM", "PREN", "PNOM", "TYPID", "ALIAS", "INI", "REJET", "NAT", "DNAISS", "DMORT"
                      ]}
                  />
                  <Field title={mapping.autor.NOM.label} content={notice.NOM} separator="#" />
                  <Field title={mapping.autor.PREN.label} content={notice.PREN} separator="#" />
                  <Field title={mapping.autor.PNOM.label} content={notice.PNOM} separator="#" />
                  <Field title={mapping.autor.TYPID.label} content={notice.TYPID} separator="#" />
                  <Field title={mapping.autor.ALIAS.label} content={notice.ALIAS} separator="#" />
                  <Field title={mapping.autor.INI.label} content={notice.INI} separator="#" />
                  <Field title={mapping.autor.REJET.label} content={notice.REJET} separator="#" />
                  <Field title={mapping.autor.NATIO.label} content={notice.NATIO} separator="#" />
                  <Field title="Dates (lieus) d’existence" content={datesLieus} separator="#" />

                  <Title
                      content="Fonctions et activités"
                      notice={notice}
                      fields={[
                        "FONC", "SCLE", "DATES", "LOCA", "LOCACT", "ADRS", "LRELA", "FORM", "OEUVR", "SYMB", "INS", "GAR", "PREF", "BIF"
                      ]}
                  />
                  <Field title={mapping.autor.FONC.label} content={notice.FONC} separator="#" />
                  <Field title="Dates – lieu d’activités " content={datesActivites} separator="#" />
                  <Field title={mapping.autor.LRELA.label} content={notice.LRELA} separator="#" />
                  <Field title={mapping.autor.FORM.label} content={notice.FORM} separator="#" />
                  <Field title={mapping.autor.OEUVR.label} content={notice.OEUVR} separator="#" />
                  <Field title={mapping.autor.SYMB.label} content={notice.SYMB} separator="#" />
                  <Field title={mapping.autor.INS.label} content={notice.INS} separator="#" />
                  <Field title={mapping.autor.GAR.label} content={notice.GAR} separator="#" />
                  <Field title={mapping.autor.PREF.label} content={notice.PREF} separator="#" />
                  <Field title={mapping.autor.BIF.label} content={notice.BIF} separator="#" />

                  <Title
                      content="Commentaire Biographique"
                      notice={notice}
                      fields={[
                        "BIO", "OBS"
                      ]}
                  />
                  <Field title={mapping.autor.BIO.label} content={notice.BIO} separator="#" />
                  <Field title={mapping.autor.OBS.label} content={notice.OBS} separator="#" />

                  <Title
                      content="Ressources documentaires"
                      notice={notice}
                      fields={[
                        "SOURCES", "BIBLIO", "PUBLI", "EXPO", "ISNI_VERIFIEE", "ARK"
                      ]}
                  />
                  <Field title={mapping.autor.SOURCES.label} content={notice.SOURCES} separator="#" />
                  <Field title={mapping.autor.BIBLIO.label} content={notice.BIBLIO} separator="#" />
                  <Field title={mapping.autor.PUBLI.label} content={notice.PUBLI} separator="#" />
                  <Field title={mapping.autor.EXPO.label} content={notice.EXPO} separator="#" />
                  <Field title={mapping.autor.ISNI_VERIFIEE.label} content={referenceArk} separator="#" />

                </div>
              </Col>
              <Col md="4">
                {this.fieldImage(notice)}
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.autor.REF.label} content={notice.REF} />
                    <Field title={mapping.autor.BASE.label} content={notice.BASE} />
                  </div>
                  <ContactUs contact={notice.CONTACT} REF={notice.REF} base="autor" />
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
