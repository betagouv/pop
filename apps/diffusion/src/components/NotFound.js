import React from "react";
import { Container } from "reactstrap";
import Head from "next/head";
import "./NotFound.css";

const NotFound = () => (
  <Container className="notice-not-found" fluid>
    <Head>
      <title>Page introuvable - POP - Plateforme Ouverte du Patrimoine</title>
    </Head>
    <div className="notice-not-found-left">
      <h1>POPSI !</h1>
      <p>
        La page que vous recherchez est introuvable...
        <br />
        <br />
        Ne désespérez pas, nos archéobogues sont sur le coup !<br />
        Vous pouvez <a href="/">essayer une nouvelle recherche</a>
      </p>
    </div>
    <div className="notice-not-found-right">
      <img src="/static/courbet.jpeg" alt="Gustave courbet, le désespéré" />
      <br />
      Gustave courbet, le désespéré
    </div>
  </Container>
);

export default NotFound;
