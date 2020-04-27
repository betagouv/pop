import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { styles } from "../pdfNotice/styles";
import { getNoticeInfo } from "../../src/utils"
import { bucket_url, pop_url } from "./../../src/config";

export function MnrAbregeePdf(notice){
    const { title, subtitle, image_preview } = getNoticeInfo(notice);
    const domn = notice.DOMN ? notice.DOMN.join(", ") : "";
    const author = String(notice.AUTR).replace("#", " ");

    return(
        <Link src={pop_url + "notice/" + notice.collection + "/" + notice.REF}>
            <View style={styles.noticeAbregeeContainer}>
                <View style={styles.imageAbregee}>
                    {notice.VIDEO.length > 0 ?
                    <Image src={ bucket_url + notice.VIDEO[0]} />
                    : <Image src={"/static/noimage.png"} />}
                </View>
                <View style={styles.noticeAbregeeDetails}>
                    <View style={styles.leftContent}>
                        <Text style={styles.abregeeContentTextMnr}>{author}</Text>
                        <Text style={styles.abregeeContentTitleMnr}>{title}</Text>
                        <Text style={styles.abregeeContentSubtitleMnr}>{subtitle}</Text>
                        <Text style={styles.abregeeContentTextMnr}>{domn}</Text>
                        <Text style={styles.abregeeContentTextMnr}>{"Localisation : " + notice.LOCA}</Text>
                        <Text style={styles.abregeeContentTextMnr}>{"Etablissement affectaire : " + notice.AFFE}</Text>
                        <Text style={styles.abregeeContentTextMnr}>{notice.CATE}</Text>
                        <Text style={styles.abregeeContentTextMnr}>{notice.PHOT}</Text>
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.abregeeBase}>Mnr</Text>
                        <Text style={styles.abregeeREF}>{notice.INV}</Text>
                        <Image style={styles.logo} src="/static/mnr.png" />
                    </View>
                </View>
            </View>
        </Link>
    )
}
  