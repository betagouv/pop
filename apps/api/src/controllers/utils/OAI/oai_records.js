/**
 * Create xml record for Autor
 * @param {*} elem 
 * @param {*} notice 
 */
function createRecordAutor(elem,notice){
    try{
        let title = ""
        let subject = ""
        let type = ""
        let coverageSpatial = ""
        
        if('NOM' in notice) {
            if(notice.NOM != ""){
                title = notice.NOM
            }
        }
        if('PNOM' in notice){
            if(notice.PNOM != ""){
                if(title != ""){
                    title.concat(" ;",notice.PNOM)
                }else{
                    title = notice.PNOM
                }
            }
        }

        if('FONC' in notice){
            notice.FONC.map( fonc => {
                if(fonc != ""){
                    if(title != ""){
                        title.concat(" ;", fonc)

                    }else{
                        title = fonc
                    }
                    if(subject != ""){
                        subject.concat(" ;", fonc)
                        
                    }else{
                        subject = fonc
                    }
                    if(type != ""){
                        type.concat(" ;", fonc)
                        
                    }else{
                        type = fonc
                    }
                }
            })
        }

        if(title != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:title': title})
        }

        if('GAR' in notice){
            if(notice.GAR != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.GAR)
                }else{
                    subject = notice.GAR
                }
            }
        }

        if('BIF' in notice){
            if(notice.BIF != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.BIF)
                }else{
                    subject = notice.BIF
                }
            }
        }

        if('PREF' in notice){
            if(notice.PREF != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.PREF)
                }else{
                    subject = notice.PREF
                }
            }
        }


        if('SYMB' in notice){
            if(notice.SYMB != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.SYMB)
                }else{
                    subject = notice.SYMB
                }
            }
        }

        if('TYPID' in notice){
            notice.TYPID.map( typid => {
                if(typid != ""){
                    if(subject != ""){
                        subject.concat(" ;", typid)   
                    }else{
                        subject = typid
                    }
                    if(type != ""){
                        type.concat(" ;", typid)
                        
                    }else{
                        type = typid
                    }
                }
            })
        }

        if(subject != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:subject': subject})
        }

        if('BIO' in notice){
            if(notice.BIO != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:description': notice.BIO})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:identifier': "www.pop.culture.gouv.fr/notice/autor/" + notice.REF })

        if('PRODUCTEUR' in notice){
            if(notice.PRODUCTEUR != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:creator': notice.PRODUCTEUR})
            }
        }
        
        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:source': "Base de données de ressources biographiques Autor"})
        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:publisher': "Ministère de la Culture"})

        if('SCLE' in notice){
            notice.SCLE.map( scle => {
                if(scle != ""){
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:date': scle})
                }
            })
        }

        if('PRODUCTEUR' in notice){
            if(notice.PRODUCTEUR != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:contributor': notice.PRODUCTEUR})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:rights': "(c) Ministère de la Culture"})
        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:language': "français"})
        
        if(type != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:type': type})
        }

        if('LOCA' in notice){
            if(notice.LOCA != ""){
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.LOCA)
                }else{
                    coverageSpatial = notice.LOCA
                }
            }
        }

        if('LOCACT' in notice){
            if(notice.LOCACT != ""){
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.LOCACT)
                }else{
                    coverageSpatial = notice.LOCACT
                }
            }
        }

        if(coverageSpatial != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageSpatial })
        }

        if('SCLE' in notice){
            notice.SCLE.map( scle => {
                if(scle != ""){
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': scle})
                }
            })
        }
    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at createRecordObject: "+error })
    }
}


/**
 * Create xml record for Joconde
 * @param {*} elem 
 * @param {*} notice 
 */
