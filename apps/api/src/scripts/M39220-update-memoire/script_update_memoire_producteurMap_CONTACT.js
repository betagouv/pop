let notices = db.memoire.find( { PRODUCTEUR: "MAP" } ).noCursorTimeout();
let nbreNotices = notices.count();

print(nbreNotices);

notices.forEach(element => {
    db.memoire.update(
        { REF : element.REF },
        {
            $set : {
                CONTACT : "mediatheque.patrimoine@culture.gouv.fr"
            }
        }
    )
    nbreNotices--;
    print(nbreNotices + "notices restantes");
});