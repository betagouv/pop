const noticesNon = db.palissy.find({ CONTIENT_IMAGE: 'non', MEMOIRE: { $gt: { $size: 0 } } }).noCursorTimeout(); // Notices contenant des images avec le filtre contient_image à 'non'
const noticesOui = db.palissy.find({CONTIENT_IMAGE:'oui',MEMOIRE:{$size:0}}).noCursorTimeout(); // Notices ne contenant pas d'images avec le filtre contient_image à 'oui'
const notices = noticesNon.concat(noticesOui);
const nbNotices = notices.length;


if (nbNotices > 0) {
    notices.forEach(notice => {

        if(notice.MEMOIRE.length > 0) { // Si le tableau du champ MEMOIRE contient des images..
            db.palissy.update(
                { REF: notice.REF },
                { $set: { CONTIENT_IMAGE: "oui" } }
            );
        } else {
            db.palissy.update(
                { REF: notice.REF },
                { $set: { CONTIENT_IMAGE: "non" } }
            );
        }

        nbNotices--;
        print(nbNotices + " notices restantes");
    });
}