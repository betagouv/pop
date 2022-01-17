import { View, Text, Image, Link } from '@react-pdf/renderer';
import { bucket_url, pop_url } from "./../../config";
import { styles } from "../../pdf/pdfNotice/styles";
import { getNoticeInfo } from "../../utils"

export function MerimeeAbregeePdf(notice) {
    const { title, logo, localisation } = getNoticeInfo(notice);
    const line3 = concatTabs(notice.AUTR, notice.SCLE);
    const line4 = notice.STAT + (notice.STAT && notice.DPRO ? " ; " : "") + notice.DPRO;

    return (
        <Link src={pop_url + "notice/" + notice.collection + "/" + notice.REF}>
            <View style={styles.noticeAbregeeContainer}>
                <View style={styles.imageAbregee}>
                    {notice.MEMOIRE.length > 0 ?
                        <Image src={bucket_url + notice.MEMOIRE[0].url + "?" + (new Date()).getTime()} />
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
                        {logo != null && logo !== "" ? <Image style={styles.logo} src={logo} /> : <Text></Text>}
                    </View>
                </View>
            </View>
        </Link>
    )
}

function concatTabs(tab1, tab2) {
    let tab = [];
    let string = tab.concat(tab1).concat(tab2).join(", ");
    return string;
}
