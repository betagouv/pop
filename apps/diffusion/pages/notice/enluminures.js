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

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("enluminures", id);
    return { notice };
  }

  render() {
    const notice = this.props.notice;

    if (!notice) {
      return throw404();
    }

    const { title, images, image_preview, metaDescription } = getNoticeInfo(notice);

    const obj = {
      name: title,
      created_at: notice.DATEDEB,
      artform: Array.isArray(notice.NOMENC) && notice.NOMENC[0] ? notice.NOMENC[0] : "",
      image: image_preview,
      description: notice.NOTES,
      artMedium: Array.isArray(notice.TYPE) ? notice.TYPE.join(", ") : notice.TYPE || "",
      creator: String(notice.ATTRIB).split(";"),
      comment: notice.NOTEDEC,
      contentLocation: notice.ORIGG
    };
    return (
      <Layout>
        <div className="notice">
          <Container>
            <Head>
              <title>{title}</title>
              <meta content={metaDescription} name="description" />
              <script type="application/ld+json">{schema(obj)}</script>
              {images.length ? <meta property="og:image" content={image_preview} /> : <meta />}
            </Head>

            

            <div className="top-container">
              <h1 className="heading">
                {notice.TITR} - {notice.SUJET}
              </h1>
              <div className="printPdfBtn" onClick={() => printPdf("enluminures_" + notice.REF)}>
                Téléchargement PDF
              </div>
            </div>
            <Row>
              <Col md="8">
                <div className="notice-details">
                  <Title
                    content="Identification du bien culturel"
                    notice={notice}
                    fields={[
                      "ATTRIB",
                      "CONTXT",
                      "DATE",
                      "NOMENC",
                      "NOTES",
                      "NOTDEC",
                      "ORIGG",
                      "ORIGH",
                      "POSS",
                      "REFD",
                      "SUJET",
                      "TITR",
                      "TYPDEC"
                    ]}
                  />
                  <Field title={mapping.enluminures.ATTRIB.label} content={notice.ATTRIB} />
                  <Field title={mapping.enluminures.CONTXT.label} content={notice.CONTXT} />
                  <Field title={mapping.enluminures.DATE.label} content={notice.DATE} />
                  <Field title={mapping.enluminures.NOMENC.label} content={notice.NOMENC} />
                  <Field title={mapping.enluminures.NOTES.label} content={notice.NOTES} />
                  <Field title={mapping.enluminures.NOTDEC.label} content={notice.NOTDEC} />
                  <Field title={mapping.enluminures.ORIGG.label} content={notice.ORIGG} />
                  <Field title={mapping.enluminures.ORIGH.label} content={notice.ORIGH} />
                  <Field title={mapping.enluminures.POSS.label} content={notice.POSS} />
                  <Field title={mapping.enluminures.REFD.label} content={notice.REFD} />
                  <Field title={mapping.enluminures.SUJET.label} content={notice.SUJET} />
                  <Field title={mapping.enluminures.TITR.label} content={notice.TITR} />
                  <Field
                    title={mapping.enluminures.TYPDEC.label}
                    content={notice.TYPDEC}
                    separator="/"
                  />
                </div>
              </Col>
              <Col md="4">
                <FieldImages images={images} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.enluminures.REF.label} content={notice.REF} />
                    <Field title={mapping.enluminures.BASE.label} content={notice.BASE} />
                    <Field title={mapping.enluminures.DROIT.label} content={notice.DROIT} />
                    <Field title={mapping.enluminures.ATTRIB.label} content={notice.ATTRIB} />
                    <Field
                      title={mapping.enluminures.COPY.label}
                      content={notice.COPY}
                      separator=";"
                    />
                  </div>
                  <ContactUs contact={notice.CONTACT} REF={notice.REF} base="enluminures" />
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
