import * as React from "react";
import { Text, Image, View, Link } from '@react-pdf/renderer';
import { styles } from "../../pages/pdfNotice/styles";

export default ({ content, title, separator, join = ", ", isPdf, link }) => {
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
      // Fix simple quotes and capitalize first letter (only if it's a string)
      str = str.replace(/\u0092/g, `'`).replace(/^./, str => str.toUpperCase());
      if (separator) {
        str = replaceAll(str, separator, "\n");
      }
    }
  }

  if(!isPdf){
    return (
      <div id={title} className="field">
        <h3>{title}</h3>
        <p>{str}</p>
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