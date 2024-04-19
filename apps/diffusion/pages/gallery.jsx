import queryString from "query-string";
import API from "../src/services/api";
import throw404 from "../src/services/throw404";
import { paramsToUrlAlias } from "../src/services/url";

const GalleryPage = () => {
	return throw404();
};
export default GalleryPage;

export const getServerSideProps = async ({ query: { id } }) => {
	try {
		const gallery = await API.getGallery(id);
		const { view, mode, ...params } = gallery.params;
		const location = paramsToUrlAlias(
			mode,
			view,
			params.base,
			queryString.stringify(params),
		);
		return {
			redirect: {
				destination: location,
				permanent: false,
			},
		};
	} catch (err) {
		return {
			notFound: true,
		};
	}
};
