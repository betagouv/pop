const Memoire = require("../../../models/memoire")
const Merimee = require("../../../models/merimee")
const Palissy = require("../../../models/palissy")
const Joconde = require("../../../models/joconde")
const Museo = require("../../../models/museo")
const Mnr = require("../../../models/mnr")
const Autor = require("../../../models/autor")
const noticesOAI = require("../../../models/noticesOAI")
const resumptionTokenOAI = require("../../../models/resumptionToken");

const { baseUrl, baseNames, pop_url} = require("./oai_response_Content")
const { getResumptionToken, createResumptionToken, updateResumptionToken, deleteResumptionToken } = require("../../resumptionToken")
const { EXCEPTION_CODES, generateException } = require("../OAI/oai_Exceptions")
const {createRecordAutor, createRecordJoconde, createRecordMemoire, createRecordMerimee, createRecordMnr,createRecordMuseo, createRecordPalissy} = require("./oai_records")
let xml = require('xml');
let moment = require('moment-timezone')

/**
 * setInterval permet de supprimer les tokens expiré
 * Bloqué si on fait les tests
 */
if (process.env.NODE_ENV !== "test") {
    setInterval(async function (){
        let listTokens = await resumptionTokenOAI.find()
        listTokens.map(async token => {
            if( moment(token.DEXP).format("YYYY-MM-DDTHH:mm:ss") < moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")){
                await deleteResumptionToken(token.TOKEN)
            }
        })
    },300000)
}

/**
 * Fonction permet de retourner le nom réduit de la base
 * A partir du nom complet
 * @param {*} baseName : le nom complet de la base
 */
function getBaseName(baseName){
    try{
        switch(baseName){
            case "autor":
                return Autor
            case "joconde":
                return Joconde
            case "memoire":
                return Memoire
            case "merimee":
                return Merimee
            case "mnr":
                return Mnr
            case "museo":
                return Museo
            case "palissy":
                return Palissy
            default:
                return res.status(500).send({
                    success: false,
                    msg: `Unknown base: ${ baseName }`
                })
        }
    }catch (error) {
        return res.status(500).send({ success: false, msg: "Error at getBaseCompletName: "+error })
      }
}

/**
 * Fonction permet de retourner le nom réduit de la base
 * A partir du nom complet
 * @param {*} baseName : le nom complet de la base
 */
function getBaseCompletName(baseName){
    try{
        switch(baseName){
            case "Ressources biographiques (Autor)":
                return "Autor"
            case "Collections des musées de France (Joconde)":
                return "Joconde"
            case "Photographies (Mémoire)":
                return "Memoire"
            case "Patrimoine architectural (Mérimée)":
                return "Merimee"
            case "Rose Valland (MNR-Jeu de Paume)":
                return "Mnr"
            case "Répertoire des Musées de France (Muséofile)":
                return "Museo"
            case "Patrimoine mobilier (Palissy)":
                return "Palissy"
            default:
                return res.status(500).send({
                    success: false,
                    msg: `Unknown base: ${ baseName }`
                })
        }
    }catch (error) {
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at getBaseCompletName: "+error })
      }
}

/**
 * Cette focntion permet de créer le XML record 
 * pour les notices de chaque base.
 * @param {*} elem 
 * @param {*} notice 
 */
function createRecord(elem,notice){
    let base = getBaseCompletName(notice.BASE).toLowerCase()
    switch(base){
        case "autor":
            createRecordAutor(elem,notice)
            break
        case "joconde":
            createRecordJoconde(elem,notice)
            break
        case "memoire":
            createRecordMemoire(elem,notice)
            break
        case "merimee":
            createRecordMerimee(elem,notice)
            break
        case "mnr":
            createRecordMnr(elem,notice)
            break
        case "museo":
            createRecordMuseo(elem,notice)
            break
        case "palissy":
            createRecordPalissy(elem,notice)
            break
        default:
            return res.status(500).send({
                success: false,
                msg: `Unknown base: ${ base }`
            })
    }
}

/**************************************************************************************************************************************/

/**
 * Cette fonction permet de construire la requéte mongo pour le verb "GetRecord"
 * et returne une notice selon la requéte crée
 * @param {*} queryContent : les arguments de l'api.
 */
