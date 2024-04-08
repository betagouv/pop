import ErrorPage from "../404";

export default () => {
	console.log("404 NOTICE");
	return <ErrorPage statusCode={404} />;
};