function createRecordJoconde(elem,notice){
    
    try{
        let title = ""
        let subject = ""
        let description = ""
        let creator = ""
        let date = ""
        let type = ""
        let coverageSpatial = ""
        let coverageTemporal = ""

        
        if('TITR' in notice) {
            if(notice.TITR != ""){
                if(title != ""){
                    title.concat(" ;", notice.TITR)
                }else{
                    title = notice.TITR
                }
                if(subject != ""){
                    subject.concat(" ;",notice.TITR)
                }else{
                    subject = notice.TITR
                }
            }
        }

        if('DENO' in notice){
            notice.DENO.map( deno => {
                if(deno != ""){
                    if(title != ""){
                        title.concat(" ;", deno)
                    }else{
                        title = deno
                    }
                    if(subject != ""){
                        subject.concat(" ;", deno)
                    }else{
                        subject = deno
                    }
                    if(type != ""){
                        type.concat(" ;", deno)
                    }else{
                        type = deno
                    }
                }
            })
        }

        if('APPL' in notice){
            if(notice.APPL != ""){
                if(title != ""){
                    title.concat(" ;",notice.APPL)
                }else{
                    title = notice.APPL
                }
            }
        }

        if('DOMN' in notice){
            notice.DOMN.map( domn => {
                if(domn != ""){
                    if(title != ""){
                        title.concat(" ;", domn)
                    }else{
                        title = domn
                    }
                    if(subject != ""){
                        subject.concat(" ;", domn)
                    }else{
                        subject = domn
                    }
                    if(type != ""){
                        type.concat(" ;", domn)
                    }else{
                        type = domn
                    }
                }
            })
        }

        if(title != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:title': title})
        }

        if('UTIL' in notice){
            notice.UTIL.map( util => {
                if(util != ""){
                    if(subject != ""){
                        subject.concat(" ;", util)
                    }else{
                        subject = util
                    }
                }
            })
        }

        if('AUTR' in notice){
            notice.AUTR.map( autr => {
                if(autr != ""){
                    if(subject != ""){
                        subject.concat(" ;", autr)
                    }else{
                        subject = autr
                    }
                }
                if(autr != ""){
                    if(creator != ""){
                        creator.concat(" ;", autr)
                    }else{
                        creator = autr
                    }
                }
            })
        }

        if('ECOL' in notice){
            notice.ECOL.map( ecol => {
                if(ecol != ""){
                    if(subject != ""){
                        subject.concat(" ;", ecol)
                    }else{
                        subject = ecol
                    }
                }
            })
        }

        if('LIEUX' in notice){
            notice.LIEUX.map( lieux => {
                if(lieux != ""){
                    if(subject != ""){
                        subject.concat(" ;", lieux)
                    }else{
                        subject = lieux
                    }
                    if(coverageSpatial != ""){
                        coverageSpatial.concat(" ;", lieux)
                    }else{
                        coverageSpatial = lieux
                    }
                }
            })
        }

        if('PERI' in notice){
            notice.PERI.map( peri => {
                if(peri != ""){
                    if(subject != ""){
                        subject.concat(" ;", peri)
                    }else{
                        subject = peri
                    }
                    if(date != ""){
                        date.concat(" ;", peri)
                    }else{
                        date = peri
                    }
                }
            })
        }

        if('PERU' in notice){
            notice.PERU.map( peru => {
                if(peru != ""){
                    if(subject != ""){
                        subject.concat(" ;", peru)
                    }else{
                        subject = peru
                    }
                }
            })
        }

        if('EPOQ' in notice){
            notice.EPOQ.map( epoq => {
                if(epoq != ""){
                    if(subject != ""){
                        subject.concat(" ;", epoq)
                    }else{
                        subject = epoq
                    }
                    if(date != ""){
                        date.concat(" ;", epoq)
                    }else{
                        date = epoq
                    }
                }
            })
        }

        if('TECH' in notice){
            notice.TECH.map( tech => {
                if(tech != ""){
                    if(subject != ""){
                        subject.concat(" ;", tech)
                    }else{
                        subject = tech
                    }
                }
            })
        }

        if('INSC' in notice){
            notice.INSC.map( insc => {
                if(insc != ""){
                    if(subject != ""){
                        subject.concat(" ;", insc)
                    }else{
                        subject = insc
                    }
                }
            })
        }

        if('REPR' in notice){
            notice.REPR.map( repr => {
                if(repr != ""){
                    if(subject != ""){
                        subject.concat(" ;", repr)
                    }else{
                        subject = repr
                    }
                    if(description != ""){
                        description.concat(" ;", repr)
                    }else{
                        description = repr
                    }
                }
            })
        }

        if('SREP' in notice){
            notice.SREP.map( srep => {
                if(srep != ""){
                    if(subject != ""){
                        subject.concat(" ;", srep)
                    }else{
                        subject = srep
                    }
                }
            })
        }

        if('REGION' in notice){
            if(notice.REGION != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.REGION)
                }else{
                    subject = notice.REGION
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.REGION)
                }else{
                    coverageSpatial = notice.REGION
                }
            }
        }

        if('DPT' in notice){
            if(notice.DPT != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.DPT)
                }else{
                    subject = notice.DPT
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.DPT)
                }else{
                    coverageSpatial = notice.DPT
                }
            }
        }

        if('VILLE_M' in notice){
            if(notice.VILLE_M != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.VILLE_M)
                }else{
                    subject = notice.VILLE_M
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.VILLE_M)
                }else{
                    coverageSpatial = notice.VILLE_M
                }
            }
        }

        if('NOMOFF' in notice){
            if(notice.NOMOFF != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.NOMOFF)
                }else{
                    subject = notice.NOMOFF
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.NOMOFF)
                }else{
                    coverageSpatial = notice.NOMOFF
                }
            }
        }

        if('DECV' in notice){
            if(notice.DECV != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.DECV)
                }else{
                    subject = notice.DECV
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.DECV)
                }else{
                    coverageSpatial = notice.DECV
                }
            }
        }

        if('APPL' in notice){
            if(notice.APPL != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.APPL)
                }else{
                    subject = notice.APPL
                }
            }
        }

        if('PLIEUX' in notice){
            if(notice.PLIEUX != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.PLIEUX)
                }else{
                    subject = notice.PLIEUX
                }
            }
        }

        if('PUTI' in notice){
            if(notice.PUTI != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.PUTI)
                }else{
                    subject = notice.PUTI
                }
            }
        }

        if('MILL' in notice){
            notice.MILL.map( mill => {
                if(mill != ""){
                    if(subject != ""){
                        subject.concat(" ;", mill)
                    }else{
                        subject = mill
                    }
                    if(date != ""){
                        date.concat(" ;", mill)
                    }else{
                        date = mill
                    }
                }
            })
        }

        if('MILU' in notice){
            if(notice.MILU != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.MILU)
                }else{
                    subject = notice.MILU
                }
                if(date != ""){
                    date.concat(" ;",notice.MILU)
                }else{
                    date = notice.MILU
                }
            }
        }

        if('PINS' in notice){
            if(notice.PINS != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.PINS)
                }else{
                    subject = notice.PINS
                }
            }
        }

        if('ONOM' in notice){
            notice.ONOM.map( onom => {
                if(onom != ""){
                    if(subject != ""){
                        subject.concat(" ;", onom)
                    }else{
                        subject = onom
                    }
                    if(creator != ""){
                        creator.concat(" ;", onom)
                    }else{
                        creator = onom
                    }
                }
            })
        }

        if('DESC' in notice){
            if(notice.DESC != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.DESC)
                }else{
                    subject = notice.DESC
                }
                if(description != ""){
                    description.concat(" ;",notice.DESC)
                }else{
                    description = notice.DESC
                }
            }
        }

        if('HIST' in notice){
            if(notice.HIST != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.HIST)
                }else{
                    subject = notice.HIST
                }
            }
        }

        if('GEOHI' in notice){
            notice.GEOHI.map( geohi => {
                if(geohi != ""){
                    if(subject != ""){
                        subject.concat(" ;", geohi)
                    }else{
                        subject = geohi
                    }
                    if(coverageSpatial != ""){
                        coverageSpatial.concat(" ;", geohi)
                    }else{
                        coverageSpatial = geohi
                    }
                }
            })
        }

        if('PDEC' in notice){
            if(notice.PDEC != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.PDEC)
                }else{
                    subject = notice.PDEC
                }
            }
        }

        if(subject != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:subject': subject})
        }

        if('ETAT' in notice){
            if(notice.ETAT != ""){
                if(description != ""){
                    description.concat(" ;",notice.ETAT)
                }else{
                    description = notice.ETAT
                }
            }
        }

        if('PREP' in notice){
            if(notice.PREP != ""){
                if(description != ""){
                    description.concat(" ;",notice.PREP)
                }else{
                    description = notice.PREP
                }
            }
        }

        if(description != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:description': description})
        }

        if('APTN' in notice){
            if(notice.APTN != ""){
                if(creator != ""){
                    creator.concat(" ;",notice.APTN)
                }else{
                    creator = notice.APTN
                }
            }
        }

        if('ATTR' in notice){
            if(notice.ATTR != ""){
                if(creator != ""){
                    creator.concat(" ;",notice.ATTR)
                }else{
                    creator = notice.ATTR
                }
            }
        }

        if('CONTACT' in notice){
            if(notice.CONTACT != ""){
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:source': notice.CONTACT})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:publisher': "Ministère de la Culture"})

        if('PEOC' in notice){
            notice.PEOC.map( peoc => {
                if(peoc != ""){
                    if(date != ""){
                        date.concat(" ;", peoc)
                    }else{
                        date = peoc
                    }
                }
            })
        }

        if(date != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:date': date})
        }

        if('PRODUCTEUR' in notice){
            if(notice.PRODUCTEUR != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:contributor': notice.PRODUCTEUR})
            }
        }

        if('COPY' in notice){
            if(notice.COPY != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:rights': notice.COPY})
            }
        }

        if('DIMS' in notice){
            if(notice.DIMS != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:format': notice.DIMS})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:language': "français"})
        
        if(type != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:type': type})
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:identifier': "www.pop.culture.gouv.fr/notice/joconde/" + notice.REF })

        if(coverageSpatial != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageSpatial})
        }

        if('SCLE' in notice){
            notice.SCLE.map( scle => {
                if(coverageTemporal != ""){
                    coverageTemporal.concat(" ;", scle)
                }else{
                    coverageTemporal = scle
                }
            })
        }

        if(coverageTemporal != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageTemporal})
        }

    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at createRecordObject: "+error })
    }
}

