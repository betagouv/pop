# New Document


## Liste des groupes

- admin
- mnr
- joconde
- mh
- inv
- memoire
- enluminures
- museo



## Liste des roles 

- administrateur
- producteur
- utilisateur


## Comportement à l'import

Une seule page d'import est accessible par groupe. 

Exemple : Les utilisateurs du groupe joconde ne voient que l'import joconde qui permet d'importer plusieurs types de fichier
Seule les utilisateurs du groupe admin voient tous les imports


## ACL

A noter : le groupe ADMIN a tous les droits CRUD sur toutes les notices

### Périmètre : notices joconde
|   |Read|Create|Update|Delete|
|---|---|---|---|---|
|administrateur du groupe Joconde|X|X|X|X|
|producteur du groupe Joconde|X|X|X|X|
|utilisateur du groupe Joconde|X|   |   |   |
|autres|X|   |   |   |

### Périmètre : notices mnr
|   |Read|Create|Update|Delete|
|---|---|---|---|---|
|administrateur du groupe mnr|X|X|X|X|
|producteur du groupe mnr|X|X|X|X|
|utilisateur du groupe mnr|X|   |   |   |
|autres|X|   |   |   |

### Périmètre : notices enluminures
|   |Read|Create|Update|Delete|
|---|---|---|---|---|
|administrateur du groupe enluminures|X|X|X|X|
|producteur du groupe enluminures|X|X|X|X|
|utilisateur du groupe enluminures|X|   |   |   |
|autres|X|   |   |   |

### Périmètre : notices museo
|   |Read|Create|Update|Delete|
|---|---|---|---|---|
|administrateur du groupe museo|X|X|X|X|
|producteur du groupe museo|X|X|X|X|
|utilisateur du groupe museo|X|   |   |   |
|autres|X|   |   |   |

### Périmètre : notices memoire dont le producteur est MAP et Autre
|   |Read|Create|Update|Delete|
|---|---|---|---|---|
|administrateur du groupe memoire|X|X|X|X|
|producteur du groupe memoire|X|X|X|X|
|utilisateur du groupe memoire|X|   |   |   |
|autres|X|   |   |   |

### Périmètre : notices memoire dont le producteur est CRMH, CAOA, UDAP, ETAT, AUTRE, MAP
|   |Read|Create|Update|Delete|
|---|---|---|---|---|
|administrateur du groupe mh|X|X|X|X|
|producteur du groupe mh|X|X|X|X|
|utilisateur du groupe mh|X|   |   |   |
|autres|X|   |   |   |

### Périmètre : notices Palissy et Merimee dont le producteur est Monuments Historiques,Etat,Autre
|   |Read|Create|Update|Delete|
|---|---|---|---|---|
|administrateur du groupe mh|X|X|X|X|
|producteur du groupe mh|X|X|X|X|
|utilisateur du groupe mh|X|   |   |   |
|autres|X|   |   |   |

### Périmètre : notices Palissy et Merimee dont le producteur est Inventaire,Autre
|   |Read|Create|Update|Delete|
|---|---|---|---|---|
|administrateur du groupe inv|X|X|X|X|
|producteur du groupe inv|X|X|X|X|
|utilisateur du groupe inv|X|   |   |   |
|autres|X|   |   |   |

