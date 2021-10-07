let notices = db.memoire.find( {  PRODUCTEUR: "MAP", $and: [ { COPY: { $gt: "" } }, { COPY: { $not: { $regex: "©" } } } ]  }  ).noCursorTimeout();
let nbreNotices = notices.count();

print(nbreNotices);

notices.forEach(element => {
    db.memoire.update(
        { REF : element.REF },
        {
            $set : {
                COPY : "© " + element.COPY
            }
        }
    )
    nbreNotices--;
    print(nbreNotices + "notices restantes");
});
