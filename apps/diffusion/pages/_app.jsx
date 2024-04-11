import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";

export default function CustomApp({ Component, pageProps }) {
	const cookies = new Cookies();
	const currentBucket = cookies.get("currentBucket") || [];
	const jsonCurrentBucket = JSON.stringify(currentBucket);
	cookies.set("currentBucket", jsonCurrentBucket, {
		path: "/",
		overwrite: true,
	});

	useEffect(() => {
		NProgress.configure({ showSpinner: false });
		Router.events.on("routeChangeStart", (url) => {
			NProgress.start();
			if (window && window._paq) {
				window._paq.push(["setCustomUrl", url]);
				window._paq.push(["setDocumentTitle", document.title]);
				window._paq.push(["trackPageView"]);
			}
		});
		Router.events.on("routeChangeComplete", () => NProgress.done());
		Router.events.on("routeChangeError", () => NProgress.done());
	}, []);

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
			</Head>
			<Component {...pageProps} />
			<style jsx global>{`
          html {
            position: relative;
            min-height: 100%;
          }
          body {
            margin: 0;
            overflow: hidden;
            overflow-y: auto;
            font-family: "Open Sans", sans-serif;
            color: #2a282b;
            background-color: #e5edef;
          }
          @media screen and (min-width: 499px) {
            body {
              margin-bottom: 60px;
            }
          }

          @font-face {
            font-family: "Open Sans";
            font-style: normal;
            font-weight: 300;
            src: local("Open Sans Light"), local("OpenSans-Light"),
              url("/static/fonts/open-sans-v15-latin-300.woff2") format("woff2"),
              url("/static/fonts/open-sans-v15-latin-300.woff") format("woff");
          }

          @font-face {
            font-family: "Open Sans";
            font-style: normal;
            font-weight: 400;
            src: local("Open Sans Regular"), local("OpenSans-Regular"),
              url("/static/fonts/open-sans-v15-latin-regular.woff2") format("woff2"),
              url("/static/fonts/open-sans-v15-latin-regular.woff") format("woff");
          }

          @font-face {
            font-family: "Open Sans";
            font-style: normal;
            font-weight: 600;
            src: local("Open Sans SemiBold"), local("OpenSans-SemiBold"),
              url("/static/fonts/open-sans-v15-latin-600.woff2") format("woff2"),
              url("/static/fonts/open-sans-v15-latin-600.woff") format("woff");
          }

          @font-face {
            font-family: "Open Sans";
            font-style: normal;
            font-weight: 700;
            src: local("Open Sans Bold"), local("OpenSans-Bold"),
              url("/static/fonts/open-sans-v15-latin-700.woff2") format("woff2"),
              url("/static/fonts/open-sans-v15-latin-700.woff") format("woff");
          }

          @font-face {
            font-family: "Nexa";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/nexa.woff2") format("woff2"),
              url("/static/fonts/nexa.woff") format("woff");
          }
        `}</style>
		</>
	);
}

if (process.env.OVH === "true") {
	// We need to opt-out of optimisation to use publicRuntimeConfig
	CustomApp.getInitialProps = async (appContext) => {
		const ctx = App.getInitialProps(appContext);
		return ctx;
	};
}
