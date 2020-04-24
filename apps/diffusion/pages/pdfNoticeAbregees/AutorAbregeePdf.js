import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { bucket_url } from "./../../src/config";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { styles } from "../pdfNotice/styles";
import { getNoticeInfo } from "../../src/utils"

export function AutorAbregeePdf(notice){
    const { logo, nom, description, fonction, image_preview, symbole } = getNoticeInfo(data);

    return(
        <Link src={"https://www.pop.culture.gouv.fr/notice/palissy/" + notice.REF}>
        <View style={styles.noticeAbregeeContainer}>
        <View style={styles.imageAbregee}>
            {notice.MEMOIRE.length > 0 ?
            <Image src={ bucket_url + notice.MEMOIRE[0].url} />
            : <Image src={"/static/noimage.png"} />}
        </View>
        <View style={styles.noticeAbregeeDetails}>
                <View style={styles.leftContent}>
                    <Text style={styles.abregeeContentTitle}>{nom}</Text>
                    <Text style={styles.abregeeContentSubtitle}>{description}</Text>
                    <Text style={styles.abregeeContentText}>{localisation}</Text>
                    <Text style={styles.abregeeContentText}>{fonction}</Text>
                    <Text style={styles.abregeeContentText}>{symbole}</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.abregeeBase}>Autor</Text>
                    <Text style={styles.abregeeREF}>{notice.REF}</Text>
                </View>
            </View>
        </View>
        </Link>
    )
}
  