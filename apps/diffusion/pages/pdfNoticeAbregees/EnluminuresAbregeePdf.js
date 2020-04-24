import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { styles } from "../pdfNotice/styles";
import { getNoticeInfo } from "../../src/utils"

export function EnluminuresAbregeePdf(notice){
    const { title, subtitle, image_preview } = getNoticeInfo(notice);
    const line3 = notice.ATTRIB;
    const line4 = [notice.DATE, notice.ORIGG, notice.ORIGH].filter(d => d).join(", ");
    const line5 = [notice.CONTXT, notice.NOMENC.join(", "), notice.REFD].filter(d => d).join(", ");
    return(
        <View style={styles.noticeAbregeeContainer}>
            <Image style={styles.imageAbregee} src={image_preview} />
            <View style={styles.noticeAbregeeDetails}>
                <View style={styles.leftContent}>
                    <Text style={styles.abregeeContentTitle}>{title}</Text>
                    <Text style={styles.abregeeContentSubtitle}>{subtitle}</Text>
                    <Text style={styles.abregeeContentText}>{line3}</Text>
                    <Text style={styles.abregeeContentText}>{line4}</Text>
                    <Text style={styles.abregeeContentText}>{line5}</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.abregeeBase}>Enluminures</Text>
                    <Text style={styles.abregeeREF}>{notice.REF}</Text>
                </View>
            </View>
        </View>
    )
}
  