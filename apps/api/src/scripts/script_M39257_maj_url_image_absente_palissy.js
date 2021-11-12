notices = db.palissy.find( { MEMOIRE: { $gt: { $size: 0 }  } } );
nbreNotices = notices.count();

let nbrN = 0

print(nbreNotices);
 
notices.forEach(notice => {
    let arrayMemoire = notice.MEMOIRE.map((element) => {
        if(element){
        var noticeMemoire = db.memoire.findOne({ REF: element.ref });
        let memoire = {};
        if(noticeMemoire){
            memoire._id = noticeMemoire._id;
            memoire.ref = noticeMemoire.REF;
            memoire.url = noticeMemoire.IMG;
            memoire.copy = noticeMemoire.COPY;
            memoire.name = noticeMemoire.LEG;

            nbrN++
            print(nbrN + " notices");
            print(notice.REF);

            return memoire;
        }
    }
        
    });

    db.palissy.update(
        { REF : notice.REF },
        {
            $set : {
                MEMOIRE : arrayMemoire
            }
        }
    )
});