async function createMongoGetRecordQuery(queryContent){
    try{
        let identifier = queryContent.identifier.split(":")
        let base = getBaseName(identifier[1])
        try{
            return await base.find({ REF: identifier[2]})
        } catch (error) {
            return res.status(500).send({
                success: false,
                msg: `Unknown set: ${ queryContent.set }`})
        }
    }catch(error){
        return res.status(500).send({ success: false, error })

    }
}

/**
 * Cette fonction permet de construire la requéte mongo pour les différents "verb"
 * ainsi que retourner la liste des notices selon la requéte crée
 * @param {*} base : la base
 * @param {*} queryContent : les arguments de l'api. 
 */
async function createMongoQueryNoticeOai(queryContent){
        try{
            var listNotices = []
            if(Object.keys(queryContent).includes("set")){
                if(Object.keys(queryContent).includes("from")){
                    if(Object.keys(queryContent).includes("until")){
                        listNotices.push(await noticesOAI.find({ 
                            DMAJ: { 
                                $gte: moment(queryContent.from).format('YYYY-MM-DD'), 
                                $lte: moment(queryContent.until).format('YYYY-MM-DD')
                            },
                            BASE: queryContent.set
                        }).sort({DMAJ: -1}).limit(50))  
                    }else {
                        listNotices.push(await noticesOAI.find({ 
                            DMAJ: { 
                                $gte: moment(new Date(queryContent.from)).format('YYYY-MM-DD')
                            },
                            BASE: queryContent.set
                        }).sort({DMAJ: -1}).limit(50)) 
                    }
                }else {
                    if(Object.keys(queryContent).includes("until")){
                        listNotices.push(await noticesOAI.find({ 
                            DMAJ: {  
                                $lte: moment(queryContent.until).format('YYYY-MM-DD')
                            },
                            BASE: queryContent.set
                        }).sort({DMAJ: -1}).limit(50))
                    }else{
                        listNotices.push(await noticesOAI.find({BASE: queryContent.set}).sort({DMAJ: -1}).limit(50))
                    }
                }
            }else{
                if(Object.keys(queryContent).includes("from")){
                    if(Object.keys(queryContent).includes("until")){
                        listNotices.push(await noticesOAI.find({ 
                            DMAJ: { 
                                $gte: moment(queryContent.from).format('YYYY-MM-DD'), 
                                $lte: moment(queryContent.until).format('YYYY-MM-DD')
                            },
                        }).sort({DMAJ: -1}).limit(50))  
                    }else {
                        listNotices.push(await noticesOAI.find({ 
                            DMAJ: { 
                                $gte: moment(new Date(queryContent.from)).format('YYYY-MM-DD')
                            },
                        }).sort({DMAJ: -1}).limit(50)) 
                    }
                }else {
                    if(Object.keys(queryContent).includes("until")){
                        listNotices.push(await noticesOAI.find({ 
                            DMAJ: {  
                                $lte: moment(queryContent.until).format('YYYY-MM-DD')
                            },
                        }).sort({DMAJ: -1}).limit(50))
                    }else{
                        listNotices.push(await noticesOAI.find().sort({DMAJ: -1}).limit(50))
                    }
                }
            }
            return listNotices
        }catch (error) {
            return res.status(500).send({ success: false, error })
        }
}

/**
 * Cette fonction permet de construire la requéte mongo pour les différents "verb"
 * ainsi que retourner la liste des notices selon la requéte crée
 * @param {*} base : la base
 * @param {*} queryContent : les arguments de l'api. 
 */
