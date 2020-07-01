import css from "styled-jsx/css";

export default css`
  .notice {
    display: flex;
    justify-content: start;
    align-items: "center";
    flex-direction: column;
    padding-bottom: 60px;
  }
  .notice .heading {
    color: #025d59;
    font-size: 28px;
    display: table;
    width: 1000px;
    height: 90px;
    margin: 5px auto;
    text-align: center;
  }

  .heading-title{
    color: #025d59;
    font-size: 28px;
    margin: 0px 5px 0px 5px;
    text-align: center;
    display: table-cell;
    vertical-align: middle;  }

  :global(.top-container) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 15px;
  }

  .addBucket{
    width: fill-content;
    margin-right: 15px;
  }

  .btn-last-search {
    background-color: rgb(55,125,135);
    border: 0px;
    color: rgb(255,255,255);
    max-width: 200px;
    width: 100%;
    padding-top: 7px;
    padding-bottom: 7px;
    text-align: center;
    border-radius: 5px;
    margin-right: 15px;
  }

  .leftContainer-buttons{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 50%;
  }

  .rightContainer-buttons{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    justify-content: flex-end;
  }

  :global(.navButton) {
    font-weight: 600;
    font-size: 60px;
    color: #377d87;
    display: table-cell;
    vertical-align: middle;
  }

  :global(.navButton:hover) {
    cursor: pointer;
  }

  .notice .notice-details {
    background-color: #fff;
    padding: 25px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(189, 189, 189, 0.5);
  }
  :global(.notice .sidebar-section h2) {
    color: #19414c;
    font-weight: 600;
    font-size: 26px;
    margin-bottom: 20px;
  }
  :global(.notice .notice-btn) {
    text-decoration: none;
    background-color: #377d87;
    font-weight: 400;
    font-size: 16px;
    border: 0;
    color: #fff;
    max-width: 250px;
    width: 100%;
    margin: 15px auto 5px;
    padding: 5px;
    display: block;
    text-align: center;
    border-radius: 5px;
  }
  :global(.notice .field span) {
    font-weight: bold;
    display: inline-block;
    word-wrap: break-word;
  }
  :global(.notice .sidebar-section) {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
    margin-bottom: 20px;
  }
  :global(.notice .sidebar-section.links .card) {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px 0 rgba(189, 189, 189, 0.5);
    transition: 0.3s;
    height: 110px;
    overflow: hidden;
  }
  :global(.notice .sidebar-section.links .card:hover) {
    box-shadow: 0 3px 6px 0 rgba(189, 189, 189, 1);
  }
  :global(.notice .sidebar-section.links .card .content) {
    padding: 10px 10px 10px 0;
    overflow: hidden;
    width: 100%;
  }
  :global(.notice .sidebar-section.links .card img) {
    width: 120px;
    object-fit: cover;
    margin-right: 15px;
  }
  :global(.notice .sidebar-section.links .card .content .categories) {
    font-size: 12px;
    color: #808d9e;
    font-weight: 300;
    margin-bottom: 5px;
  }
  :global(.notice .sidebar-section.links .card h1) {
    color: #025d59;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :global(.notice .sidebar-section.links .card p) {
    color: #484848;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    white-space: nowrap;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :global(.highlight) {
    background-color: #377d87;
    color: white;
  }
`;
