import { View, Text, Image, Link } from '@react-pdf/renderer';
import { bucket_url, pop_url } from "./../../config";
import { styles } from "../../pdf/pdfNotice/styles";
import { getNoticeInfo } from "../../utils"

export function EnluminuresAbregeePdf(notice) {
    const { title, subtitle } = getNoticeInfo(notice);
    const line3 = notice.ATTRIB;
    const line4 = [notice.DATE, notice.ORIGG, notice.ORIGH].filter(d => d).join(", ");
    const line5 = [notice.CONTXT, notice.NOMENC.join(", "), notice.REFD].filter(d => d).join(", ");
    return (
        <Link src={pop_url + "notice/" + notice.collection + "/" + notice.REF}>
            <View style={styles.noticeAbregeeContainer}>
                <View style={styles.imageAbregee}>
                    {notice.VIDEO.length > 0 ?
                        <Image src={bucket_url + notice.VIDEO[0] + "?" + (new Date()).getTime()} />
                        : <Image src={"/static/noimage.png"} />}
                </View>
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
        </Link>
    )
}