async function createMongoQueryNoticeOaiWithToken(token){
    try{
        var listNotices = []
        if("SET" in token  && token.SET != ""){
            if("FROM" in token && token.FROM != ""){
                if("UNTIL" in token && token.UNTIL != ""){
                    listNotices.push(await noticesOAI.find({ 
                        DMAJ: { 
                            $gte: moment(token.FROM).format('YYYY-MM-DD'), 
                            $lte: moment(token.UNTIL).format('YYYY-MM-DD')
                        },
                        BASE: token.SET
                    }).sort({DMAJ: -1}).skip(token.CURSOR*50).limit(50))  
                }else {
                    listNotices.push(await noticesOAI.find({ 
                        DMAJ: { 
                            $gte: moment(new Date(token.FROM)).format('YYYY-MM-DD')
                        },
                        BASE: token.SET
                    }).sort({DMAJ: -1}).skip(token.CURSOR*50).limit(50)) 
                }
            }else {
                if("UNTIL" in token && token.UNTIL != ""){
                    listNotices.push(await noticesOAI.find({ 
                        DMAJ: {  
                            $lte: moment(token.UNTIL).format('YYYY-MM-DD')
                        },
                        BASE: token.SET
                    }).sort({DMAJ: -1}).skip(token.CURSOR*50).limit(50))
                }else{
                    listNotices.push(await noticesOAI.find({BASE: token.SET}).sort({DMAJ: -1}).skip(token.CURSOR*50).limit(50))
                }
            }
        }else{
            if("FROM" in token && token.FROM != ""){
                if("UNTIL" in token && token.UNTIL != ""){
                    listNotices.push(await noticesOAI.find({ 
                        DMAJ: { 
                            $gte: moment(token.FROM).format('YYYY-MM-DD'), 
                            $lte: moment(token.UNTIL).format('YYYY-MM-DD')
                        },
                    }).sort({DMAJ: -1}).skip(token.CURSOR*50).limit(50)) 
                }else {
                    listNotices.push(await noticesOAI.find({ 
                        DMAJ: { 
                            $gte: moment(new Date(token.FROM)).format('YYYY-MM-DD')
                        },
                    }).sort({DMAJ: -1}).skip(token.CURSOR*50).limit(50)) 
                }
            }else {
                if("UNTIL" in token && token.UNTIL != ""){
                    listNotices.push(await noticesOAI.find({ 
                        DMAJ: {  
                            $lte: moment(token.UNTIL).format('YYYY-MM-DD')
                        },
                    }).sort({DMAJ: -1}).skip(token.CURSOR*50).limit(50)) 
                }else{
                    listNotices.push(await noticesOAI.find().sort({DMAJ: -1}).skip(token.CURSOR*50).limit(50))
                }
            }
        }
        return listNotices
    }catch (error) {
        return res.status(500).send({ success: false, error })
    }
}

/**
 * Cette fonction permet de construire la requéte mongo pour les différents "verb"
 * ainsi que retourner la liste des notices selon la requéte crée
 * @param {*} base : la base
 * @param {*} queryContent : les arguments de l'api. 
 */
async function getCompletListSize(queryContent){
    try{
        var listSize
        if(Object.keys(queryContent).includes("set")){
            if(Object.keys(queryContent).includes("from")){
                if(Object.keys(queryContent).includes("until")){
                    listSize = await noticesOAI.find({ 
                        DMAJ: { 
                            $gte: moment(queryContent.from).format('YYYY-MM-DD'), 
                            $lte: moment(queryContent.until).format('YYYY-MM-DD')
                        },
                        BASE: queryContent.set
                    }).countDocuments()
                }else {
                    listSize = await noticesOAI.find({ 
                        DMAJ: { 
                            $gte: moment(new Date(queryContent.from)).format('YYYY-MM-DD')
                        },
                        BASE: queryContent.set
                    }).countDocuments()
                }
            }else {
                if(Object.keys(queryContent).includes("until")){
                    listSize = await noticesOAI.find({ 
                        DMAJ: {  
                            $lte: moment(queryContent.until).format('YYYY-MM-DD')
                        },
                        BASE: queryContent.set
                    }).sort({DMAJ: -1})
                }else{
                    listSize = await noticesOAI.find({BASE: queryContent.set}).countDocuments()
                }
            }
        }else{
            if(Object.keys(queryContent).includes("from")){
                if(Object.keys(queryContent).includes("until")){
                    listSize =  await noticesOAI.find({ 
                        DMAJ: { 
                            $gte: moment(queryContent.from).format('YYYY-MM-DD'), 
                            $lte: moment(queryContent.until).format('YYYY-MM-DD')
                        },
                    }).countDocuments() 
                }else {
                    listSize = await noticesOAI.find({ 
                        DMAJ: { 
                            $gte: moment(new Date(queryContent.from)).format('YYYY-MM-DD')
                        },
                    }).countDocuments()
                }
            }else {
                if(Object.keys(queryContent).includes("until")){
                    listSize = await noticesOAI.find({ 
                        DMAJ: {  
                            $lte: moment(queryContent.until).format('YYYY-MM-DD')
                        },
                    }).countDocuments()
                }else{
                    listSize = await noticesOAI.find().countDocuments()
                }
            }
        }
        return listSize
    }catch (error) {
        return res.status(500).send({ success: false, error })
    }
}