/**
 * Create xml record for Mémoire
 * @param {*} elem 
 * @param {*} notice 
 */
function createRecordMemoire(elem,notice){
    try{
        let subject = ""
        let creator = ""
        let date = ""
        let rights = ""
        let type = ""
        let format = ""
        let coverageSpatial = ""
        let coverageTemporal = ""

        if('TICO' in notice){
            if(notice.TICO != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:title': notice.TICO})
            }
        }
        if('EDIF' in notice){
            if(notice.EDIF != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.EDIF)
                }else{
                    subject = notice.EDIF
                }
            }
        }

        if('SERIE' in notice){
            if(notice.SERIE != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.SERIE)
                }else{
                    subject = notice.SERIE
                }
            }
        }

        if('TITRE' in notice){
            if(notice.TITRE != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.TITRE)
                }else{
                    subject = notice.TITRE
                }
            }
        }

        if('MCL' in notice){
            if(notice.MCL != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.MCL)
                }else{
                    subject = notice.MCL
                }
            }
        }

        if(subject != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:subject': subject})
        }

        if('LEG' in notice){
            if(notice.LEG != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:description': notice.LEG})
            }
        }

        if('AUTP' in notice){
            notice.AUTP.map( autp => {
                if(autp != ""){
                    if(creator != ""){
                        creator.concat(" ;", autp)
                    }else{
                        creator = autp
                    }
                    if(rights != ""){
                        rights.concat(" ;", autp)
                    }else{
                        rights = autp
                    }
                }
            })
        }

        if('AUTOEU' in notice){
            if(notice.AUTOEU != ""){
                    if(creator != ""){
                        creator.concat(" ;", notice.AUTOEU)
                    }else{
                        creator = notice.AUTOEU
                    }
                }
        }

        if('AUTOR' in notice){
            if(notice.AUTOR != ""){
                if(creator != ""){
                    creator.concat(" ;",notice.AUTOR)
                }else{
                    creator = notice.AUTOR
                }
            }
        }

        if('MCPER' in notice){
            if(notice.MCPER != ""){
                if(creator != ""){
                    creator.concat(" ;",notice.MCPER)
                }else{
                    creator = notice.MCPER
                }
            }
        }

        if(creator != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:creator': creator})
        }

        if('CONTACT' in notice){
            if(notice.CONTACT != ""){
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:source': notice.CONTACT})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:publisher': "Ministère de la Culture"})

        if('SCLE' in notice){
            if(notice.SCLE != ""){
                if(date != ""){
                    date.concat(" ;", notice.SCLE)
                }else{
                    date = notice.SCLE
                }
                if(coverageTemporal != ""){
                    coverageTemporal.concat(" ;", notice.SCLE)
                }else{
                    coverageTemporal = notice.SCLE
                }
            }
        }

        if('DATOEU' in notice){
            if(notice.DATOEU != ""){
                if(date != ""){
                    date.concat(" ;", notice.DATOEU)
                }else{
                    date = notice.DATOEU
                }
                if(coverageTemporal != ""){
                    coverageTemporal.concat(" ;", notice.DATOEU)
                }else{
                    coverageTemporal = notice.DATOEU
                }
            }
        }  
        if('DATPV' in notice){
            if(notice.DATPV != ""){
                if(date != ""){
                    date.concat(" ;", notice.DATPV )
                }else{
                    date = notice.DATPV 
                }
                if(coverageTemporal != ""){
                    coverageTemporal.concat(" ;", notice.DATPV )
                }else{
                    coverageTemporal = notice.DATPV 
                }
            }
        }  

        if(date != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:date': date})
        }

        if('PRODUCTEUR' in notice){
            if(notice.PRODUCTEUR != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:contributor': notice.PRODUCTEUR})
            }
        }

        if('COPY' in notice){
            if(notice.COPY != ""){
                if(rights != ""){
                    rights.concat(" ;", notice.COPY)
                }else{
                    rights = notice.COPY
                }            
            }
        }
        
        if(rights != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:rights': rights})
        }

        if('FORMAT' in notice){
            if(notice.FORMAT != ""){
                if(format != ""){
                    format.concat(" ;",notice.FORMAT)
                }else{
                    format = notice.FORMAT
                }
            }
        }

        if('FORMATOR' in notice){
            if(notice.FORMATOR != ""){
                if(format != ""){
                    format.concat(" ;",notice.FORMATOR)
                }else{
                    format = notice.FORMATOR
                }
            }
        }

        if('FORMATTI' in notice){
            if(notice.FORMATTI != ""){
                if(format != ""){
                    format.concat(" ;",notice.FORMATTI)
                }else{
                    format = notice.FORMATTI
                }
            }
        }

        if(format != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:format': format})
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:language': "français"})

        if('TYP' in notice){
            if(notice.TYP != ""){
                if(type != ""){
                    type.concat(" ;",notice.TYP)
                }else{
                    type = notice.TYP
                }
            }
        }

        if('TYPDOC' in notice){
            if(notice.TYPDOC != ""){
                if(type != ""){
                    type.concat(" ;",notice.TYPDOC)
                }else{
                    type = notice.TYPDOC
                }
            }
        }

        if(type != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:type': type})
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:identifier': "www.pop.culture.gouv.fr/notice/memoire/" + notice.REF })

        if('PAYS' in notice){
            if(notice.PAYS != ""){
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.PAYS)
                }else{
                    coverageSpatial = notice.PAYS
                }
            }
        }

        if('REG' in notice){
            if(notice.REG != ""){
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.REG)
                }else{
                    coverageSpatial = notice.REG
                }
            }
        }
        
        if('DPT' in notice){
            if(notice.DPT != ""){
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.DPT)
                }else{
                    coverageSpatial = notice.DPT
                }
            }
        } 

        if('COM' in notice){
            if(notice.COM != ""){
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.COM)
                }else{
                    coverageSpatial = notice.COM
                }
            }
        }

        if('LIEUCOR' in notice){
            if(notice.LIEUCOR != ""){
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.LIEUCOR)
                }else{
                    coverageSpatial = notice.LIEUCOR
                }
            }
        }

        if(coverageSpatial != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageSpatial})
        }
        if(coverageTemporal != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageTemporal})
        }

    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at createRecordObject: "+error })
    }
}


