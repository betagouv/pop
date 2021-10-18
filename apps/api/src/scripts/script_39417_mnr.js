notices = db.mnr.find().noCursorTimeout();

nbreNotices = notices.count();
print(nbreNotices);

notices.forEach(notice => {    
    db.mnr.update(
        { REF : notice.REF },
        {
            $rename : {
                HIST5 : "SALLES",
                HIST6 : "CARTELS",
                CATE_DEPREC : "RCL",
                TOUT :"NET"
            }
        }
    )
    nbreNotices--;
    print(nbreNotices + " notices restantes");
});