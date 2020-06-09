const express = require("express")
const router = express.Router()
let moment = require('moment-timezone')


/***************************************** Templates ****************************************/
const {
    baseNames,
    responseContentIdentify,
    responseContentListSets,
    responseContentListmetadataformats
  } = require("./utils/OAI/oai_response_Content")


/**************************************** Fonctions *******************************************/

const {
    createXmlFile,
    createXmlFileIdentify,
    createXmlFileListIdentifiers,
    createXmlFileListRecords,
    createXmlFileGetRecord
  } = require("./utils/OAI/oai_utils")



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
                res.locals.identify = await createXmlFileIdentify(req.query,responseContentIdentify)
                res.status(200).send(res.locals.identify).end()
            }catch(oaiError) {
                res.status(500)
                res.send(oaiError)
            }
            break;  
        

        case "ListSets": 
            try{
                res.locals.ListSets = createXmlFile(req.query,responseContentListSets)
                res.status(200).send(res.locals.ListSets).end()
            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break;

        case "ListMetadataFormats": 
            try{
                res.locals.listmetadataformats = createXmlFile(req.query,responseContentListmetadataformats)
                res.status(200).send(res.locals.listmetadataformats).end()
            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break
        
        case "ListIdentifiers": 
            try{
                if(Object.keys(req.query).includes("resumptionToken") && (Object.keys(req.query).includes("metadataprefix") || Object.keys(req.query).includes("set") || Object.keys(req.query).includes("from") || Object.keys(req.query).includes("until"))){
                    return res.status(500).send({success: false,msg: `query must have just verb wiht resumptionToken`})

                }
                if(!Object.keys(req.query).includes("metadataprefix") && !Object.keys(req.query).includes("resumptionToken")){
                    return res.status(500).send({success: false,msg: `l'argument "metadataPrefix" est obligatoire`})
                }
                if(Object.keys(req.query).includes("from") && Object.keys(req.query).includes("until")){
                    if(moment(req.query.from).format('YYYY-MM-DD') > moment(req.query.until).format('YYYY-MM-DD')){
                        return res.status(500).send({success: false,msg: `"from" doit étre inférieur de "until"`})
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
                if(Object.keys(req.query).includes("resumptionToken") && (Object.keys(req.query).includes("metadataprefix") || Object.keys(req.query).includes("set") || Object.keys(req.query).includes("from") || Object.keys(req.query).includes("until"))){
                    return res.status(500).send({success: false,msg: `query must have just verb wiht resumptionToken`})

                }
                if(!Object.keys(req.query).includes("metadataprefix") && !Object.keys(req.query).includes("resumptionToken")){
                    return res.status(500).send({success: false,msg: `l'argument "metadataPrefix" est obligatoire`})
                }
                if(Object.keys(req.query).includes("metadataprefix") && Object.keys(req.query).includes("resumptionToken")){
                    return res.status(500).send({success: false,msg: `l'argument "metadataPrefix" faux`})
                }
                if(Object.keys(req.query).includes("from") && Object.keys(req.query).includes("until")){
                    if(moment(req.query.from).format('YYYY-MM-DD') > moment(req.query.until).format('YYYY-MM-DD')){
                        return res.status(500).send({success: false,msg: `"from" doit étre inférieur de "until"`})
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
                if(!Object.keys(req.query).includes("metadataprefix")){
                    return res.status(500).send({success: false,msg: `l'argument "metadataPrefix" est obligatoire`})
                }
                if(!Object.keys(req.query).includes("identifier")){
                    return res.status(500).send({success: false,msg: `l'argument "identifier" est obligatoire`})
                }

                let arg = req.query.identifier.split(":")
                if(arg.length == 3 && arg[0] == "oai" && baseNames.hasOwnProperty(arg[1]) && arg[2] != ""){
                    res.locals.getrecord = await createXmlFileGetRecord(req.query)
                    res.status(200).send(res.locals.getrecord).end()
                }else{
                    return res.status(500).send({success: false, msg: `l'argument "identifier" incorrect ou incomplet`})
                }

            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break

        default:
            res.status(500).send({
                success: false,
                msg: `Unknown verb: ${ req.query.verb }`
              })
            break;
        
    }}catch (error) {
        capture(error)
        return res.status(500).send({ success: false, error })
      }
  });

  module.exports = router;