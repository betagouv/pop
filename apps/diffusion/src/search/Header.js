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
      const gallery = await API.getGallery(JSON.parse(query.gallery));
      this.setState({ gallery });
    }
  }

  render() {
    const { museo, gallery } = this.state;

    if (museo) {
      return <Museo museo={museo} />;
    } else if (gallery && gallery.name && gallery.description) {
      return <Gallery gallery={gallery} />;
    }

    return <div />;
  }
}

export default Header;

const Gallery = ({ gallery }) => {
  const title = gallery.name;
  const description = gallery.description;
  return (
    <div className="gallery-card">
      <div className="gallery-description">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <style jsx>{`
        .gallery-card {
          background-color: #000;
          padding-bottom: 15px;
          border-radius: 5px;
          box-shadow: 0 2px 4px 1px rgba(189, 189, 189, 0.7);
          margin-bottom: 30px;
          display: grid;
          color: white;
          position: relative;
        }
        .gallery-card::before {
          content: "";
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          border-radius: 5px;
          background-image: url(${bucket_url}${gallery.image});
          background-size: cover;
          filter: blur(0px) brightness(50%);
        }
        .gallery-description {
          white-space: pre-wrap;
          padding: 25px;
          position: relative;
        }
        .gallery-card h2 {
          padding-bottom: 25px;
          font-size: 22px;
        }
      `}</style>
    </div>
  );
};

const Museo = ({ museo }) => {
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