/**
 *  Cette fonction permet a partir de la liste des notices selon la base
 *  De Construit et retourne la partie du fichier xml pour le verb "listidentifiers"
 * @param {*} queryContent : les arguments de l'api. 
 */
async function createListIdentifiersXml(queryContent){

    var ListNotices = []
    let resumpToken = null
    var ListSize = await getCompletListSize(queryContent)

    if(Object.keys(queryContent).includes("resumptionToken")){
        let token = await getResumptionToken(queryContent.resumptionToken)
        token = token[0]
        ListSize = token.SIZE
        if(token.SIZE > ((token.CURSOR * 50) + 50)){
            let query = {
                from: token.FROM,
                until: token.UNTIL,
                set: token.SET,
                metadataprefix : token.META,
            }
            resumpToken = await createResumptionToken(token.CURSOR,ListSize,query)
        }
        ListNotices = await createMongoQueryNoticeOaiWithToken(token)
    }else{
        ListSize = await getCompletListSize(queryContent)
        if(ListSize > 50){
            resumpToken = await createResumptionToken(0,ListSize,queryContent)
        }
        ListNotices = await createMongoQueryNoticeOai(queryContent)
    }

    let identifier = { ListIdentifiers: [] }
    ListNotices.map( notices => { 
            notices.map(notice => {
            let elem = {
                header:
                [
                    {identifier: `oai:${ notice.BASE.toLowerCase()}:${ notice.REF }`},
                ]
            }
            elem.header.push({datestamp: moment(new Date(notice.DMAJ)).format('YYYY-MM-DD')})       
            elem.header.push({setSpec: notice.BASE})
            identifier.ListIdentifiers.push(elem)
        })
    })
    if(resumpToken != null){
        token = {
            resumptionToken:[
                {
                    _attr:
                        {
                            expirationDate: resumpToken.DEXP,
                            completeListSize: resumpToken.SIZE,
                            cursor: resumpToken.CURSOR
                        }
                },
                resumpToken.TOKEN
            ]
        }
        identifier.ListIdentifiers.push(token)
    }
    return identifier
}
/* reste*/
async function createGetRecordXml(queryContent){
    try{
        let date
        var notice = await createMongoGetRecordQuery(queryContent)
        let identifier = { ListRecords: [] }
        let base = getBaseCompletName(notice[0].BASE)
        if(notice[0].DMAJ != ""){
            date = notice[0].DMAJ
        }else{
            date = notice[0].DMIS
        }
        var elem = {
            record:
            [
                {
                    header:
                    [
                        {identifier: `oai:${base.toLowerCase()}:${ notice[0].REF }`},
                        {datestamp: moment(new Date(date)).format('YYYY-MM-DD')},
                        {setSpec: base}
                    ]
                },
                {
                    metadata:
                    [
                        {'oai_dc:dc': 
                        [
                            {
                                _attr:
                                        {
                                            'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
                                            'xmlns:oai_dc':"http://www.openarchives.org/OAI/2.0/oai_dc/",                               
                                            'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                                            'xmlns:mml':"http://www.w3.org/1998/Math/MathML",
                                            'xsi:schemaLocation': "http://www.openarchives.org/OAI/2.0/" + "\nhttp://www.openarchives.org/OAI/2.0OAI-PMH.xsd"
                                        }
                            }
                        ]
                        }
                    ]
                }
            ]
        }
        createRecord(elem,notice[0])
        identifier.ListRecords.push(elem)
        return identifier
    }catch(err){
        return res.status(500).send({ success: false, msg: "Error at createGetRecordXml: "+error })
    }
}


/**
 *  Cette fonction permet a partir de la liste des notices selon la base
 *  De Construit et retourne la partie du fichier xml pour le verb "ListRecords"
 * @param {*} queryContent : les arguments de l'api. : arguments de la requéte
 */
