import { View, Text, Image, Link } from "@react-pdf/renderer";
import { styles } from "../styles";
import { getNoticeInfo } from "../../../utils";

export function LinkedNoticesPdf(notice) {
	const { title, image_preview } = getNoticeInfo(notice);
	return (
		<Link
			src={
				`https://www.pop.culture.gouv.fr/notice/${notice.collection}/${notice.REF}`
			}
		>
			<View style={styles.linkedNotice}>
				{image_preview && (
					<Image
						style={styles.linkedNoticeImage}
						src={image_preview}
					/>
				)}
				<View style={styles.linkedNoticeDetails}>
					<Text style={styles.linkedNoticeTitle}>{title}</Text>
					<Text style={styles.linkedNoticeContent}>
						{notice.DENO}
					</Text>
					<Text style={styles.linkedNoticeContent}>
						{notice.DOMN}
					</Text>
					<Text style={styles.linkedNoticeContent}>
						{notice.AUTR}
					</Text>
				</View>
			</View>
		</Link>
	);
}
