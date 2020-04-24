import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { styles } from "../pdfNotice/styles";
import { getNoticeInfo } from "../../src/utils"

// These 3 helpers functions helps to build strings with notice
// (witch can be strings, array, array in arrays, etc.)
function withoutEmptyStrings(notice) {
    return notice
      .map(x => x && (Array.isArray(x) ? x.join(", ").trim() : String(x).trim()))
      .filter(x => x);
  }
  // Takes `[["foo", "bar"], ["foo"], "bar"]`, returns "foo, bar ; foo ; bar"
  function joinData(notice) {
    return withoutEmptyStrings(notice).join(" ; ");
  }


export function MemoireAbregeePdf(notice){
    const { title, subtitle, logo, image_preview } = getNoticeInfo(notice);

    const content = joinData([
        notice.OBJET,
        notice.EDIF,
        notice.LEG,
        notice.DATOEU,
        notice.DATOEU ? "" : notice.SCLE
      ]);
    
      const author = notice.AUTP;
      const date = joinData([notice.DATPV, notice.DATOR]);
      const localisation = notice.LOCA;
    return(
        <View style={styles.noticeAbregeeContainer}>
            <Image style={styles.imageAbregee} src={image_preview} />
            <View style={styles.noticeAbregeeDetails}>
                <View style={styles.leftContent}>
                    <Text style={styles.abregeeContentTitle}>{title}</Text>
                    <Text style={styles.abregeeContentSubtitle}>{subtitle}</Text>
                    <Text style={styles.abregeeContentText}>{author}</Text>
                    <Text style={styles.abregeeContentText}>{localisation}</Text>
                    <Text style={styles.abregeeContentText}>{date}</Text>
                    <Text style={styles.abregeeContentText}>{content}</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.abregeeBase}>Mémoire</Text>
                    <Text style={styles.abregeeREF}>{notice.REF}</Text>
                </View>
            </View>
        </View>
    )
}
  