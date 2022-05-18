const baseUrl = "https://api.pop.culture.gouv.fr/oai"
const pop_url = "https://www.pop.culture.gouv.fr/"

const baseNames = {
    joconde: "Joconde",
    palissy: "Palissy",
    memoire: "Memoire",
    merimee: "Merimee",
    museo: "Museo",
    mnr: "Mnr",
    enluminures: "Enluminures",
    autor: "Autor"
}

const METADATA_FORMATS = {
    oai_dc: 'oai_dc'
}
const responseContentIdentify = {
    Identify: [
        {repositoryName: "pop.culture.gouv.fr - Entrepôt OAI"},
        {baseURL: "https://api.pop.culture.gouv.fr/oai"},
        {protocolVersion: "2.0"},
        {adminEmail: "pop@culture.gouv.fr"},
        {earliestDatestamp: "test_date"},
        {deletedRecord: "no"},
        {granularity: "YYYY-MM-DD"}
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
                {setName: "Rose Valland (MNR-Jeu de Paume)"}
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

module.exports = {
    baseUrl,
    pop_url,
    baseNames,
    METADATA_FORMATS,
    responseContentIdentify,
    responseContentListSets,
    responseContentListmetadataformats
}