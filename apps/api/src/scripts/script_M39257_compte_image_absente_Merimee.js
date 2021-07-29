notices = db.merimee.find( { MEMOIRE: { $gt: { $size: 0 }  } } );
nbreNotices = notices.count();

let nbrN = 0
 
notices.forEach(notice => {
    let arrayMemoire = notice.MEMOIRE.map((element) => {
        if(element.url == ''){
            var noticeMemoire = db.memoire.find({ REF: element.ref });
            
            noticeMemoire.forEach((el) => {
                if(el.IMG &&  el.IMG != ''){
                // element.URL = noticeMemoire.IMG;
                printjson(el.IMG);
                printjson(notice.REF);
                nbrN++
                print(nbrN + " notices");
                }
            });
        }
        return element;
    });
});