async function createListRecordsXml(queryContent){
    try{
        let ListNotices = []
        var ListOai = []
        var ListSize
        let resumpToken = null

        if(Object.keys(queryContent).includes("resumptionToken")){
            let token = await getResumptionToken(queryContent.resumptionToken)
            token = token[0]
            ListSize = token.SIZE
            if(token.SIZE > ((token.CURSOR * 50) + 50)){
                let query = {
                    from: token.FROM,
                    until: token.UNTIL,
                    set: token.SET,
                    metadataprefix : token.META,
                }
                resumpToken = await createResumptionToken(token.CURSOR,ListSize,query)
            }
            ListOai = await createMongoQueryNoticeOaiWithToken(token)
            ListOai.map(  noticesOAI => {
                noticesOAI.map(  noticeOAI => {
                    ListNotices.push( noticeOAI )
                })
            }) 
        }else{
            ListSize = await getCompletListSize(queryContent)
            if(ListSize > 50){
                resumpToken = await createResumptionToken(0,ListSize,queryContent)
            }
            ListOai = await createMongoQueryNoticeOai(queryContent)
            ListOai.map(  noticesOAI => {
                noticesOAI.map(  noticeOAI => {
                    ListNotices.push( noticeOAI )
                })
            })
        }
        let identifier = { ListRecords: [] }
        let Promises = []
        Promises.push(await Promise.all(ListNotices.map( async oai => {
                const set = getBaseName(oai.BASE)
                var notice = await set.find({ REF: oai.REF })
                let base = getBaseCompletName(notice[0].BASE)
                let elem = {
                    record:
                    [
                        {
                            header:
                            [
                                {identifier: `oai:${base.toLowerCase()}:${ notice[0].REF }`},
                                {datestamp: moment(new Date(oai.DMAJ)).format('YYYY-MM-DD')},
                                {setSpec: base}
                            ]
                        },
                        {
                            metadata:
                            [
                                {'oai_dc:dc': 
                                [
                                    {
                                        _attr:
                                                {
                                                    'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
                                                    'xmlns:oai_dc':"http://www.openarchives.org/OAI/2.0/oai_dc/",                               
                                                    'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                                                    'xmlns:mml':"http://www.w3.org/1998/Math/MathML",
                                                    'xsi:schemaLocation': "http://www.openarchives.org/OAI/2.0/" + "\nhttp://www.openarchives.org/OAI/2.0OAI-PMH.xsd"
                                                }
                                    }
                                ]
                                }
                            ]
                        }
                    ]
                }
                createRecord(elem,notice[0])
                return JSON.stringify(elem)
            })))
            Promises.map(  tabpromises => {
                tabpromises.map(  record => {
                    identifier.ListRecords.push( JSON.parse(record) )
                })
            })
            if(resumpToken != null){
                token = {
                    resumptionToken:[
                        {
                            _attr:
                                {
                                    expirationDate: resumpToken.DEXP,
                                    completeListSize: resumpToken.SIZE,
                                    cursor: resumpToken.CURSOR
                                }
                        },
                        resumpToken.TOKEN
                    ]
                }
                identifier.ListRecords.push(token)
            }
            return identifier
    }catch(err){
        return res.status(500).send({ success: false, msg: "Error at createListRecordXml: "+err }) 
    }
}

/************************************ Fonctions de constructions du xml ******************************************/

/**
 * Function permet de construire le xml pour les verb : 
 *  -   identify
 *  -   listsets
 *  -   listmetadataformats
 * @param {*} queryContent : les arguments de l'api. 
 * @param {*} responseContent 
 */
 function createXmlFile(queryContent,responseContent){
    resp = {
        'OAI-PMH': [
            {
                _attr:
                    {
                        xmlns: "http://www.openarchives.org/OAI/2.0/",
                        'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
                        'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                        'xsi:schemaLocation': "http://www.openarchives.org/OAI/2.0/" + "\nhttp://www.openarchives.org/OAI/2.0OAI-PMH.xsd"
                    }
            },
            {responseDate: new Date().toISOString()}
        ]
    }
    resp['OAI-PMH'].push({request: [{_attr: queryContent }, baseUrl]});
    resp['OAI-PMH'].push(responseContent);
    return xml(resp, {declaration: true});
}