/**
 * Create xml record for Mérimée
 * @param {*} elem 
 * @param {*} notice 
 */
function createRecordMerimee(elem,notice){
    try{
        let title = ""
        let subject = ""
        let creator = ""
        let date = ""
        let coverageSpatial = ""
        let coverageTemporal = ""

        if('WCOM' in notice) {
            if(notice.WCOM != ""){
                title.concat(" ;",notice.WCOM)
            }else{
                title = notice.WCOM
            }
        }
        if('TICO' in notice){
            if(notice.TICO != ""){
                if(title != ""){
                    title.concat(" ;",notice.TICO)
                }else{
                    title = notice.TICO
                }
            }
        }

        if(title != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:title': title})
        }

        if('REF' in notice){
            if(notice.REF != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.REF)
                }else{
                    subject = notice.REF
                }
            }
        }

        if('STAT' in notice){
            if(notice.STAT != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.STAT)
                }else{
                    subject = notice.STAT
                }
            }
        } 
        
        if('PROT' in notice){
            notice.PROT.map( prot => {
                if(prot != ""){
                    if(subject != ""){
                        subject.concat(" ;", prot)
                    }else{
                        subject = prot
                    }
                }
            })
        }

        if('DPRO' in notice){
            if(notice.DPRO != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.DPRO)
                }else{
                    subject = notice.DPRO
                }
            }
        }
        
        if('PPRO' in notice){
            if(notice.PPRO != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.PPRO)
                }else{
                    subject = notice.PPRO
                }
            }
        }
        
        if('HIST' in notice){
            if(notice.HIST != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.HIST)
                }else{
                    subject = notice.HIST
                }
            }
        }

        if('DESC' in notice){
            if(notice.DESC != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:description': notice.DESC})
                if(subject != ""){
                    subject.concat(" ;",notice.DESC)
                }else{
                    subject = notice.DESC
                }
            }
        }

        if('DENO' in notice){
            notice.DENO.map( deno => {
                if(deno != ""){
                    if(subject != ""){
                        subject.concat(" ;", deno)
                    }else{
                        subject = deno
                    }
                }
            })
        }

        if('TICO' in notice){
            if(notice.TICO != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.TICO)
                }else{
                    subject = notice.TICO
                }
            }
        }

        if('WADRS' in notice){
            if(notice.WADRS != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.WADRS)
                }else{
                    subject = notice.WADRS
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.WADRS)
                }else{
                    coverageSpatial = notice.WADRS
                }
            }
        }

        if('CADA' in notice){
            notice.CADA.map( cada => {
                if(cada != ""){
                    if(subject != ""){
                        subject.concat(" ;", cada)
                    }else{
                        subject = cada
                    }
                }
            })
        }

        if('SCLE' in notice){
            notice.SCLE.map( scle => {
                if(scle != ""){
                    if(subject != ""){
                        subject.concat(" ;", scle)
                    }else{
                        subject = scle
                    }
                }
            })
        }

        if('DATE' in notice){
            notice.DATE.map( date => {
                if(date != ""){
                    if(subject != ""){
                        subject.concat(" ;", date)
                    }else{
                        subject = date
                    }
                }
            })
        }

        if('AUTR' in notice){
            notice.AUTR.map( autr => {
                if(autr != ""){
                    if(subject != ""){
                        subject.concat(" ;", autr)
                    }else{
                        subject = autr
                    }
                    if(creator != ""){
                        creator.concat(" ;", autr)
                    }else{
                        creator = autr
                    }
                }
            })
        }

        if('PERS' in notice){
            notice.PERS.map( pers => {
                if(pers != ""){
                    if(subject != ""){
                        subject.concat(" ;", pers)
                    }else{
                        subject = pers
                    }
                    if(creator != ""){
                        creator.concat(" ;", pers)
                    }else{
                        creator = pers
                    }
                }
            })
        }

        if('AFFE' in notice){
            if(notice.AFFE != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.AFFE)
                }else{
                    subject = notice.AFFE
                }
            }
        }

        if('REG' in notice){
            if(notice.REG != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.REG)
                }else{
                    subject = notice.REG
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.REG)
                }else{
                    coverageSpatial = notice.REG
                }
            }
        } 

        if('WCOM' in notice){
            if(notice.WCOM != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.WCOM)
                }else{
                    subject = notice.WCOM
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.WCOM)
                }else{
                    coverageSpatial = notice.WCOM
                }
            }
        }
        
        if('DPT_LETTRE' in notice){
            if(notice.DPT_LETTRE != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.DPT_LETTRE)
                }else{
                    subject = notice.DPT_LETTRE
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.DPT_LETTRE)
                }else{
                    coverageSpatial = notice.DPT_LETTRE
                }
            }
        }

        if(subject != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:subject': subject})
        }

        if('CONTACT' in notice){
            if(notice.CONTACT != ""){
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:source': notice.CONTACT})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:publisher': "Ministère de la Culture"})

        if('SCLE' in notice){
            notice.SCLE.map( scle => {
                if(scle != ""){
                    if(date != ""){
                        date.concat(" ;",scle)
                    }else{
                        date = scle
                    } 
                    if(coverageTemporal != ""){
                        coverageTemporal.concat(" ;", scle)
                    }else{
                        coverageTemporal = scle
                    }
                }               
            })
        }

        if('DATE' in notice){
            notice.DATE.map( date => {
                if(date != ""){
                    if(date != ""){
                        date.concat(" ;",date)
                    }else{
                        date = date
                    } 
                    if(coverageTemporal != ""){
                        coverageTemporal.concat(" ;", date)
                    }else{
                        coverageTemporal = date
                    }
                }               
            })
        }

        if(date != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:date': date})
        }

        if('PRODUCTEUR' in notice){
            if(notice.PRODUCTEUR != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:contributor': notice.PRODUCTEUR})
            }
        }

        if('COPY' in notice){
            if(notice.COPY != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:rights': notice.COPY})
            }
        }

        if('DIMS' in notice){
            if(notice.DIMS != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:format': notice.DIMS})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:language': "français"})

        if('DENO' in notice){
            notice.DENO.map( deno => {
                if(deno != ""){
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:type': deno})
                }
            })
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:identifier': "www.pop.culture.gouv.fr/notice/merimee/" + notice.REF })

        if(coverageSpatial != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageSpatial})
        }

        if(coverageTemporal != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageTemporal})
        }

    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at createRecordObject: "+error })
    }
}

