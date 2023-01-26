import React from "react";
import Layout from "../src/components/Layout";
import { Container, Row, Col } from "reactstrap";
import Head from "next/head";

const fallback = () => (
  <Layout>
          <Container fluid>
            <div className="not-found">
              <Head>
                <title>Page introuvable - POP - Plateforme Ouverte du Patrimoine</title>
              </Head>
              <div className="not-found-left">
                <h1>POPSI !</h1>
                <p>
                  La page que vous recherchez est introuvable...
                  <br />
                  <br />
                  Ne désespérez pas, nos archéobogues sont sur le coup !<br />
                  Vous pouvez <a href="/">essayer une nouvelle recherche</a>
                </p>
              </div>
              <div className="not-found-right">
                <img src="/static/courbet.jpeg" alt="Gustave courbet, le désespéré" />
                <br />
                Gustave courbet, le désespéré
              </div>
            </div>
          </Container>
          <style jsx>{`
            .not-found {
              text-align: center;
              padding-top: 35vh;
              display: flex;
              padding: 60px;
            }
            .not-found img {
              width: 400px;
            }
            .not-found .not-found-right {
              flex: 1;
            }
            .not-found .not-found-left {
              padding-left: 25px;
              padding-right: 25px;
              padding-top: 50px;
              flex: 1;
            }
          `}</style>
        </Layout>
);

export default fallback;