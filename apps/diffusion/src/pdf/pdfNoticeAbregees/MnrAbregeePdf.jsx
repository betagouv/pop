import { Image, Link, Text, View } from "@react-pdf/renderer";
import { bucket_url, pop_url } from "../../config";
import { getNoticeInfo } from "../../utils";
import { styles } from "../pdfNotice/styles";

export function MnrAbregeePdf(notice) {
	const { title, subtitle } = getNoticeInfo(notice);
	const domn = notice.DOMN ? notice.DOMN.join(", ") : "";
	const author = String(notice.AUTR).replace("#", " ");

	return (
		<Link src={`${pop_url}notice/${notice.collection}/${notice.REF}`}>
			<View style={styles.noticeAbregeeContainer}>
				<View style={styles.imageAbregee}>
					{notice.VIDEO.length > 0 ? (
						<Image
							src={
								// biome-ignore lint/style/useTemplate: <explanation>
								bucket_url +
								notice.VIDEO[0] +
								"?" +
								new Date().getTime()
							}
						/>
					) : (
						<Image src={"/static/noimage.png"} />
					)}
				</View>
				<View style={styles.noticeAbregeeDetails}>
					<View style={styles.leftContent}>
						<Text style={styles.abregeeContentTextMnr}>
							{author}
						</Text>
						<Text style={styles.abregeeContentTitleMnr}>
							{title}
						</Text>
						<Text style={styles.abregeeContentSubtitleMnr}>
							{subtitle}
						</Text>
						<Text style={styles.abregeeContentTextMnr}>{domn}</Text>
						<Text style={styles.abregeeContentTextMnr}>
							{`Localisation : ${notice.LOCA}`}
						</Text>
						<Text style={styles.abregeeContentTextMnr}>
							{`Etablissement affectaire : ${notice.AFFE}`}
						</Text>
						<Text style={styles.abregeeContentTextMnr}>
							{notice.CATE}
						</Text>
						<Text style={styles.abregeeContentTextMnr}>
							{notice.PHOT}
						</Text>
					</View>
					<View style={styles.rightContent}>
						<Text style={styles.abregeeBase}>Mnr</Text>
						<Text style={styles.abregeeREF}>{notice.INV}</Text>
						<Image style={styles.logo} src="/static/mnr.png" />
					</View>
				</View>
			</View>
		</Link>
	);
}