/**
 * Create xml record for Mémoire
 * @param {*} elem 
 * @param {*} notice 
 */
function createRecordMnr(elem,notice){
    try{
        let title = ""
        let subject = ""
        let creator = ""
        let date = ""
        let type = ""
        let coverageTemporal = ""

        if('TITR' in notice){
            if(notice.TITR != ""){
                if(title != ""){
                    title.concat(" ;",notice.TITR)
                }else{
                    title = notice.TITR
                }
            }
        }

        if('AUTI' in notice){
            if(notice.AUTI != ""){
                if(title != ""){
                    title.concat(" ;",notice.AUTI)
                }else{
                    title = notice.AUTI
                }
            }
        }

        if(title != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:title': title})
        }
        if('DOMN' in notice){
            notice.DOMN.map( domn => {
                if(domn != ""){
                    if(subject != ""){
                        subject.concat(" ;", domn)
                    }else{
                        subject = domn
                    }
                }
            })
        }

        if('ECOL' in notice){
            if(notice.ECOL != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.ECOL)
                }else{
                    subject = notice.ECOL
                }
                if(creator != ""){
                    creator.concat(" ;",notice.ECOL)
                }else{
                    creator = notice.ECOL
                }
            }
        }

        if('ETAT' in notice){
            if(notice.ETAT != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.ETAT)
                }else{
                    subject = notice.ETAT
                }
            }
        }

        if('STYL' in notice){
            if(notice.STYL != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.STYL)
                }else{
                    subject = notice.STYL
                }
                if(creator != ""){
                    creator.concat(" ;",notice.STYL)
                }else{
                    creator = notice.STYL
                }
            }
        }

        if('TECH' in notice){
            notice.TECH.map( tech => {
                if(tech != ""){
                    if(subject != ""){
                        subject.concat(" ;", tech)
                    }else{
                        subject = tech
                    }
                }
            })
        }

        if(subject != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:subject': subject})
        }

        if('HIST' in notice){
            if(notice.HIST != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:description': notice.HIST})
            }
        }

        
        if('AUTR' in notice){
            notice.AUTR.map( autr => {
                if(autr != ""){
                    if(creator != ""){
                        creator.concat(" ;", autr)
                    }else{
                        creator = autr
                    }
                }
            })
        }

        if('ATTR' in notice){
            if(notice.ATTR != ""){
                if(creator != ""){
                    creator.concat(" ;",notice.ATTR)
                }else{
                    creator = notice.ATTR
                }
            }
        }

        if('AATT' in notice){
            if(notice.AATT != ""){
                if(creator != ""){
                    creator.concat(" ;",notice.AATT)
                }else{
                    creator = notice.AATT
                }
            }
        }

        if(creator != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:creator': creator})
        }


        if('CONTACT' in notice){
            if(notice.CONTACT != ""){
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:source': notice.CONTACT})
            }
        }

        if('REDC' in notice){
            notice.REDC.map( redc => {
                if(redc != ""){
                        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:publisher': redc})
                    }
            })
        }

        if('SCLE' in notice){
            notice.SCLE.map( scle => {
                if(date != ""){
                    date.concat(" ;", scle)
                }else{
                    date = scle
                }
                if(coverageTemporal != ""){
                    coverageTemporal.concat(" ;", scle)
                }else{
                    coverageTemporal = scle
                }
            })
        }

        if('MILL' in notice){
            if(notice.MILL != ""){
                if(date != ""){
                    date.concat(" ;",notice.MILL)
                }else{
                    date = notice.MILL
                }
                if(coverageTemporal != ""){
                    coverageTemporal.concat(" ;", notice.MILL)
                }else{
                    coverageTemporal = notice.MILL
                }
            }
        }

        if(date != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:date': date})
        }


        if('PRODUCTEUR' in notice){
            if(notice.PRODUCTEUR != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:contributor': notice.PRODUCTEUR})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:rights': "(c) Ministère de la Culture"})

        if('DIMS' in notice){
            if(notice.DIMS != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:format': notice.DIMS})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:language': "français"})

        if('DOMN' in notice){
            notice.DOMN.map( domn => {
                if(domn != ""){
                    if(type != ""){
                        type.concat(" ;", domn)
                    }else{
                        type = domn
                    }
                }
            })
        }

        if('CATE' in notice){
            if(notice.CATE != ""){
                if(type != ""){
                    type.concat(" ;",notice.CATE)
                }else{
                    type = notice.CATE
                }
            }
        }

        
        if('DENO' in notice){
            notice.DENO.map( deno => {
                if(deno != ""){
                    if(type != ""){
                        type.concat(" ;", deno)
                    }else{
                        type = deno
                    }
                }
            })
        }

        if(type != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:type': type})
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:identifier': "www.pop.culture.gouv.fr/notice/mnr/" + notice.REF })

        if('LOCA' in notice){
            if(notice.LOCA != ""){
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': notice.LOCA})
            }
        }

        if(coverageTemporal != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageTemporal})
        }

    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at createRecordObject: "+error })
    }
}


