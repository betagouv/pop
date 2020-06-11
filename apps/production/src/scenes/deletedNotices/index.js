import React from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";
import "./index.css";
import excelIcon from "../../assets/microsoftexcel.svg";


class DeletedNotices extends React.Component {
  state = { deletedNotices: [],
            group: null,
            loading: true,
            triUser: false,
            triEmail: false,
            triBase: false,
            triDate: false,
            triRef: false
          };

  fetchDeletedNotices = async () => {
    this.setState({ loading: true });
    try {
      //Récuperation de l'historique complet
      const responseHistorique = await api.getDeleteHistoriques();
      let historiqueList = responseHistorique.deleteHistorique || [];

      //Récuperation du group de l'utilisateur
      let group;
      let authorizedBases = [];
      let originalOrder = [];

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


  triByUser(a,b){
    if(a.USER == undefined && b.USER !== undefined){return 1;}
    else if(a.USER !== undefined && b.USER == undefined){return -1;}
    else {return (a.USER > b.USER)?1:-1;}
  }
  triByEmail(a,b){
    if(a.EMAIL == undefined && b.EMAIL !== undefined){return 1;}
    else if(a.EMAIL !== undefined && b.EMAIL == undefined){return -1;}
    else {return (a.EMAIL > b.EMAIL)?1:-1;}
  }
  triByBase(a,b){
    if(a.BASE == undefined && b.BASE !== undefined){return 1;}
    else if(a.BASE !== undefined && b.BASE == undefined){return -1;}
    else {return (a.BASE > b.BASE)?1:-1;}
  }
  triByRef(a,b){
    if(a.REF == undefined && b.REF !== undefined){return 1;}
    else if(a.REF !== undefined && b.REF == undefined){return -1;}
    else {return (a.REF > b.REF)?1:-1;}
  }
  triByDate(a,b){ 
    const dateA = new Date(a.DATE);
    const dateB = new Date(b.DATE);

    if(dateA == "Invalid Date" && dateB !== "Invalid Date"){
      return 1;
    }
    else if(dateA !== "Invalid Date" && dateB == "Invalid Date"){
      return -1;
    }
    else {
      return (dateA > dateB)?1:-1;
    }
  }

  sort(mode){
    let deletedNotices = this.state.deletedNotices;
    let triUser = this.state.triUser;
    let triEmail = this.state.triEmail;
    let triBase = this.state.triBase;
    let triDate = this.state.triDate;
    let triRef = this.state.triRef;

    switch(mode){
        case "user":
          if(!triUser){
            deletedNotices.sort(this.triByUser);
            this.setState({triUser: true, triBase: false, triRef: false, triDate: false, triEmail: false})
          }
          else{
            deletedNotices.reverse();
          }
          break;
        case "email":
          if(!triEmail){
            deletedNotices.sort(this.triByEmail);
            this.setState({triUser: false, triBase: false, triRef: false, triDate: false, triEmail: true})
          }
          else{
            deletedNotices.reverse();
          }
          break;
        case "base":
          if(!triBase){
            deletedNotices.sort(this.triByBase);
            this.setState({triUser: false, triBase: true, triRef: false, triDate: false, triEmail: false})
          }
          else{
            deletedNotices.reverse();
          }
          break;
        case "date":
          if(!triDate){
            deletedNotices.sort(this.triByDate);
            this.setState({triUser: false, triBase: false, triRef: false, triDate: true, triEmail: false})
          }
          else{
            deletedNotices.reverse();
          }
          break;
        case "ref":
          if(!triRef){
            deletedNotices.sort(this.triByRef);
            this.setState({triUser: false, triBase: false, triRef: true, triDate: false, triEmail: false})
          }
          else{
            deletedNotices.reverse();
          }
          break;
        default:
          return null;
    }
    this.setState({deletedNotices: deletedNotices});
  }

  renderDeletedNotices(){
    return (
      <Table>
        <thead>
          <tr>
            <th className="historiqueTitle" onClick={() => this.sort("ref")}>REF</th>
            <th className="historiqueTitle" onClick={() => this.sort("base")}>Base</th>
            <th className="historiqueTitle" onClick={() => this.sort("user")}>Utilisateur</th>
            <th className="historiqueTitle" onClick={() => this.sort("email")}>Email</th>
            <th className="historiqueTitle" onClick={() => this.sort("date")}>Date</th>
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
