import Head from "next/head";
import React from "react";
import { Button, Input, Container} from "reactstrap";
import Router from "next/router";
import Layout from "../src/components/Layout";
import { pushSearchRoute } from "../src/services/url";
import TopicCard from "../src/topics/TopicCard";
import Cookies from 'universal-cookie';
import {Joconde, Memoire} from "../src/search/Results/CardList";
import API from "../src/services/api"

export default class Bucket extends React.Component {
  state = { bucket: [], loading: true };

  /* componentDidMount() {
    this.fillBucket();
  }

  //Récupère les données de la liste des notices du panier
  fillBucket = async () => {
    let cookies = new Cookies();
    const bucket = cookies.get("bucketList");
    bucket.map(item => {
      try {
        API.getNotice(item.base, item.ref).then( notice => {
          let newBucket = this.state.bucket;
          newBucket.push(notice);
          this.setState({bucket : newBucket})
        });
      } catch (e) {
        toastr.error("Erreur lors de la récupération des notices. L'API est innacessible", e);
      }
    })
  }; */

  componentDidMount(){
    this.fillBucket();
  }

  fillBucket = async () => {
    let cookies = new Cookies();
    const bucket = cookies.get("bucketList");
    try{
      let newBucket = await Promise.all(
        bucket.map(async item => {
          let notice = await API.getNotice(item.base, item.ref);
          return notice;
        })
      )
      this.setState({bucket: newBucket});
    }
    catch(e){
      return [];
    }
  }

  displayCard(notice){
    switch(notice.collection){
      case "joconde" :
        return <Joconde data={notice} />
      case "memoire" :
        return <Memoire data={notice} />
      default :
        return null;
    }
  }


  render() {
    return (
      <div className="bucketList">
        <Layout>
          <div className="home">
              <Head>
                  <title>Panier de notices</title>
              </Head>
          </div>
        </Layout>
        <div className="bucketContainer">
          <h1 className="bucketTitle">Panier de notices</h1>
          <div className="notices">
            {this.state.bucket.map( notice =>
              <div>
                {this.displayCard(notice)}
              </div>
            )}
          </div>
        </div>
        <style jsx global>{`
            .home {
              height: 100%;
            }

            .bucketContainer{
              padding-top: 20px;
            }

            .bucketTitle{
              display: flex;
              justify-content: center;
              font-size: 30px;
            }

            .notices {
              display: flex;
              flex-direction: column;
              align-content: center;
              padding-top: 30px;
            }
            .list-card {
              display: flex;
              justify-content: center;
              width: 100%;
            }
    
            .list-card .list-card-container {
              display: flex;
              flex-direction: row;
              box-shadow: 0 2px 4px 0 rgba(189, 189, 189, 0.5);
              transition: 0.3s;
              height: 110px;
              overflow: hidden;
              background-color: white;
              height: auto;
              margin: 7px 0px 7px 0px;
              border-radius: 5px;
              width: 80%;
            }
    
            .list-card .list-card-container:hover {
              box-shadow: 0 3px 6px 0 rgba(189, 189, 189, 1);
            }
    
            .list-card .content {
              padding: 15px 30px 10px 0;
              overflow: hidden;
              width: 100%;
              position: relative;
            }
            .list-card .thumbnail {
              width: 290px;
              margin-right: 30px;
              background-color: #f8f8f8;
              display: flex;
              justify-content: center;
              align-items: center;
              padding-left: 10px;
            }
    
            .list-card img {
              width: 100%;
              height: 200px;
              object-fit: contain;
            }
    
            .list-card img.no-img {
              width: 190px;
              height: 140px;
            }
    
            .list-card .content .categories {
              font-size: 18px;
              color: #808d9e;
              font-weight: 300;
              margin-bottom: 10px;
            }
    
            .list-card h2 {
              font-weight: 600;
              font-size: 18px;
              color: #2a282b;
              margin-bottom: 0;
            }
    
            .list-card span {
              font-weight: 400;
              font-size: 16px;
              color: #19414c;
              margin-left: auto;
              text-align: right;
            }
    
            .list-card p {
              color: #2a282b;
              font-weight: 400;
              font-size: 16px;
              margin-bottom: 5px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
    
            .list-card .base {
              float: right;
            }
    
            .list-card img.producteur {
              width: 50px;
              height: auto;
              position: absolute;
              right: 7px;
              bottom: 7px;
            }
            .list-card img.producteur.mh {
              width: 100px;
            }
          `}</style>
      </div>
      
    );
  }
}
