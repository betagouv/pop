import { Document, Page, View, Text } from "@react-pdf/renderer";
import { styles } from "../../pdf/pdfNotice/styles";
import { JocondeAbregeePdf } from "./JocondeAbregeePdf";
import { PalissyAbregeePdf } from "./PalissyAbregeePdf";
import { MerimeeAbregeePdf } from "./MerimeeAbregeePdf";
import { MuseoAbregeePdf } from "./MuseoAbregeePdf";
import { MnrAbregeePdf } from "./MnrAbregeePdf";
import { MemoireAbregeePdf } from "./MemoireAbregeePdf";
import { EnluminuresAbregeePdf } from "./EnluminuresAbregeePdf";
import { AutorAbregeePdf } from "./AutorAbregeePdf";

export function BucketPdf(bucket) {
	return (
		<Document>
			<Page style={styles.page}>
				<View>
					<Text style={styles.title}>Panier de notices</Text>
					<Text
						style={styles.title}
						render={({ pageNumber, totalPages }) =>
							pageNumber !== 1 ? "\n" : ""
						}
						fixed
					/>
					<Text style={styles.noticeNumber}>
						{bucket.length
							? `${bucket.length} notice${bucket.length > 1 ? "s" : ""}`
							: "Le panier est vide"}
					</Text>
					<View style={styles.bucketContainer}>
						{bucket.length > 0
							? bucket.map((notice) => {
									switch (notice.collection) {
										case "joconde":
											return JocondeAbregeePdf(notice);
										case "palissy":
											return PalissyAbregeePdf(notice);
										case "merimee":
											return MerimeeAbregeePdf(notice);
										case "museo":
											return MuseoAbregeePdf(notice);
										case "mnr":
											return MnrAbregeePdf(notice);
										case "memoire":
											return MemoireAbregeePdf(notice);
										case "enluminures":
											return EnluminuresAbregeePdf(
												notice,
											);
										case "autor":
											return AutorAbregeePdf(notice);
										default:
											return null;
									}
								})
							: ""}
					</View>
				</View>
				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) =>
						`${pageNumber} / ${totalPages}`
					}
					fixed
				/>
			</Page>
		</Document>
	);
}
