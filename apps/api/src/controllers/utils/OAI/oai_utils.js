const Memoire = require("../../../models/memoire")
const Merimee = require("../../../models/merimee")
const Palissy = require("../../../models/palissy")
const Joconde = require("../../../models/joconde")
const Museo = require("../../../models/museo")
const Mnr = require("../../../models/mnr")
const Autor = require("../../../models/autor")
const Enluminures = require("../../../models/enluminures")
const { baseUrl, baseNames, pop_url} = require("./oai_response_Content")
let xml = require('xml');
let moment = require('moment-timezone')

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
            case "mémoire":
                return Memoire
            case "mérimée":
                return Merimee
            case "mnr":
                return Mnr
            case "museo":
                return Museo
            case "palissy":
                return Palissy
            default:
                res.status(500).send({
                    success: false,
                    msg: `Unknown base: ${ baseName }`
                })
                break
        }
    }catch (error) {
        capture(error)
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
                return "Mémoire"
            case "Patrimoine architectural (Mérimée)":
                return "Mérimée"
            case "Récupération artistique (MNR Rose-Valland)":
                return "MNR Rose-Valland"
            case "Répertoire des Musées de France (Muséofile)":
                return "Muséofile"
            case "Patrimoine mobilier (Palissy)":
                return "Palissy"
            default:
                res.status(500).send({
                    success: false,
                    msg: `Unknown base: ${ baseName }`
                })
                break
        }
    }catch (error) {
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at getBaseCompletName: "+error })
      }
}

/**
 * Cette fonction permet de crée la squelette du xml
 * pour les verbs "GerRicords" et "ListRecords"
 * @param {*} elem : objet to xml
 * @param {*} notice : la notice pop
 * @param {*} base : la base concernée
 */
function createRecordObject(elem,notice,base){
    try{
        if('TITR' in notice){
            if(notice.TITR != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:title': notice.TITR})
            }
        }

        if('REF' in notice){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:source': notice.REF})
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:identifier': pop_url + "notice/" + base.toLowerCase() + "/" + notice.REF})

        if('AUTR' in notice){
            if(Array.isArray(notice.AUTR)){
                notice.AUTR.map( autr => {
                    if(autr != ""){
                        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:creator': autr})
                    }
                }
            )}else {
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:creator': notice.AUTR})
                }
        }

        if('PERI' in notice){
            notice.PERI.map( peri =>
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:date': peri})
        )}

        if('PERI' in notice){
            notice.PERI.map( peri =>
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': peri})
        )}
        
        if('SCLE' in notice){
            notice.SCLE.map( scle =>
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': scle})
        )}
        if('DATPV' in notice){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': notice.DATPV})
        }

        if('DIMS' in notice){
            if(typeof notice.DIMS === Array){
                notice.DIMS.map( dims =>
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:format': dims})
                )}else {
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:format': notice.DIMS})
                }
        }

        if('DOMN' in notice){
            notice.DOMN.map( domn =>
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:type': domn})
        )}

        if('CATEG' in notice){
            notice.CATEG.map( categ =>
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:type': categ})
        )}
        if('TYPID' in notice){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:type': notice.TYPID})
        }

        if('DESC' in notice){
            if(notice.DESC != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:description': notice.DESC})
            }
        }

        if('REPR' in notice){
            let subject = ""
            if(Array.isArray(notice.REPR) && notice.REPR.length){
                notice.REPR.map( repr => 
                        subject = repr + "," + subject 
                )
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:subject': subject})
            }
        }

        if('STAT' in notice){
            let publisher = ""
            if(Array.isArray(notice.STAT) && notice.STAT.length){
                notice.STAT.map( stat => 
                    publisher = stat + "," + publisher 
                )
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:publisher': publisher})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:relation': new Date().toISOString()})
        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:contributor': "TO DO"})
        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:language': "fr"})

        if('COPY' in notice){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:rights': notice.COPY})
        }
    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at createRecordObject: "+error })
    }
}

/**
 * Cette fonction permet de construire les query MongoDB 
 * Selon la base et selon les arguments "from" et "until" de la requéte
 * Et retourne une liste de notices.
 * @param {*} base : la base pour laquel on cherche les notices. 
 * @param {*} listNotices : a liste qui va contenir les notices.
 * @param {*} queryContent : les arguments de l'api.
 */
async function getNoticesFromMongo(base,queryContent){
    try{
        let listNotices = []
        if(Object.keys(queryContent).includes("from")){
            if(Object.keys(queryContent).includes("until")){
                listNotices.push(await base.find({ 
                    DMIS: { 
                        $gte: moment(queryContent.from).format('YYYY-MM-DD'), 
                        $lte: moment(queryContent.until).format('YYYY-MM-DD')
                    } 
                }).sort({DMAJ: -1}).limit(50))
            }else {
                listNotices.push(await base.find({ 
                    DMIS: { 
                        $gte: moment(new Date(queryContent.from)).format('YYYY-MM-DD')
                    } 
                }).sort({DMAJ: -1}).limit(50)) 
            }
        }else {
            if(Object.keys(queryContent).includes("until")){
                listNotices.push(await base.find({ 
                    DMIS: {  
                        $lte: moment(queryContent.until).format('YYYY-MM-DD')} 
                }).sort({DMAJ: -1}).limit(50))
            }else{
                listNotices.push(await base.find().sort({DMAJ: -1}).limit(50))
            }
        }
        return listNotices
    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at getNoticesFromMongo: "+error })
      }
}

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
            res.status(500).send({
                success: false,
                msg: `Unknown set: ${ queryContent.set }`})
        }
    }catch(error){
        capture(error)
        res.status(500).send({ success: false, error })

    }
}
/**
 * Cette fonction permet de construire la requéte mongo pour les différents "verb"
 * ainsi que retourner la liste des notices selon la requéte crée
 * @param {*} base : la base
 * @param {*} queryContent : les arguments de l'api. 
 */
