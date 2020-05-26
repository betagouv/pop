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

module.exports = {
    baseUrl,
    pop_url,
    baseNames,
    responseContentIdentify,
    responseContentListSets,
    responseContentListmetadataformats
}