var groups = []
var producteurs = []

groups.push({"PRODUCTEURS":["MUSEE"],"LABEL":"joconde","__v":0})
groups.push({"PRODUCTEURS":["Inventaire","INV","AUTRE"],"LABEL":"inv","__v":0})
groups.push({"PRODUCTEURS":["CRMH","CAOA","UDAP","État","AUTRE","Monuments Historiques","MAP","Jeu de Paume","Corpus Vitrearum"],"LABEL":"mh","__v":0})
groups.push({"PRODUCTEURS":["AUTRE","MAP"],"LABEL":"memoire","__v":0})
groups.push({"PRODUCTEURS":["Monuments Historiques"],"LABEL":"PM28","__v":0})

producteurs.push({"BASE":[{"base":"joconde","prefixes":[]}],"LABEL":"MUSEE","__v":0})
producteurs.push({"BASE":[{"base":"mnr","prefixes":[]}],"LABEL":"MNR","__v":0})
producteurs.push({"BASE":[{"base":"autor","prefixes":["OR"]},{"base":"merimee","prefixes":["IA"]},{"base":"palissy","prefixes":["IM"]}],"LABEL":"Inventaire","__v":0})
producteurs.push({"BASE":[{"base":"memoire","prefixes":["AR"]}],"LABEL":"ARCH","__v":0})
producteurs.push({"BASE":[{"base":"memoire","prefixes":["MH"]}],"LABEL":"CRMH","__v":0})
producteurs.push({"BASE":[{"base":"memoire","prefixes":["OA"]}],"LABEL":"CAOA","__v":0})
producteurs.push({"BASE":[{"base":"memoire","prefixes":["AP"]}],"LABEL":"UDAP","__v":0})
producteurs.push({"BASE":[{"base":"palissy","prefixes":["EM"]},{"base":"merimee","prefixes":["EA"]}],"LABEL":"État","__v":0})
producteurs.push({"BASE":[{"base":"memoire","prefixes":["IVN","IVR","IVD","IVC"]}],"LABEL":"INV","__v":0})
producteurs.push({"BASE":[{"base":"palissy","prefixes":["PM"]},{"base":"merimee","prefixes":["PA"]}],"LABEL":"Monuments Historiques","__v":0})
producteurs.push({"BASE":[{"base":"memoire","prefixes":[]},{"base":"autor","prefixes":["AW","AA","AC","AB"]}],"LABEL":"MAP","__v":0})
producteurs.push({"BASE":[{"base":"memoire","prefixes":[]},{"base":"palissy","prefixes":[]},{"base":"merimee","prefixes":[]}],"LABEL":"AUTRE","__v":0})
producteurs.push({"BASE":[{"base":"palissy","prefixes":["JDP"]},{"base":"merimee","prefixes":["SJDP"]},{"base":"memoire","prefixes":["AJDP"]}],"LABEL":"Jeu de Paume","__v":0})
producteurs.push({"BASE":[{"base":"autor","prefixes":["MV"]}],"LABEL":"Corpus Vitrearum","__v":0})

groups.forEach(function( gr ){ 
	db.groups.insert(gr)
})

producteurs.forEach(function( prod ){ 
	db.producteurs.insert(prod)
})