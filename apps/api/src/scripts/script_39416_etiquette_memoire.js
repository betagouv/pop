notices = db.memoire.find().noCursorTimeout();

nbreNotices = notices.count();
print(nbreNotices);

notices.forEach(notice => {    
    db.memoire.update(
        { REF : notice.REF },
        {
            $set : {
                TECHN : notice.TECH,
                NEGPOS : notice.NUMG,
                NUMVERS  : notice.NUMCAF,
                CINEPROD : notice.TOILE,
                ADRS : notice.WADRS,
                ACC : notice.PLOC,
                COSTUME : notice.DPT_LETTRE,

            },
            $unset : {
                TECH : "",
                NUMG : "",
                NUMCAF : "",
                TOILE : "",
                WADRS : "",
                PLOC : "",
                DPT_LETTRE : ""
            }
        }
    )
});