import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { styles } from "../pdfNotice/styles";
import { getNoticeInfo } from "../../src/utils"

// These 3 helpers functions helps to build strings with data
// (witch can be strings, array, array in arrays, etc.)
  function withoutEmptyStrings(data) {
    return data
      .map(x => x && (Array.isArray(x) ? x.join(", ").trim() : String(x).trim()))
      .filter(x => x);
  }
  // Takes `[["foo", "bar"], ["foo"], "bar"]`, returns "foo, bar ; foo ; bar"
  function joinData(data) {
    return withoutEmptyStrings(data).join(" ; ");
  }
  // Takes `[["foo", "bar"], ["foo"], "bar"]`, returns "foo, bar"
  function pickFirst(data) {
    let [first] = withoutEmptyStrings(data);
    return first;
  }

export function JocondeAbregeePdf(notice){
    const { title, subtitle, image_preview } = getNoticeInfo(notice);
    const author = joinData([notice.AUTR, notice.ECOL, notice.EPOQ]);
    let peri = pickFirst([notice.MILL, notice.PERI, notice.EPOQ]);
    if (peri === author) {
      peri = "";
    }
  
    const localisation = joinData([notice.VILLE_M, notice.NOMOFF]);
    return(
        <View style={styles.noticeAbregeeContainer}>
            <Image style={styles.imageAbregee} src={image_preview} />
            <View style={styles.noticeAbregeeDetails}>
                <View style={styles.leftContent}>
                    <Text style={styles.abregeeContentTitle}>{title}</Text>
                    <Text style={styles.abregeeContentSubtitle}>{subtitle}</Text>
                    <Text style={styles.abregeeContentText}>{author}</Text>
                    <Text style={styles.abregeeContentText}>{peri}</Text>
                    <Text style={styles.abregeeContentText}>{localisation}</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.abregeeBase}>Joconde</Text>
                    <Text style={styles.abregeeREF}>{notice.REF}</Text>
                </View>
            </View>
        </View>
    )
}
