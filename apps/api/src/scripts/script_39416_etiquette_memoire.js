notices = db.memoire.find().noCursorTimeout();

nbreNotices = notices.count();
print(nbreNotices);

notices.forEach(notice => {    
    db.memoire.update(
        { REF : notice.REF },
        {
            $rename : {
                TECH : "TECHN",
                NUMG : "NEGPOS",
                NUMCAF  : "NUMVERS",
                TOILE : "CINEPROD",
                ADRS : "WADRS",
                ACC: "PLOC",
                COSTUME: "DPT_LETTRE"
            }
        }
    )
    nbreNotices--;
    print(nbreNotices + " notices restantes");
});