/**
 * Function permet de construire le xml pour les verb : 
 *  -   identify
 *  -   listsets
 *  -   listmetadataformats
 * @param {*} queryContent : les arguments de l'api. 
 * @param {*} responseContent 
 */
async function createXmlFileIdentify(queryContent,responseContent){
    resp = {
        'OAI-PMH': [
            {
                _attr:
                    {
                        xmlns: "http://www.openarchives.org/OAI/2.0/",
                        'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
                        'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                        'xsi:schemaLocation': "http://www.openarchives.org/OAI/2.0/" + "\nhttp://www.openarchives.org/OAI/2.0OAI-PMH.xsd"
                    }
            },
            {responseDate: new Date().toISOString()}
        ]
    }
    resp['OAI-PMH'].push({request: [{_attr: queryContent }, baseUrl]});
    let earliest = await noticesOAI.find().sort({DMAJ: -1}).limit(1)
    responseContent.Identify[4].earliestDatestamp = earliest[0].DMAJ
    resp['OAI-PMH'].push(responseContent);
    return xml(resp, {declaration: true});
}

/**
 * Function permet de construire le xml pour le verb : 
 *  -   listidentifiers
 * @param {*} queryContent : les arguments de l'api. 
 */
async function createXmlFileListIdentifiers(queryContent){
    try {
        resp = {
            'OAI-PMH': [
                {
                    _attr:
                        {
                            xmlns: "http://www.openarchives.org/OAI/2.0/",
                            'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
                            'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                            'xsi:schemaLocation': "http://www.openarchives.org/OAI/2.0/" + "\nhttp://www.openarchives.org/OAI/2.0OAI-PMH.xsd"
                        }
                },
                {responseDate: new Date().toISOString()}
            ]
        }
        resp['OAI-PMH'].push({request: [{_attr: queryContent }, baseUrl]})
        resp['OAI-PMH'].push(await createListIdentifiersXml(queryContent))
        return xml(resp, {declaration: true})
    }catch(err){
        return res.status(500).send({ success: false, msg: "Error at createListRecordsXml: "+err })
    }
}

/**
 * Function permet de construire le xml pour le verb : 
 *  -   listidentifiers
 * @param {*} queryContent : les arguments de l'api. 
 */
async function createXmlFileListRecords(queryContent){
    try{
        resp = {
            'OAI-PMH': [
                {
                    _attr:
                        {
                            xmlns: "http://www.openarchives.org/OAI/2.0/",
                            'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
                            'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                            'xsi:schemaLocation': "http://www.openarchives.org/OAI/2.0/" + "\nhttp://www.openarchives.org/OAI/2.0OAI-PMH.xsd"
                        }
                },
                {responseDate: new Date().toISOString()}
            ]
        }
        resp['OAI-PMH'].push({request: [{_attr: queryContent }, baseUrl]})
        resp['OAI-PMH'].push(await createListRecordsXml(queryContent))
        return xml(resp, {declaration: true})
    }catch(err){
        return res.status(500).send({ success: false, msg: "Error at createListRecordsXml: "+err })
    }
}

async function createXmlFileGetRecord(queryContent){
    try{
    resp = {
        'OAI-PMH': [
            {
                _attr:
                    {
                        xmlns: "http://www.openarchives.org/OAI/2.0/",
                        'xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
                        'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                        'xsi:schemaLocation': "http://www.openarchives.org/OAI/2.0/" + "\nhttp://www.openarchives.org/OAI/2.0OAI-PMH.xsd"
                    }
            },
            {responseDate: new Date().toISOString()}
        ]
    }
    resp['OAI-PMH'].push({request: [{_attr: queryContent }, baseUrl]})
    resp['OAI-PMH'].push(await createGetRecordXml(queryContent))
    return xml(resp, {declaration: true})
    }catch(err){
        throw err
    }
}

module.exports = {
    getBaseCompletName,
    createListIdentifiersXml,
    createXmlFile,
    createXmlFileIdentify,
    createXmlFileListIdentifiers,
    createXmlFileListRecords,
    createXmlFileGetRecord,
    createMongoGetRecordQuery
}