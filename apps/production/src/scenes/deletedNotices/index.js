import React from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";
import "./index.css";
import excelIcon from "../../assets/microsoftexcel.svg";


class DeletedNotices extends React.Component {
  state = { deletedNotices: [], group: null, loading: true };

  fetchDeletedNotices = async () => {
    this.setState({ loading: true });
    try {
      //Récuperation de l'historique complet
      const responseHistorique = await api.getDeleteHistoriques();
      let historiqueList = responseHistorique.deleteHistorique || [];
      console.log("historiqueList length before = " + historiqueList.length);


      //Récuperation du group de l'utilisateur
      let group;
      let authorizedBases = [];

      if(this.props.group == "admin"){
        group = {label: "admin"};
      }
      else {
        //Récuperation du groupe de l'utilisateur
        const responseGroup = await api.getGroupByLabel(this.props.group);
        group = responseGroup.group;

        //Pour chaque producteur rattaché au groupe
        const producteurs = group.PRODUCTEURS;
        for(let i = 0; i<producteurs.length; i++){
          const label = producteurs[i];
          const response = await api.getProducteurByLabel(label);
          const producteur = response.producteur;

          //Pour chaque base rattachée au producteur
          producteur.BASE.map( base => {

            //On récupère le nom de la base et on le push dans la liste authorized bases
            //Si pas déjà présente dedans
            if(!authorizedBases.includes(base.base)){
              authorizedBases.push(base.base);
            }
          })
        }

        historiqueList = historiqueList.filter( histo => {
          return authorizedBases.includes(histo.BASE)
        })
      }

      this.setState({ deletedNotices: historiqueList || [], group: group, loading: false });
    } catch (e) {
      toastr.error("L'api est innacessible", e.msg || "");
    }
  };

  componentWillMount() {
    this.fetchDeletedNotices();
  }


  //Export des données au format csv
  exportData(fileName, entities) {
    if (!entities.length) {
      return;
    }
  
    //Définition des colonnes
    const columns = ["REF", "BASE", "USER", "EMAIL", "DATE"];
    const csv = [];

    //Ajout des colonnes au csv
    csv.push(columns.join(";"));
  
    //Pour chaque notice, on récupère les données et on ajoute au csv
    for (let j = 0; j < entities.length; j++) {
      const arr = [];
      arr.push(`${this.verifyData(entities[j].REF)}` || "");
      arr.push(`${this.verifyData(entities[j].BASE)}` || "");
      arr.push(`${this.verifyData(entities[j].USER)}` || "");
      arr.push(`${this.verifyData(entities[j].EMAIL)}` || "");
      arr.push(`${this.verifyData(entities[j].DATE)}` || "");
      csv.push(arr.join(";"));
    }
  
    this.initiateFileDownload(csv.join("\n"), fileName);
  }
  
  //Méthode de téléchargement du fichier csv
  initiateFileDownload(csv, fileName) {
    let blob = new Blob([csv]);
    if (window.navigator.msSaveOrOpenBlob)
      // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
      window.navigator.msSaveBlob(blob, fileName);
    else {
      let a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob, {
        type: "text/plain;charset=UTF-8"
      });
      a.download = fileName;
      document.body.appendChild(a);
      a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a);
    }
  }

  verifyData(data){
    if(data && data!==undefined && data!== null){
      return data
    }
    else {
      return ""
    }
  }


  renderDeletedNotices(){
    return (
      <Table>
        <thead>
          <tr>
            <th>REF</th>
            <th>Base</th>
            <th>Utilisateur</th>
            <th>Email</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {this.state.deletedNotices.map(item => {
            return (
              <tr key={item._id}>
                <td>{item.REF}</td>
                <td>{item.BASE}</td>
                <td>{item.USER}</td>
                <td>{item.EMAIL}</td>
                <td>{item.DATE}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    )
  }

  render() {
    
    return (
      <div className="deletedNotices">
        <div className="titleContainer">
          <div className="deletedNoticesTitle">Historique des notices supprimées</div>
        </div>
        <button className="exportButton" onClick={() => this.exportData("test.xls", this.state.deletedNotices)}>
          <img src={excelIcon} />
          Exporter
        </button>
        <div className="deletedNotices">{this.renderDeletedNotices()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return { group: Auth.user ? Auth.user.group : "" };
};

export default connect(
  mapStateToProps,
  {}
)(DeletedNotices);
