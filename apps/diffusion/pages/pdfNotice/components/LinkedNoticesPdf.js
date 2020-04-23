import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { styles } from "../../pdfNotice/styles";

export function LinkedNoticesPdf(image_preview, title, deno, domn, autr){
    return(
        <View style={styles.linkedNoticesContainer}>
            <Image src={image_preview} />
            <View>
                <Text style={styles.linkedNoticeTitle}>{title}</Text>
                <Text style={styles.linkedNoticeContent}>{deno}</Text>
                <Text style={styles.linkedNoticeContent}>{domn}</Text>
                <Text style={styles.linkedNoticeContent}>{autr}</Text>
            </View>
        </View>
    )
}