import React from "react";
import Link from "next/link";
import { Container } from "reactstrap";
import Version from "../../../version.json";

export default class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <div className="header">
          <Container className="NavContainer">
            <Link prefetch href="/">
              <a className="logo">
                <img src="/static/logo.png" alt="Logo" className="md" />
                <h1>Ministère de la Culture</h1>
              </a>
            </Link>
            <div className="right-container">
              <div>
                <a
                  href="https://fier2.typeform.com/to/Qyz3xv"
                  className="btn btn-outline-danger d-none d-sm-block"
                  target="_blank"
                  rel="noopener"
                >
                  Votre avis est utile
                </a>
              </div>

              <div className="company-title">
                <span>Plateforme</span>
                <span>Ouverte du</span>
                <span>Patrimoine</span>
              </div>
            </div>
          </Container>
        </div>
        {children}
        <div className="footer">
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="https://pop-general.s3.eu-west-3.amazonaws.com/POP_En_savoir_plus.pdf" target="_blank" rel="noopener"> 
                À propos
              </a>
            </li>
            <li className="list-inline-item">
              <Link href="/opendata">
                <a>Télécharger les bases</a>
              </Link>
            </li>
            <li className="list-inline-item">
              <a href={`mailto:pop@culture.gouv.fr`} target="_blank" rel="noopener">
                Nous contacter
              </a>
            </li>
            <li className="list-inline-item">
              <Link href="/tracking">
                <a>Suivi d'audience et vie privée</a>
              </Link>
            </li>
          </ul>
          <div className="version">
              Pop version {Version.version}
          </div>
        </div>
        <style jsx>{`
          .header {
            box-shadow: 0 2px 6px 0 rgb(189, 189, 189);
            position: relative;
          }

          .header :global(.NavContainer) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: white;
            width: 100%;
            max-width: 100% !important;
            padding: 5px 15px;
          }

          .header .right-container {
            display: flex;
            align-items: center;
          }

          .header .right-container .btn {
            color: #c43a2f;
            margin-right: 25px;
          }

          .header .right-container .btn:hover {
            background-color: #c43a2f;
            color: #fff;
          }
          #beta {
            position: absolute;
            width: 120px;
            height: 110px;
            right: 0;
            top: 0;
            display: flex;
            overflow: hidden;
          }

          #beta > div {
            position: absolute;
            right: -31.75%;
            top: 10%;
            width: 100%;
            background-color: #c43a2f;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(45deg);
          }

          #beta > div > span {
            display: inline-block;
            color: white;
            text-align: center;
            font-size: 0.9em;
            font-weight: 700;
            padding-top: 3px;
            padding-bottom: 3px;
          }

          .logo {
            display: flex;
            align-items: center;
          }
          .logo:hover,
          .logo:visited,
          .logo:focus,
          .logo:active {
            text-decoration: none;
          }
          .logo img {
            width: 170px;
            object-fit: contain;
          }
          .logo h1 {
            font-size: 28px;
            font-weight: 400;
            font-family: "Nexa", sans-serif;
            color: #777;
            margin: 0;
          }

          @media screen and (max-width: 767px) {
            .logo img {
              height: 110px;
              width: 120px;
            }
            .logo h1 {
              font-size: 20px;
            }
          }

          .company-title {
            margin-right: 30px;
          }
          .company-title span {
            display: block;
            font-size: 22px;
            line-height: 1;
            color: #003f48;
          }
          .company-title span:first-letter {
            font-weight: 700;
          }

          @media screen and (max-width: 767px) {
            .company-title span {
              font-size: 16px;
            }
            .company-title {
              margin-right: 15px;
              min-width: 82px;
            }
          }

          .footer {
            width: 100%;
            line-height: 60px;
            background-color: #f5f5f5;
            display: flex;
            justify-content: flex;
            box-shadow: 0 -2px 6px 0 rgba(189, 189, 189, 0.2);
          }

          .footer a:hover {
            text-decoration: underline;
          }
          .footer a {
            text-decoration: none;
            padding-left: 20px;
            color: #003f48;
            font-weight: 300;
            font-size: 14px;
          }

          .version {
            margin-left: auto;
            margin-right: 20px;
            text-decoration: none;
            color: #003f48;
            font-weight: 300;
            font-size: 14px;
          }

          #betagouv {
            background-color: white;
            height: 32px;
            border-radius: 5px;
          }

          @media screen and (max-width: 590px) {
            .footer a,
            .footer a:hover {
              line-height: 20px;
              margin-top: 10px;
            }
          }

          @media screen and (min-width: 589px) {
            .footer {
              position: absolute;
              bottom: 0;
              height: 60px;
            }
          }
          @media print {
            .footer,
            .header {
              display: none;
            }
            .row,
            .notice {
              display: block !important;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}
