const express = require("express")
const router = express.Router()


/***************************************** Templates ****************************************/
const {
    responseContentIdentify,
    responseContentListSets,
    responseContentListmetadataformats
  } = require("./utils/OAI/oai_response_Content")


/**************************************** Fonctions *******************************************/

const {
    createXmlFile,
    createXmlFileListIdentifiers
  } = require("./utils/OAI/oai_utils")



/**
 * OAI entrepot GET function
 * les différentes API pour l'entrepot OAI 
 * fonction GET qui encapsule les différents appels
 */
router.get("/", async (req, res) => {
    try{
    res.set('Content-Type', 'text/xml')
    switch (req.query.verb) {
        
        case "Identify":
            try{
                res.locals.identify = createXmlFile(req.query,responseContentIdentify)
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
            break;
        
        case "ListIdentifiers": 
            try{
                if(!Object.keys(req.query).includes("metadataprefix")){
                    return res.status(500).send({success: false,msg: `l'argument "metadataPrefix" est obligatoire`})
                }
                res.locals.listidentifiers = await createXmlFileListIdentifiers(req.query)
                res.status(200).send(res.locals.listidentifiers).end()
            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break;

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