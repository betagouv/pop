import { bucket_url, pop_url } from "./../../config";
import { View, Text, Image, Link } from '@react-pdf/renderer';
import { styles } from "../../pdf/pdfNotice/styles";
import { getNoticeInfo } from "../../utils"

// These 3 helpers functions helps to build strings with data
// (witch can be strings, array, array in arrays, etc.)
function withoutEmptyStrings(data) {
  return data
    .map(x => x && (Array.isArray(x) ? x.join(", ").trim() : String(x).trim()))
    .filter(x => x);
}
// Takes `[["foo", "bar"], ["foo"], "bar"]`, returns "foo, bar ; foo ; bar"
function joinData(data) {
  return withoutEmptyStrings(data).join(" ; ");
}
// Takes `[["foo", "bar"], ["foo"], "bar"]`, returns "foo, bar"
function pickFirst(data) {
  let [first] = withoutEmptyStrings(data);
  return first;
}

export function JocondeAbregeePdf(notice) {
  const { title, subtitle } = getNoticeInfo(notice);
  const author = joinData([notice.AUTR, notice.ECOL, notice.EPOQ]);
  let peri = pickFirst([notice.MILL, notice.PERI, notice.EPOQ]);
  if (peri === author) {
    peri = "";
  }

  const localisation = joinData([notice.VILLE_M, notice.NOMOFF]);
  return (
    <Link src={pop_url + "notice/" + notice.collection + "/" + notice.REF}>
      <View style={styles.noticeAbregeeContainer}>
        <View style={styles.imageAbregee}>
          {notice.IMG.length > 0 ?
            <Image src={bucket_url + notice.IMG[0] + "?" + (new Date()).getTime()} />
            : <Image src={"/static/noimage.png"} />}
        </View>
        <View style={styles.noticeAbregeeDetails}>
          <View style={styles.leftContent}>
            <Text style={styles.abregeeContentTitle}>{title}</Text>
            <Text style={styles.abregeeContentSubtitle}>{subtitle}</Text>
            <Text style={styles.abregeeContentText}>{author}</Text>
            <Text style={styles.abregeeContentText}>{peri}</Text>
            <Text style={styles.abregeeContentText}>{localisation}</Text>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.abregeeBase}>Joconde</Text>
            <Text style={styles.abregeeREF}>{notice.REF}</Text>
          </View>
        </View>
      </View>
    </Link>
  )
}
