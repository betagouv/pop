import * as React from "react";
import { Text, Image, View, Link } from '@react-pdf/renderer';
import { styles } from "../../pages/pdfNotice/styles";

export default ({ content, title, separator, join = ", ", isPdf, link, addLink, upper = true }) => {
  // Don't render empty elements.
  const isEmptyArray = c => Array.isArray(c) && c.length === 0;
  const isEmptyString = s => typeof s === "string" && !s.trim();
  if (!content || isEmptyArray(content) || isEmptyString(content)) {
    return null;
  }

  let str;
  if(!link){
    // Transform array to string, by joining with a character.
    str = Array.isArray(content) ? content.join(join) : content;

    // Don't apply transformations on React components
    if (!React.isValidElement(str)) {
      // Fix simple quotes (only if it's a string)
      str = str.replace(/\u0092/g, `'`);

      // Capitalize first letter (if needed)
      if(upper){
        str = str.replace(/^./, str => str.toUpperCase());
      }

      if(separator && typeof str == "string" && str.indexOf(separator) > -1){ 
        str = str.replace(new RegExp(separator, "g"), "\n");
      }
    }
  }

  if(!isPdf){

    // modification du retour à la ligne \n non interprété dans la page web
    if (typeof str == 'string') {
      let arraySplit = str.split("\n");
      let arrayContent = [];
      arraySplit.forEach((element, index) => {
        if(index > 0){
          arrayContent.push(<br />);
        }
        arrayContent.push(element);
      });
      str = arrayContent.reduce((a,b) => [a, ' ', b]);
    }
 
    if(typeof str == 'string' && addLink != 'undefined' && addLink){
      str = addLinkToText(str);
    }else{
      str = <p>{str}</p>;
    }

  
    return (
      <div id={title} className="field">
        <h3>{title}</h3>

        {str}
        
        <style jsx>{`
          .field {
            padding-bottom: 10px;
          }

          .field p {
            font-weight: normal;
            font-size: 1rem;
            word-wrap: break-word;
            white-space: pre-line;
            margin-bottom: 0px;
            text-align: justify;
          }

          .field h3 {
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.5;
            color: #19414cd0;
            text-align: left;
            padding-right: 7px;
            margin-bottom: 3px;
          }
        `}</style>
      </div>
    );
  }
  //Si on imprime un pdf d'une notice
  else {
    //S'il s'agit de liens cliquables
    if(link){
      return (
        <View>
          <Text style={styles.fieldTitle} >{title + " : "}</Text>
          <View style={styles.listLinked}>
            {Array.isArray(content)? content.map( (item, index) => {
              return (
                item ?
                <View style={styles.listItem}>
                  <Link style={styles.textLinked} 
                        key={item.val? item.val : item} 
                        src={item.url? item.url : item}>
                        {item.val? item.val : item}
                  </Link>
                  {(index < content.length-1) ? <Text>, </Text> : null}
                </View> : null)
            }) : 
            <Link style={styles.textLinked} src={content.url? content.url : content} >{content.val? content.val : content}</Link>}
          </View>
        </View>
      )
    }
    //S'il s'agit de texte statique
    else {
      return (
        <View>
          <Text style={styles.fieldTitle} >{title + " : "}</Text>
          <Text style={styles.text} >{str}</Text>
        </View>
      )
    }
  }
};

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

function addLinkToText(str){
  let result;
  let obj = new Object();
  let i = 1;
  
  do{
    result = splitString(str);
    
    obj['text_'+i] = result.text1;
    
    if (result.continue){
        obj['link_'+i] = result.link;
        str = result.text3;
        i++;
    }else{
        if(typeof result.link !== 'undefined'){
            obj['link_'+i] = result.link;
        }
    }
  }
  while(result.continue);

  let content = [];

  for (let j = 1; j <= i; j++) {
    
    if(typeof obj['text_'+j] != 'undefined'){
      content.push(obj['text_'+j]);
    }
    if(typeof obj['link_'+j] != 'undefined'){
      if(obj['link_'+j].toLowerCase().indexOf('www') === 0){
        content.push(<a href={"http://"+obj['link_'+j]} target="_blank">{obj['link_'+j]}</a>);
      }else{
        content.push(<a href={obj['link_'+j]} target="_blank">{obj['link_'+j]}</a>);
      }
    }
  }

  return <p>{content}</p>;
}

function splitString(str){
  const termeHTTP = 'http';
  const termeWWW = 'www';
  const termeEspace = ' ';

  const length = str.length;

  // Recherche du premier http ou www rencontré
  let splitHTTP = str.toLowerCase().indexOf(termeHTTP);
  let splitWWW = str.toLowerCase().indexOf(termeWWW);
  let firstSplit;

  if(splitHTTP !== -1 && splitWWW !== -1){
      if(splitHTTP < splitWWW){
          firstSplit = splitHTTP;
      }else{
          firstSplit = splitWWW;
      }
  }else if(splitHTTP !== -1 && splitWWW === -1){
      firstSplit = splitHTTP;
  }else if(splitHTTP === -1 && splitWWW !== -1){
      firstSplit = splitWWW;
  }else{
      return {text1: str, continue:false};
  }

  // Découpage en 2 selon la première occurence trouvée
  let text1 = str.substring(0, firstSplit);
  let text2 = str.substring(firstSplit, length);

  // Découpage de la 2ème partie pour trouver la fin du lien
  let splitEspace = text2.indexOf(termeEspace);

  if(splitEspace === -1){
      let link = text2.substring(0, length);
      return {text1: text1, link: link, continue:false}
  }

  let link = text2.substring(0, splitEspace);
  let text3 = text2.substring(splitEspace, length);

  return {text1: text1, link: link, text3: text3, continue:true}
}