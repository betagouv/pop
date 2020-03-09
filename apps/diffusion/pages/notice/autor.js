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
import { getNoticeInfo } from "../../src/utils";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("autor", id);
    return { notice };
  }

  render() {
    const notice = this.props.notice;

    if (!notice) {
      return throw404();
    }

    const { title } = getNoticeInfo(notice);

    const obj = {
      name: title
    };
    return (
      <Layout>
        <div className="notice">
          <Container>
            <Head>
              <title>{title}</title>
            </Head>

            <h1 className="heading">
              {notice.TITR}
            </h1>
            <Row>
              <Col md="4">
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
