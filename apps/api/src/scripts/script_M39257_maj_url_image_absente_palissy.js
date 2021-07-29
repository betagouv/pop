notices = db.palissy.find( { MEMOIRE: { $gt: { $size: 0 }  } } );
nbreNotices = notices.count();

let nbrN = 0
let arrayMemoire = [];

print(nbreNotices);
 
notices.forEach(notice => {
  arrayMemoire = notice.MEMOIRE.map((element) => {
        if(element.url == ''){
            var noticeMemoire = db.memoire.find({ REF: element.ref });
            
            noticeMemoire.forEach((el) => {
                if(el.IMG &&  el.IMG != ''){
                element.url = el.IMG;
                nbrN++
                print(nbrN + " notices");
                }
            });
        }
        return element;
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