import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { styles } from "../pdfNotice/styles";
import { JocondeAbregeePdf } from "./JocondeAbregeePdf";
import { PalissyAbregeePdf } from "./PalissyAbregeePdf";
import { MerimeeAbregeePdf } from "./MerimeeAbregeePdf";
import { MuseoAbregeePdf } from "./MuseoAbregeePdf";
import { MnrAbregeePdf } from "./MnrAbregeePdf";


export function BucketPdf(bucket){
  return(
    <Document>
      <Page style={styles.page}>
        <View>
            <Text style={styles.title}>Panier de notices</Text>
            <Text style={styles.noticeNumber}>{bucket.length ? (bucket.length + " notice" + (bucket.length > 1 ? "s" : "")) : "Le panier est vide"}</Text>
            <View style={styles.bucketContainer}>
                {bucket.length >0?
                bucket.map( notice => {
                  switch (notice.collection){
                    case "joconde" :
                      return JocondeAbregeePdf(notice);
                    case "palissy" :
                      return PalissyAbregeePdf(notice);
                    case "merimee" :
                      return MerimeeAbregeePdf(notice);
                    case "museo" :
                      return MuseoAbregeePdf(notice);
                    case "mnr" :
                      return MnrAbregeePdf(notice);
                    default :
                      return null;
                  }
                }) : ""}
            </View>
        </View>
      </Page>
    </Document>
)}
