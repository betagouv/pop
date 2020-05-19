const express = require("express")
const router = express.Router()
const Memoire = require("../models/memoire");
const Merimee = require("../models/merimee");
const Palissy = require("../models/palissy");
const Joconde = require("../models/joconde");
const Museo = require("../models/museo");
const Mnr = require("../models/mnr");
const Autor = require("../models/autor");
const Enluminures = require("../models/enluminures");

const xml = require('xml');

const baseUrl = "https://api.pop.culture.gouv.fr/oai"



const responseContentIdentify = {
    Identify: [
        {repositoryName: "POP Entrepôt OAI"},
        {baseURL: "https://api.pop.culture.gouv.fr/oai"},
        {protocolVersion: "2.0"},
        {adminEmail: "test_email@pop.fr"},
        {earliestDatestamp: "test_date"},
        {deletedRecord: "no"},
        {granularity: "test_date"}
    ]
}

const responseContentListSets = {
    ListSets: [
        {   
            set:
            [
                {setSpec: "autor"},
                {setName: "Ressources biographiques (Autor)"}
            ]
        },
        {
            set:
            [
                {setSpec: "enluminures"},
                {setName: "Enluminures (Enluminures)"}
            ]
        },
        {
            set:
            [
                {setSpec: "joconde"},
                {setName: "Collections des musées de France (Joconde)"}
            ]
        },
        {
            set:
            [
                {setSpec: "memoire"},
                {setName: "Photographies (Mémoire)"}
            ]
        },
        {
            set:
            [
                {setSpec: "merimee"},
                {setName: "Patrimoine architectural (Mérimée)"}
            ]
        },
        {
            set:
            [
                {setSpec: "mnr"},
                {setName: "Récupération artistique (MNR Rose-Valland)"}
            ]      
        },
        {
            set:
            [
                {setSpec: "museo"},
                {setName: "Répertoire des Musées de France (Muséofile)"}
            ]
        },
        {
            set:
            [
                {setSpec: "palissy"},
                {setName: "Patrimoine mobilier (Palissy)"}
            ]
        }
    ]
}

const responseContentListmetadataformats = {
    ListMetadataFormats: [
        {   
            metadataFormat:
            [
                {metadataPrefix: "oai_dc"},
                {schema: "http://www.openarchives.org/OAI/2.0/oai_dc.xsd"},
                {metadataNamespace: "http://www.openarchives.org/OAI/2.0/oai_dc/"}
            ]
        }
    ]
}

function getBaseSpec(baseName){
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
                res.status(500).send({
                    success: false,
                    msg: `Unknown set: ${ queryContent.set }`
                })
                break
        }
    }catch (error) {
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at getBaseSpec: "+error })
      }
}
function generateResponse(queryContent,responseContent){
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

async function getSetNotices(queryContent){
    let setNotices = []
    if(Object.keys(queryContent).includes("set")){
        switch (queryContent.set) {
            
            case "joconde":
                try{
                    setNotices.push(await Joconde.find().limit(50))
                } catch (error) {
                    capture(error);
                    return res.status(500).send({ success: false, error })
                }
                break; 

            case "palissy":
                try{
                    setNotices.push(await Palissy.find().limit(50))
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
            setNotices.push( await Joconde.find().limit(1))
            setNotices.push( await Palissy.find().limit(1))
        }catch (error) {
            capture(error);
            return res.status(500).send({ success: false, error })
        }
    }
    let identifier = { ListIdentifiers: [] }
    setNotices.map( notice => { 
        let base = getBaseSpec(notice[0].BASE)
        let elem = {
            header:
            [
                {identifier: `oai:${ base }:${ notice[0].REF }`},
                {datestamp: notice[0].DMIS},
                {setSpec: base}
            ]
        }
       identifier.ListIdentifiers.push(elem)
    })
    return identifier
}

async function generateResponseListIdentifiers(queryContent){
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
    resp['OAI-PMH'].push(await getSetNotices(queryContent))
    return xml(resp, {declaration: true})
}

// OAI
router.get("/", async (req, res) => {
    try{
    res.set('Content-Type', 'text/xml')
    switch (req.query.verb) {
        case "identify":
            try{
                res.locals.identify = generateResponse(req.query,responseContentIdentify)
                res.status(200).send(res.locals.identify).end()
            }catch(oaiError) {
                res.status(500)
                res.send(oaiError)
            }
            break;  
        

        case "listsets": 
            try{
                res.locals.ListSets = generateResponse(req.query,responseContentListSets)
                res.status(200).send(res.locals.ListSets).end()
            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break;

        case "listmetadataformats": 
            try{
                res.locals.listmetadataformats = generateResponse(req.query,responseContentListmetadataformats)
                res.status(200).send(res.locals.listmetadataformats).end()
            }catch(oaiError) {
                    res.status(500)
                    res.send(oaiError)
            }
            break;
        
        case "listidentifiers": 
            try{
                if(!Object.keys(req.query).includes("metadataprefix")){
                    throw new Error(`l'argument "metadataPrefix" est obligatoire`);
                }
                res.locals.listidentifiers = await generateResponseListIdentifiers(req.query)
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