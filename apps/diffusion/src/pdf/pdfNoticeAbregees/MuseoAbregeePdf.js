import { View, Text, Image, Link } from '@react-pdf/renderer';
import { styles } from "../../pdf/pdfNotice/styles";
import { bucket_url, pop_url } from "./../../config";
import { getNoticeInfo } from "../../utils"

export function MuseoAbregeePdf(notice) {
    const { title, subtitle, image_preview, localisation } = getNoticeInfo(notice);

    return (
        <Link src={pop_url + "notice/" + notice.collection + "/" + notice.REF}>
            <View style={styles.noticeAbregeeContainer}>
                <View style={styles.imageAbregee}>
                    {notice.PHOTO ?
                        <Image src={bucket_url + notice.PHOTO} />
                        : <Image src={"/static/noimage.png"} />}
                </View>
                <View style={styles.noticeAbregeeDetails}>
                    <View style={styles.leftContent}>
                        <Text style={styles.abregeeContentTitle}>{title}</Text>
                        <Text style={styles.abregeeContentSubtitle}>{subtitle}</Text>
                        <Text style={styles.abregeeContentText}>{notice.NOMOFF ? "" : notice.NOMUSAGE}</Text>
                        <Text style={styles.abregeeContentText}>{localisation}</Text>
                    </View>
                    <View style={styles.rightContent}>
                        <Text style={styles.abregeeBase}>Museo</Text>
                        <Text style={styles.abregeeREF}>{notice.REF}</Text>
                        <Image style={styles.logo} src="/static/musee-de-france.png" />
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
