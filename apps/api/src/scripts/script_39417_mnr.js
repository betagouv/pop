notices = db.mnr.find().noCursorTimeout();

nbreNotices = notices.count();
print(nbreNotices);

notices.forEach(notice => {    
    db.mnr.update(
        { REF : notice.REF },
        {
            $set : {
                SALLES : notice.HIST5,
                CARTELS : notice.HIST6,
                RCL : notice.CATE_DEPREC,
                NET : notice.TOUT
            },
            $unset : {
                HIST5 : "",
                HIST6 : "",
                CATE_DEPREC : "",
                TOUT : ""
            }
        }
    )
});