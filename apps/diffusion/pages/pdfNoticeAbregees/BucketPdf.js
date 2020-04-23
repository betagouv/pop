import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { styles } from "../pdfNotice/styles";
import { JocondeAbregeePdf } from "./JocondeAbregeePdf"


export function BucketPdf(bucket){
  return(
    <Document>
      <Page style={styles.page}>
        <View>
            <Text style={styles.title}>TEST ZEBI</Text>
            <View>
                {bucket.length >0?
                bucket.map( notice => {
                    return JocondeAbregeePdf(notice);
                }) : ""}
            </View>
        </View>
      </Page>
    </Document>
)}
