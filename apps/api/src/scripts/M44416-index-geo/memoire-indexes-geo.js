notices = db.memoire.find().noCursorTimeout();
nbreNotices = notices.count();

print(nbreNotices);

notices.forEach(element => {
    db.memoire.update(
        { REF : element.REF },
        {
            $set : {
                POP_COORDONNEES : {
                    lat: 0,
                    lon: 0
                },
                POP_CONTIENT_GEOLOCALISATION: 'non'
            }
        }
    )
    nbreNotices--;
    print(nbreNotices + "notices restantes");
});