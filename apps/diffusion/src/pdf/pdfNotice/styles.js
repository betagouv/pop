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
        backgroundColor: "#e5edef",
        paddingBottom: 15
    },
    header: {
        fontSize: 12,
        textAlign: 'center',
        color: 'grey',
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
    voirAussi: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        backgroundColor: "#ffffff",
        padding: "10px",
        marginTop:"10px"
    },
    image: {
        margin: "10px"
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Open Sans',
        marginTop: "10px",
        marginLeft: "20px", 
        marginRight: "20px"
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Open Sans',
        fontWeight: 700,
        marginBottom: "10px"
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
        flexDirection: "row",
        flexWrap: "wrap-reverse"
    },
    listItem: {
        display: "flex",
        flexDirection: "row"
    },
    linkedNoticesContainer: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: "5px",
        marginBottom: "10px"
    },
    linkedNotice: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: "5px"
    },
    linkedNoticeImage: {
        height: "45px"
    },
    linkedNoticeDetails:{
        display: "flex",
        flexDirection: "column",
        padding: "2px",
        width: "55%"
    },
    linkedNoticeTitle: {
        fontSize: 8,
        fontFamily: 'Open Sans',
        fontWeight: 300,
        maxHeight: "40px",
        textOverflow: "hidden"
    },
    linkedNoticeContent:{
        fontSize: 6,
        fontFamily: 'Open Sans',
        fontWeight: 300
    },


    bucketContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5px"
    },
    noticeNumber:{
        fontSize: 12,
        fontFamily: 'Open Sans',
        textAlign: 'center',
        fontWeight: 300,
        marginTop: "20px",
        marginBottom: "5px"
    },
    noticeAbregeeContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "5px",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: "560px",
        height: "120px",
        marginBottom: "10px",
        textDecoration: "none",
        color: '#2a282b'
    },
    imageAbregee: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "flex-start",
        width: "110px",
        height: "110px"
    },
    noticeAbregeeDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "120px",
        width: "400px",
        marginLeft: "10px"
    },
    leftContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "300px",
        paddingTop: "5px"
    },
    rightContent: {
        display: "flex",
        flexDirection: "column",
        width: "100px",
        alignItems: "flex-end",
        justifyContent: "space-around"
    },
    abregeeContentTitle: {
        fontSize: 12,
        fontFamily: 'Open Sans',
        fontWeight: 600,
        maxHeight: "35px",
        textOverflow: "hidden"
    },
    abregeeContentSubtitle: {
        fontSize: 8,
        fontFamily: 'Open Sans',
        fontWeight: 300,
        minHeight: "12px",
        width: "275px",
        textOverflow: "hidden"
    },
    abregeeContentText: {
        fontSize: 10,
        fontFamily: 'Open Sans',
        fontWeight: 300,
        miniHeight: "15px",
        width: "250px",
        textOverflow: "hidden",
        maxLines: 1
    },
    abregeeContentTitleMnr: {
        fontSize: 10,
        fontFamily: 'Open Sans',
        fontWeight: 600,
        maxHeight: "30px",
        textOverflow: "hidden"
    },
    abregeeContentSubtitleMnr: {
        fontSize: 6,
        fontFamily: 'Open Sans',
        fontWeight: 300,
        minHeight: "10px",
        width: "275px",
        textOverflow: "hidden"
    },
    abregeeContentTextMnr: {
        fontSize: 8,
        fontFamily: 'Open Sans',
        fontWeight: 300,
        minHeight: "12px",
        width: "250px",
        textOverflow: "hidden",
        maxLines: 1
    },
    abregeeBase: {
        fontSize: 12,
        fontFamily: 'Open Sans',
        fontWeight: 300
    },
    abregeeREF: {
        fontSize: 12,
        fontFamily: 'Open Sans',
        fontWeight: 300
    },
    logo: {
        width: "40px"
    },
    pageNumber: {
        position: "absolute",
        fontSize: 10,
        bottom: 15,
        left: 0,
        right: 15,
        textAlign: 'right',
        color: 'grey'
    }
});