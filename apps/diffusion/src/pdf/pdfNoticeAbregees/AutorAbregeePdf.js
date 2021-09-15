import { bucket_url, pop_url } from "./../../config";
import { View, Text, Image, Link } from '@react-pdf/renderer';
import { styles } from "../../pdf/pdfNotice/styles";
import { getNoticeInfo } from "../../utils"

export function AutorAbregeePdf(notice) {
    const { logo, nom, description, fonction, symbole } = getNoticeInfo(notice);

    return (
        <Link src={pop_url + "notice/" + notice.collection + "/" + notice.REF}>
            <View style={styles.noticeAbregeeContainer}>
                <View style={styles.imageAbregee}>
                    {notice.MEMOIRE.length > 0 ?
                        <Image src={bucket_url + notice.MEMOIRE[0].url} />
                        : <Image src={"/static/noimage.png"} />}
                </View>
                <View style={styles.noticeAbregeeDetails}>
                    <View style={styles.leftContent}>
                        <Text style={styles.abregeeContentTitle}>{nom}</Text>
                        <Text style={styles.abregeeContentSubtitle}>{description}</Text>
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