/**
 * Create xml record for museo
 * @param {*} elem 
 * @param {*} notice 
 */
function createRecordMuseo(elem,notice){
    try{
        let subject = ""
        let coverageSpatial = ""


        if('NOMOFF' in notice){
            if(notice.NOMOFF != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:title': notice.NOMOFF})
            }
        }  
        if('CATEG' in notice){
            if(notice.CATEG != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.CATEG)
                }else{
                    subject = notice.CATEG
                }
            }
        }

        if('DOMPAL' in notice){
            notice.DOMPAL.map( dompal => {
                if(dompal != ""){
                    if(subject != ""){
                        subject.concat(" ;", dompal)
                    }else{
                        type = dompal
                    }subject
                }
            })
        }

        if('THEMES' in notice){
            notice.THEMES.map( themes => {
                if(themes != ""){
                    if(subject != ""){
                        subject.concat(" ;", themes)
                    }else{
                        subject = themes
                    }
                }
            })
        }

        if('STATUT' in notice){
            if(notice.STATUT != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.STATUT)
                }else{
                    subject = notice.STATUT
                }
            }
        }
        
        if(subject != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:subject': subject})
        }

        if('HIST' in notice){
            if(notice.HIST != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:description':  notice.HIST})
            }
        }

        if('CONTACT_MUSEO' in notice){
            if(notice.CONTACT_MUSEO != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:creator':  notice.CONTACT_MUSEO})
            }
        }

        if('CONTACT_GENERIQUE' in notice){
            if(notice.CONTACT_GENERIQUE != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:source':  notice.CONTACT_GENERIQUE})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:publisher': "Ministère de la Culture"})
        if('PRODUCTEUR' in notice){
            if(notice.PRODUCTEUR != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:contributor': notice.PRODUCTEUR})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:rights': "(c) Ministère de la Culture"})
        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:language': "français"})
        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:type': "Musée"})
        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:identifier': "www.pop.culture.gouv.fr/notice/museo/" + notice.REF })

        if('DPT' in notice){
            if(notice.DPT != ""){
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.DPT)
                }else{
                    coverageSpatial = notice.DPT
                }
            }
        }

        if('VILLE_M' in notice){
            if(notice.VILLE_M != ""){
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.VILLE_M)
                }else{
                    coverageSpatial = notice.VILLE_M
                }
            }
        }

        if(coverageSpatial != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageSpatial})
        }

    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at createRecordObject: "+error })
    }
}


