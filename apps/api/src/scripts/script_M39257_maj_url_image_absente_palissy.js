notices = db.palissy.find( { MEMOIRE: { $gt: { $size: 0 }  } } );
nbreNotices = notices.count();

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

                return memoire;
            }
        }  
    }).filter(val => val);

    print(nbreNotices-- + " notices restantes");

    db.palissy.update(
        { REF : notice.REF },
        {
            $set : {
                MEMOIRE : arrayMemoire
            }
        }
    )
});