import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Open Sans',
    fonts: [
        { src: "../../static/fonts/open-sans-v15-latin-300.woff", fontWeight: 300 },
        { src: "../../static/fonts/open-sans-v15-latin-600.woff", fontWeight: 600 },
        { src: "../../static/fonts/open-sans-v15-latin-700.woff", fontWeight: 700 }
    ]
});


export const styles = StyleSheet.create({
    page: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        backgroundColor: "#e5edef"
    },
    content: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-around",
        backgroundColor: "#e5edef"
    },
    body: {
        display: "flex",
        flexDirection: "column",
        margin : "5px",
        padding : "10px",
        backgroundColor: "#ffffff",
        width: "55%"
    },
    seeMore: {
        display: "flex",
        flexDirection: "column",
        margin : "5px",
        padding : "10px",
        width: "35%"
    },
    aPropos: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        backgroundColor: "#ffffff",
        padding: "10px"
    },
    image: {
        margin: "10px"
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Open Sans',
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Open Sans',
        fontWeight: 700,
        marginBottom: "5px"
    },
    fieldTitle: {
        fontSize: 12,
        fontFamily: 'Open Sans',
        fontWeight: 600
    },
    text: {
        fontSize: 10,
        fontFamily: 'Open Sans',
        fontWeight: 300,
        marginBottom: "10px"
    },
    textLinked: {
        fontSize: 10,
        fontFamily: 'Open Sans',
        fontWeight: 300,
        marginBottom: "10px"
    },
    listLinked: {
        fontSize: 10,
        fontFamily: 'Open Sans',
        fontWeight: 300,
        marginBottom: "10px",
        display: "flex",
        flexDirection: "row"
    },
    listItem: {
        display: "flex",
        flexDirection: "row"
    }
});