/**
 * Create xml record for Mémoire
 * @param {*} elem 
 * @param {*} notice 
 */
function createRecordPalissy(elem,notice){
    try{
        let title = ""
        let subject = ""
        let description =  ""
        let creator = ""
        let date = ""
        let type = ""
        let coverageTemporal = ""
        let coverageSpatial = ""

        if('WCOM' in notice){
            if(notice.WCOM != ""){
                if(title != ""){
                    title.concat(" ;",notice.WCOM)
                }else{
                    title = notice.WCOM
                }
                if(subject != ""){
                    subject.concat(" ;", notice.WCOM)
                }else{
                    subject = notice.WCOM
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;", notice.WCOM)
                }else{
                    coverageSpatial = notice.WCOM
                }
            }
        }

        if('EDIF' in notice){
            if(notice.EDIF != ""){
                if(title != ""){
                    title.concat(" ;",notice.EDIF)
                }else{
                    title = notice.EDIF
                }
                if(subject != ""){
                    subject.concat(" ;",notice.EDIF)
                }else{
                    subject = notice.EDIF
                }
            }
        }

        if('TICO' in notice){
            if(notice.TICO != ""){
                if(title != ""){
                    title.concat(" ;",notice.TICO)
                }else{
                    title = notice.TICO
                }
                if(subject != ""){
                    subject.concat(" ;",notice.TICO)
                }else{
                    subject = notice.TICO
                }
            }
        }

        if(title != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:title': title})
        }
        if('REF' in notice){
            if(notice.REF != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.REF)
                }else{
                    subject = notice.REF
                }
            }
        }

        if('STAT' in notice){
            notice.STAT.map( stat => {
                if(stat != ""){
                    if(subject != ""){
                        subject.concat(" ;", stat)
                    }else{
                        subject = stat
                    }
                }
            })
        }

        if('PROT' in notice){
            if(notice.PROT != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.PROT)
                }else{
                    subject = notice.PROT
                }
            }
        }

        if('DPRO' in notice){
            if(notice.DPRO != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.DPRO)
                }else{
                    subject = notice.DPRO
                }
            }
        }
  
        if('PPRO' in notice){
            if(notice.PPRO != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.PPRO)
                }else{
                    subject = notice.PPRO
                }
            }
        }

        if('CATE' in notice){
            notice.CATE.map( cate => {
                if(cate != ""){
                    if(subject != ""){
                        subject.concat(" ;", cate)
                    }else{
                        subject = cate
                    }
                }
            })
        }

        if('MATR' in notice){
            notice.MATR.map( matr => {
                if(matr != ""){
                    if(subject != ""){
                        subject.concat(" ;", matr)
                    }else{
                        subject = matr
                    }
                }
            })
        }

        if('INSC' in notice){
            notice.INSC.map( insc => {
                if(insc != ""){
                    if(subject != ""){
                        subject.concat(" ;", insc)
                    }else{
                        subject = insc
                    }
                }
            })
        }

        if('PINS' in notice){
            if(notice.PINS != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.PINS)
                }else{
                    subject = notice.PINS
                }
            }
        }

        if('HIST' in notice){
            if(notice.HIST != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.HIST)
                }else{
                    subject = notice.HIST
                }
            }
        }

        if('DESC' in notice){
            if(notice.DESC != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.DESC)
                }else{
                    subject = notice.DESC
                }
                if(description != ""){
                    description.concat(" ;",notice.DESC)
                }else{
                    description = notice.DESC
                }
            }
        }

        if('PREP' in notice){
            if(notice.PREP != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.PREP)
                }else{
                    subject = notice.PREP
                }
            }
        }

        if('DENO' in notice){
            notice.DENO.map( deno => {
                if(deno != ""){
                    if(subject != ""){
                        subject.concat(" ;", deno)
                    }else{
                        subject = deno
                    }
                }
            })
        }

        if('DEPL' in notice){
            if(notice.DEPL != ""){

                if(subject != ""){
                    subject.concat(" ;",notice.DEPL)
                }else{
                    subject = notice.DEPL
                }
            }
        }

        if('SCLE' in notice){
            notice.SCLE.map( scle => {
                if(subject != ""){
                    subject.concat(" ;", scle)
                }else{
                    subject = scle
                }
            })
        }

        if('DATE' in notice){
            notice.DATE.map( date => {
                if(subject != ""){
                    subject.concat(" ;", date)
                }else{
                    subject = date
                }
            })
        }

                
        if('AUTR' in notice){
            notice.AUTR.map( autr => {
                if(autr != ""){
                    if(subject != ""){
                        subject.concat(" ;", autr)
                    }else{
                        subject = autr
                    }
                }
            })
        }

        if('PERS' in notice){
            notice.PERS.map( pers => {
                if(pers != ""){
                    if(subject != ""){
                        subject.concat(" ;", pers)
                    }else{
                        subject = pers
                    }
                    if(creator != ""){
                        creator.concat(" ;", pers)
                    }else{
                        creator = pers
                    }
                }
            })
        }

        if('REG' in notice){
            if(notice.REG != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.REG)
                }else{
                    subject = notice.REG
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.REG)
                }else{
                    coverageSpatial = notice.REG
                }
            }
        } 

        if('DPT_LETTRE' in notice){
            if(notice.DPT_LETTRE != ""){
                if(subject != ""){
                    subject.concat(" ;",notice.DPT_LETTRE)
                }else{
                    subject = notice.DPT_LETTRE
                }
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.DPT_LETTRE)
                }else{
                    coverageSpatial = notice.DPT_LETTRE
                }
            }
        }
 
        if('MANQUANT' in notice){
            notice.MANQUANT.map( manquant => {
                if(manquant != ""){
                    if(subject != ""){
                        subject.concat(" ;", manquant)
                    }else{
                        subject = manquant
                    }
                }
            })
        }

        if(subject != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:subject': subject})
        }

        if(description != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:description': description})
        }

        if('AUTR' in notice){
            notice.AUTR.map( autr => {
                if(autr != ""){
                    if(creator != ""){
                        creator.concat(" ;", autr)
                    }else{
                        creator = autr
                    }
                }
            })
        }

        if(creator != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:creator': creator})
        }

        if('CONTACT' in notice){
            if(notice.CONTACT != ""){
                    elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:source': notice.CONTACT})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:publisher': "Ministère de la Culture"})

        if('SCLE' in notice){
            notice.SCLE.map( scle => {
                if(date != ""){
                    date.concat(" ;", scle)
                }else{
                    date = scle
                }
                if(coverageTemporal != ""){
                    coverageTemporal.concat(" ;",scle)
                }else{
                    coverageTemporal = scle
                }
            })
        }

        if('DATE' in notice){
            notice.DATE.map( date => {
                if(date != ""){
                    date.concat(" ;", date)
                }else{
                    date = date
                }
                if(coverageTemporal != ""){
                    coverageTemporal.concat(" ;",date)
                }else{
                    coverageTemporal = date
                }
            })
        }

        if(date != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:date': date})
        }

        if('PRODUCTEUR' in notice){
            if(notice.PRODUCTEUR != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:contributor': notice.PRODUCTEUR})
            }
        }

        if('COPY' in notice){
            if(notice.COPY != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:rights': notice.COPY})
            }
        }

        if('DIMS' in notice){
            if(notice.DIMS != ""){
                elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:format': notice.DIMS})
            }
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:language': "français"})

        if('CATE' in notice){
            notice.CATE.map( cate => {
                if(cate != ""){
                    if(type != ""){
                        type.concat(" ;", cate)
                    }else{
                        type = cate
                    }
                }
            })
        }

        if('DENO' in notice){
            notice.DENO.map( deno => {
                if(deno != ""){
                    if(type != ""){
                        type.concat(" ;", deno)
                    }else{
                        type = deno
                    }
                }
            })
        }

        if(type != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:type': type})
        }

        elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:identifier': "www.pop.culture.gouv.fr/notice/palissy/" + notice.REF })

        if('WADRS' in notice){
            if(notice.WADRS != ""){
                if(coverageSpatial != ""){
                    coverageSpatial.concat(" ;",notice.WADRS)
                }else{
                    coverageSpatial = notice.WADRS
                }
            }
        }

        if(coverageSpatial != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageSpatial})
        }

        if(coverageTemporal != ""){
            elem.record[1].metadata[0]['oai_dc:dc'].push({'dc:coverage': coverageTemporal})
        }
    }catch(err){
        capture(error)
        return res.status(500).send({ success: false, msg: "Error at createRecordObject: "+error })
    }
}
module.exports = {
    createRecordAutor,
    createRecordJoconde,
    createRecordMemoire,
    createRecordMerimee,
    createRecordMnr,
    createRecordMuseo,
    createRecordPalissy
}