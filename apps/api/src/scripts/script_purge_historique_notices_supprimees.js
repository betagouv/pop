/* 
* Le script purge les notices de la collection en fonction de l'email
*/
print(db.deletehistoriques.find({ EMAIL: "baptiste.mercier@soprasteria.com" } ).noCursorTimeout().toArray().length);

db.deletehistoriques.remove({ EMAIL: "baptiste.mercier@soprasteria.com" });

print(db.deletehistoriques.find({ EMAIL: "baptiste.mercier@soprasteria.com" } ).noCursorTimeout().toArray().length);


