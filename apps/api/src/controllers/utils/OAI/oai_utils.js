const Memoire = require("../../../models/memoire")
const Merimee = require("../../../models/merimee")
const Palissy = require("../../../models/palissy")
const Joconde = require("../../../models/joconde")
const Museo = require("../../../models/museo")
const Mnr = require("../../../models/mnr")
const Autor = require("../../../models/autor")
const Enluminures = require("../../../models/enluminures")
const { baseUrl, baseNames } = require("./oai_response_Content")
let xml = require('xml');
let moment = require('moment-timezone')


/**
 * Fonction permet de retourner le nom réduit de la base
 * A partir du nom complet
 * @param {*} baseName 
 */
function getBaseCompletName(baseName){
    try{
        switch(baseName){
            case "Ressources biographiques (Autor)":
                return "Autor"
            case "Enluminures (Enluminures)":
                return "Enluminures"
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
                return "Autor"
/*                 res.status(500).send({
                    success: false,
                    msg: `Unknown base: ${ baseName }`
                }) */
                break
        }
    }catch (error) {
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at getBaseCompletName: "+error })
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
async function getNoticesFromMongo(base,listNotices,queryContent){
    try{
        if(Object.keys(queryContent).includes("from")){
            if(Object.keys(queryContent).includes("until")){
                listNotices.push(await base.find({ 
                    DMIS: { 
                        $gte: moment(queryContent.from).format('YYYY-MM-DD'), 
                        $lte: moment(queryContent.until).format('YYYY-MM-DD')} 
                }).limit(50))
            }else {
                listNotices.push(await base.find({ 
                    DMIS: { 
                        $gte: moment(new Date(queryContent.from)).format('YYYY-MM-DD')
                    } 
                }).limit(50)) 
            }
        }else {
                listNotices.push(await base.find({ 
                    DMIS: {  
                        $lte: moment(queryContent.until).format('YYYY-MM-DD')} 
                }).limit(50))
        }
    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at getNoticesFromMongo: "+error })
      }
}

/** 
 *  Cette fonction permet a partir de la liste des notices selon la base
 *  De Construit et retourne la partie du fichier xml pour le verb "listidentifiers"
 */
async function createListIdentifiersXml(queryContent){
    var ListNotices = []
    if(Object.keys(queryContent).includes("set")){
        switch (queryContent.set) {        
            
            case "joconde":
                try{
                    if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){
                        await getNoticesFromMongo(Joconde,ListNotices,queryContent)
                    }else {
                        ListNotices.push(await Joconde.find().limit(50))
                    }
                } catch (error) {
                    capture(error);
                    return res.status(500).send({ success: false, error })
                }
                break; 

            case "palissy":
                try{
                    if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){
                        await getNoticesFromMongo(Palissy,ListNotices,queryContent)
                    }else {
                        ListNotices.push(await Palissy.find().limit(50))
                    }                
                }catch (error) {
                    capture(error);
                    return res.status(500).send({ success: false, error })
                }
                break; 

            case "memoire":
                try{
                    if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){
                        await getNoticesFromMongo(Memoire,ListNotices,queryContent)
                    }else {
                        ListNotices.push(await Memoire.find().limit(50))
                    }                 
                } catch (error) {
                    capture(error);
                    return res.status(500).send({ success: false, error })
                }
                break; 
    
            case "merimee":
                try{
                    if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){
                        await getNoticesFromMongo(Merimee,ListNotices,queryContent)
                    }else {
                        ListNotices.push(await Merimee.find().limit(50))
                    } 
                }catch (error) {
                    capture(error);
                    return res.status(500).send({ success: false, error })
                }
                break;

            case "museo":
                try{
                    if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){
                        await getNoticesFromMongo(Museo,ListNotices,queryContent)
                    }else {
                        ListNotices.push(await Museo.find().limit(50))
                    }                 } catch (error) {
                    capture(error);
                    return res.status(500).send({ success: false, error })
                }
                break; 
        
            case "mnr":
                try{
                    if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){
                        await getNoticesFromMongo(Mnr,ListNotices,queryContent)
                    }else {
                        ListNotices.push(await Mnr.find().limit(50))
                    }                 
                }catch (error) {
                    capture(error);
                    return res.status(500).send({ success: false, error })
                }
                break; 

            case "enluminures":
                try{
                    if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){
                        await getNoticesFromMongo(Enluminures,ListNotices,queryContent)
                    }else {
                        ListNotices.push(await Enluminures.find().limit(50))
                    }                     
                } catch (error) {
                    capture(error);
                    return res.status(500).send({ success: false, error })
                }
                break; 

            case "autor":
                try{
                    if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){
                        await getNoticesFromMongo(Autor,ListNotices,queryContent)
                    }else {
                        ListNotices.push(await Autor.find().limit(50))
                    } 
                }catch (error) {
                    capture(error);
                    return res.status(500).send({ success: false, error })
                }
                break; 

            default:
                res.status(500).send({
                    success: false,
                    msg: `Unknown set: ${ queryContent.set }`
                })
                break; 
        }
    }else {
        try{
            if(Object.keys(queryContent).includes("from") || Object.keys(queryContent).includes("until")){               
                    await getNoticesFromMongo(Joconde,ListNotices,queryContent)
                    await getNoticesFromMongo(Palissy,ListNotices,queryContent)
                    await getNoticesFromMongo(Memoire,ListNotices,queryContent)
                    await getNoticesFromMongo(Merimee,ListNotices,queryContent)
                    await getNoticesFromMongo(Museo,ListNotices,queryContent)
                    await getNoticesFromMongo(Mnr,ListNotices,queryContent)
                    await getNoticesFromMongo(Enluminures,ListNotices,queryContent)
                    await getNoticesFromMongo(Autor,ListNotices,queryContent)
            }else {
                    ListNotices.push( await Joconde.find().limit(10))
                    ListNotices.push( await Palissy.find().limit(10))
                    ListNotices.push( await Memoire.find().limit(10))
                    ListNotices.push( await Merimee.find().limit(10))
                    ListNotices.push( await Museo.find().limit(10))
                    ListNotices.push( await Mnr.find().limit(10))
                    ListNotices.push( await Enluminures.find().limit(10))
                    ListNotices.push( await Autor.find().limit(10))
            }
        }catch (error) {
            capture(error);
            return res.status(500).send({ success: false, error })
        }
    }
    let identifier = { ListIdentifiers: [] }
    ListNotices.map( notices => { 
            notices.map(notice => {
            let base = getBaseCompletName(notice.BASE)
            let elem = {
                header:
                [
                    {identifier: `oai:${ base }:${ notice.REF }`},
                    {datestamp: moment(new Date(notice.DMIS)).format('YYYY-MM-DD')},
                    {setSpec: base}
                ]
            }
        identifier.ListIdentifiers.push(elem)
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
 * @param {*} queryContent 
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
 * @param {*} queryContent 
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



module.exports = {
    getBaseCompletName,
    getNoticesFromMongo,
    createListIdentifiersXml,
    createXmlFile,
    createXmlFileListIdentifiers
}