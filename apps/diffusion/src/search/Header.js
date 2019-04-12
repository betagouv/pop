import React from "react";
import queryString from "query-string";
import API from "../services/api";
import { bucket_url } from "../config";

class Header extends React.Component {
  state = {
    museo: null,
    gallery: null
  };

  async componentDidMount() {
    const query = queryString.parseUrl(this.props.location).query;
    if (query && query.museo) {
      const museos = JSON.parse(query.museo);
      if (museos.length) {
        const museo = await API.getMuseo(museos[0]);
        this.setState({ museo });
      }
    } else if (query && query.gallery) {
      const gallery = await API.getGallery(query.gallery);
      this.setState({ gallery });
    }
  }

  render() {
    const { museo, gallery } = this.state;

    if (museo) {
      return <MUSEO museo={museo} />;
    } else if (gallery && gallery.name && gallery.description) {
      return <GALLERY gallery={gallery} />;
    }

    return <div />;
  }
}

export default Header;

const GALLERY = ({ gallery }) => {
  const title = gallery.name;
  const description = gallery.description;
  return (
    <div className="museo-card-sm">
      <div className="description">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="share">
          <a
            href={`mailto:?subject=${title}%20on%20POP&body=Venez découvrir la gallerie ${title} sur http://pop.culture.gouv.fr/gallery/${
              gallery._id
            }`}
            className="icon mail"
          />
        </div>
      </div>
      <div className="background" />

      <style jsx>{`
        .museo-card-sm {
          background-color: #fff;
          border-radius: 5px;
          padding: 25px;
          padding-bottom: 15px;
          min-height: 320px !important;
          box-shadow: 0 2px 4px 1px rgba(189, 189, 189, 0.7);
          margin-bottom: 30px;
          position: relative;
        }

        .share {
          position: absolute;
          top: 0px;
          right: 0px;
        }

        .mail {
          background-image: url("/static/send.svg");
          background-size: auto;
          background-repeat: no-repeat;
          background-position: 50% 50%;
        }

        .icon {
          height: 50px;
          width: 50px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
          cursor: pointer;
          color: black;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .description {
          z-index: 2;
          position: relative;
          color: ${gallery.image ? "white" : "black"};
        }

        .background {
          min-height: 320px !important;
          overflow: hidden !important;
          background-size: cover;
          background-repeat: no-repeat;
          filter: blur(0px) brightness(50%);
          width: 100%;
          border-radius: 5px;
          z-index: 1;
          top: 0px;
          left: 0px;
          position: absolute;
          background-position: center;
          background-attachment: fixed;
          background-image: url(${bucket_url}${gallery.image});
        }
        .museo-card-sm h2 {
          font-size: 22px;
          color: "white";
        }
      `}</style>
    </div>
  );
};

const MUSEO = ({ museo }) => {
  const title = museo.NOMUSAGE || museo.NOMOFF || museo.ANC;
  return (
    <div className="museo-card-sm">
      <h2>
        {title} - {museo.VILLE_M}
      </h2>
      <p>
        {museo.ATOUT && museo.ATOUT.replace(/#/g, " ; ")} -{" "}
        <a href={`/museo/${museo.REF}`}>En savoir plus...</a>
      </p>
      <style jsx>{`
        .museo-card-sm {
          background-color: #fff;
          border-radius: 5px;
          padding: 25px;
          padding-bottom: 15px;
          box-shadow: 0 2px 4px 1px rgba(189, 189, 189, 0.7);
          margin-bottom: 30px;
        }
        .museo-card-sm h2 {
          font-size: 22px;
        }
      `}</style>
    </div>
  );
};
