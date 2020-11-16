import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { bucket_url, pop_url } from "./../../src/config";
import { styles } from "../pdfNotice/styles";
import { getNoticeInfo } from "../../src/utils"

export function MerimeeAbregeePdf(notice){
    const { title, logo, image_preview, localisation } = getNoticeInfo(notice);
    const line3 = concatTabs(notice.AUTR, notice.SCLE);
    const line4 = notice.STAT + (notice.STAT && notice.DPRO ? " ; " : "") + notice.DPRO;

    return(
        <Link src={pop_url + "notice/" + notice.collection + "/" + notice.REF}>
            <View style={styles.noticeAbregeeContainer}>
                <View style={styles.imageAbregee}>
                    {notice.MEMOIRE.length > 0 ?
                    <Image src={ bucket_url + notice.MEMOIRE[0].url} />
                    : <Image src={"/static/noimage.png"} />}
                </View>
                <View style={styles.noticeAbregeeDetails}>
                    <View style={styles.leftContent}>
                        <Text style={styles.abregeeContentTitle}>{title}</Text>
                        <Text style={styles.abregeeContentText}>{localisation}</Text>
                        <Text style={styles.abregeeContentText}>{line3}</Text>
                        <Text style={styles.abregeeContentText}>{line4}</Text>
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.abregeeBase}>Mérimée</Text>
                        <Text style={styles.abregeeREF}>{notice.REF}</Text>
                        { logo != null ? <Image style={styles.logo} src={logo} /> : '' }
                    </View>
                </View>
            </View>
        </Link>
    )
}

function concatTabs(tab1, tab2){
    let tab = [];
    let string = tab.concat(tab1).concat(tab2).join(", ");
    return string;
}
  