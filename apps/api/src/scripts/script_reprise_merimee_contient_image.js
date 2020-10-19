let notices = db.merimee.find({ MEMOIRE: { $gt: { $size: 0 } } }).noCursorTimeout().toArray(); 
let nbNotices = notices.length;

if (nbNotices > 0) {
    notices.forEach(notice => {
        let contient = "non";
        // Pour la valeur contient_image = oui, il faut au moins une url de renseignée dans la liste des notices mémoire.
        if(notice.MEMOIRE.some(m => m.url != '')){
            contient = "oui";
        }

        db.merimee.update(
            { REF: notice.REF },
            { $set: { CONTIENT_IMAGE: contient } }
        );

        nbNotices--;
        if(nbNotices % 1000 === 0){
            print(nbNotices + " notices restantes");
        }
        
    });
}