async function createMongoQuery(queryContent){
    let ListNotices = []
    if(Object.keys(queryContent).includes("set")){
        try{
            let base = getBaseName(queryContent.set)
            if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){
                ListNotices = await getNoticesFromMongo(base,queryContent)
            }else {
                    ListNotices.push(await base.find().sort({DMAJ: -1}).limit(50))
            }
        } catch (error) {
            capture(error);
            return res.status(500).send({ success: false, error })}       
    }else {
        try{
            if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){               
                ListNotices = await getNoticesFromMongo(Joconde,queryContent)
                (await getNoticesFromMongo(Palissy,queryContent)).map( notice => {
                    ListNotices.push(notice)
                })
                (await getNoticesFromMongo(Memoire,queryContent)).map( notice => {
                    ListNotices.push(notice)
                })
                (await getNoticesFromMongo(Merimee,queryContent)).map( notice => {
                    ListNotices.push(notice)
                })
                (await getNoticesFromMongo(Museo,queryContent)).map( notice => {
                    ListNotices.push(notice)
                })
                (await getNoticesFromMongo(Mnr,queryContent)).map( notice => {
                    ListNotices.push(notice)
                })
                (await getNoticesFromMongo(Autor,queryContent)).map( notice => {
                    ListNotices.push(notice)
                })
            }else {
                    ListNotices.push( await Joconde.find().sort({DMAJ: -1}).limit(10))
                    ListNotices.push( await Palissy.find().sort({DMAJ: -1}).limit(10))
                    ListNotices.push( await Memoire.find().sort({DMAJ: -1}).limit(10))
                    ListNotices.push( await Merimee.find().sort({DMAJ: -1}).limit(10))
                    ListNotices.push( await Museo.find().sort({DMAJ: -1}).limit(10))
                    ListNotices.push( await Mnr.find().sort({DMAJ: -1}).limit(10))
                    ListNotices.push( await Autor.find().sort({DMAJ: -1}).limit(10))
            }
        }catch (error) {
            capture(error);
            return res.status(500).send({ success: false, error })
        }
    }
    return ListNotices
}


/**
 *  Cette fonction permet a partir de la liste des notices selon la base
 *  De Construit et retourne la partie du fichier xml pour le verb "listidentifiers"
 * @param {*} queryContent : les arguments de l'api. 
 */
async function createListIdentifiersXml(queryContent){
    var ListNotices = await createMongoQuery(queryContent)
    let identifier = { ListIdentifiers: [] }
    ListNotices.map( notices => { 
            notices.map(notice => {
            let base = getBaseCompletName(notice.BASE)
            let elem = {
                header:
                [
                    {identifier: `oai:pop.culture.gouv.fr:${ notice.REF }`},
                ]
            }
            if(notice.DMAJ != ""){
                elem.header.push({datestamp: moment(new Date(notice.DMAJ)).format('YYYY-MM-DD')}
                )
            }else{
                elem.header.push({datestamp: moment(new Date(notice.DMIS)).format('YYYY-MM-DD-')})
            }
            
            elem.header.push({setSpec: base})
            identifier.ListIdentifiers.push(elem)
        })
    })
    return identifier
}

async function createGetRecordXml(queryContent){
    try{
        let date
        let notice = await createMongoGetRecordQuery(queryContent)
        let identifier = { ListRecords: [] }
        let base = getBaseCompletName(notice[0].BASE)
        if(notice[0].DMAJ != ""){
            date = notice[0].DMAJ
        }else{
            date = notice[0].DMIS
        }
        let elem = {
            record:
            [
                {
                    header:
                    [
                        {identifier: `oai:pop.culture.gouv.fr:${ notice[0].REF }`},
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
        //createRecordObject(elem,notice[0],base)
        identifier.ListRecords.push(elem)
        return identifier
    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at createGetRecordXml: "+error })
    }
}


/**
 *  Cette fonction permet a partir de la liste des notices selon la base
 *  De Construit et retourne la partie du fichier xml pour le verb "ListRecords"
 * @param {*} queryContent : les arguments de l'api. : arguments de la requéte
 */
async function createListRecordsXml(queryContent){
    let date
    let ListNotices = []
    ListNotices = await createMongoQuery(queryContent)
    let identifier = { ListRecords: [] }
    ListNotices.map( notices => {
            notices.map(notice => {
            let base = getBaseCompletName(notice.BASE)
            if(notice.DMAJ != ""){
                date = notice.DMAJ
            }else{
                date = notice.DMIS
            }
            let elem = {
                record:
                [
                    {
                        header:
                        [
                            {identifier: `oai:pop.culture.gouv.fr:${ notice.REF }`},
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
                                    },
                                ]
                            }
                        ]
                    }
                ]
            }
        //createRecordObject(elem,notice,base)
        identifier.ListRecords.push(elem)
        })
    })
    return identifier
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
 * Function permet de construire le xml pour le verb : 
 *  -   listidentifiers
 * @param {*} queryContent : les arguments de l'api. 
 */
async function createXmlFileListIdentifiers(queryContent){
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
}

/**
 * Function permet de construire le xml pour le verb : 
 *  -   listidentifiers
 * @param {*} queryContent : les arguments de l'api. 
 */
async function createXmlFileListRecords(queryContent){
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
}

async function createXmlFileGetRecord(queryContent){
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
}


module.exports = {
    getBaseCompletName,
    getNoticesFromMongo,
    createListIdentifiersXml,
    createXmlFile,
    createXmlFileListIdentifiers,
    createXmlFileListRecords,
    createXmlFileGetRecord
}