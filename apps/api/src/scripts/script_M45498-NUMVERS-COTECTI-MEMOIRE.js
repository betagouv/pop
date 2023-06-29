notices = db.memoire.find( { $and :[{ PRODUCTEUR: { $regex: /MPP/ } }, { NUMVERS: { $eq: "1996/96" } } ]} ).noCursorTimeout();
nbreNotices = notices.count();

print(nbreNotices);

notices.forEach(notice => {
    let newNumvers = `J/${notice.NUMVERS}`;
    let list = notice.COTECTI.split(";").map((el) => {
        let arrayCotecti = el.trim().split('/').map((element, index, { length }) => { 
            if(index === length - 1) {
                // Suppression des 0 sur la dernière valeur
                element = String(element).replace(new RegExp(/0/g), "");
            }
            return element;
         } )
        return `J/${arrayCotecti.join("/")}`;
    }).join(" ; ");
    
    db.memoire.update(
        { REF : notice.REF },
        {
            $set : {
                NUMVERS : newNumvers,
                COTECTI: list
            }
        }
    );
    nbreNotices--;
    print(nbreNotices + " notices restantes");
});


