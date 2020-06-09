const express = require("express")
const router = express.Router()
let moment = require('moment-timezone')



/***************************************** Templates ****************************************/
const {
    baseNames,
    responseContentIdentify,
    responseContentListSets,
    METADATA_FORMATS,
    responseContentListmetadataformats
  } = require("./utils/OAI/oai_response_Content")


/**************************************** Fonctions *******************************************/

const {
    createXmlFile,
    createXmlFileIdentify,
    createXmlFileListIdentifiers,
    createXmlFileListRecords,
    createXmlFileGetRecord,
    createMongoGetRecordQuery
  } = require("./utils/OAI/oai_utils")


/***************************************** Exceptions ****************************************/
const {
    EXCEPTION_CODES,
    generateException
} = require("./utils/OAI/oai_Exceptions")

/**
 * OAI entrepot GET route
 * les différentes API pour l'entrepot OAI 
 * fonction GET qui encapsule les différents appels
 */
router.get("/", async (req, res) => {
    try{
    res.set('Content-Type', 'text/xml')
    switch (req.query.verb) {
        
        case "Identify":
            try{
                if(Object.keys(req.query).length > 1) {
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.BAD_ARGUMENT)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                res.locals.identify = await createXmlFileIdentify(req.query,responseContentIdentify)
                res.status(200).send(res.locals.identify).end()
            }catch(oaiError) {
                res.status(500)
                res.send(oaiError)
            }
            break;  
        

        case "ListSets": 
            try{
                if(Object.keys(req.query).length > 1) {
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.BAD_ARGUMENT)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                res.locals.ListSets = createXmlFile(req.query,responseContentListSets)
                res.status(200).send(res.locals.ListSets).end()
            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break;

        case "ListMetadataFormats": 
            try{
                if(Object.keys(req.query).length > 1) {
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.BAD_ARGUMENT)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                res.locals.listmetadataformats = createXmlFile(req.query,responseContentListmetadataformats)
                res.status(200).send(res.locals.listmetadataformats).end()
            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break
        
        case "ListIdentifiers": 
            try{
                if(Object.keys(req.query).length < 2 && Object.keys(req.query).length > 8) {
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.BAD_ARGUMENT)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                if((Object.keys(req.query).includes("metadataprefix") && !METADATA_FORMATS.hasOwnProperty(req.query.metadataprefix))){
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.NO_METADATA_FORMATS)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                if(Object.keys(req.query).includes("resumptionToken") && (Object.keys(req.query).includes("metadataprefix") || Object.keys(req.query).includes("set") || Object.keys(req.query).includes("from") || Object.keys(req.query).includes("until"))){
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.Bad_ARGUMENTS_WITH_TOKEN)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                if(!Object.keys(req.query).includes("metadataprefix") && !Object.keys(req.query).includes("resumptionToken")){
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.NO_METADATA_FORMATS)
                    return res.status(200).send(res.locals.Erreur).end()              
                }
                if(Object.keys(req.query).includes("from") && Object.keys(req.query).includes("until")){
                    if(moment(req.query.from).format('YYYY-MM-DD') > moment(req.query.until).format('YYYY-MM-DD')){
                        res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.NO_RECORDS_MATCH)
                        return res.status(200).send(res.locals.Erreur).end()                      
                    }
                }
                res.locals.listidentifiers = await createXmlFileListIdentifiers(req.query)
                res.status(200).send(res.locals.listidentifiers).end()
            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break

            case "ListRecords": 
            try{
                if(Object.keys(req.query).length < 2 && Object.keys(req.query).length > 8) {
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.BAD_ARGUMENT)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                if((Object.keys(req.query).includes("metadataprefix") && !METADATA_FORMATS.hasOwnProperty(req.query.metadataprefix))){
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.NO_METADATA_FORMATS)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                if(Object.keys(req.query).includes("resumptionToken") && (Object.keys(req.query).includes("metadataprefix") || Object.keys(req.query).includes("set") || Object.keys(req.query).includes("from") || Object.keys(req.query).includes("until"))){
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.Bad_ARGUMENTS_WITH_TOKEN)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                if(!Object.keys(req.query).includes("metadataprefix") && !Object.keys(req.query).includes("resumptionToken")){
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.NO_METADATA_FORMATS)
                    return res.status(200).send(res.locals.Erreur).end()              
                }
                if(Object.keys(req.query).includes("from") && Object.keys(req.query).includes("until")){
                    if(moment(req.query.from).format('YYYY-MM-DD') > moment(req.query.until).format('YYYY-MM-DD')){
                        res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.NO_RECORDS_MATCH)
                        return res.status(200).send(res.locals.Erreur).end()                      
                    }
                }
                res.locals.listrecords = await createXmlFileListRecords(req.query)

                res.status(200).send(res.locals.listrecords).end()
            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break

            case "GetRecord": 
            try{
                if(Object.keys(req.query).length != 3 || !Object.keys(req.query).includes("metadataprefix") || !Object.keys(req.query).includes("identifier")) {
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.BAD_ARGUMENT)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                if((Object.keys(req.query).includes("metadataprefix") && !METADATA_FORMATS.hasOwnProperty(req.query.metadataprefix))){
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.NO_METADATA_FORMATS)
                    return res.status(200).send(res.locals.Erreur).end()
                }
                let arg = req.query.identifier.split(":")
                if(arg.length == 3 && arg[0] == "oai" && baseNames.hasOwnProperty(arg[1]) && arg[2] != ""){
                    let ref = await createMongoGetRecordQuery(req.query)
                    console.log(ref)
                    if(ref.length == 0){
                        res.locals.getrecord = generateException(req.query, EXCEPTION_CODES.NO_RECORD_FOUND)
                        return res.status(200).send(res.locals.getrecord).end()
                    }
                    res.locals.getrecord = await createXmlFileGetRecord(req.query)
                    res.status(200).send(res.locals.getrecord).end()
                }else{
                    res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.ID_DOES_NOT_EXIST)
                    return res.status(200).send(res.locals.Erreur).end()
                }

            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break

        default:
                res.locals.Erreur = generateException(req.query, EXCEPTION_CODES.BAD_VERB)
                return res.status(200).send(res.locals.Erreur).end()
                
        
    }}catch (error) {
        capture(error)
        return res.status(500).send({ success: false, error })
      }
  });

  module.exports = router;