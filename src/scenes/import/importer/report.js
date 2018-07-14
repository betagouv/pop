import React from 'react';

class Report {
    generate(notices) {

        console.log('notices', notices)

        const arr = [];

        const d = new Date();
        var months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "decembre"];
        const date = ('0' + d.getDate()).slice(-2);
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        const minutes = ('0' + d.getMinutes()).slice(-2);
        const hours = ('0' + d.getHours()).slice(-2);

        const created = notices.filter(e => e.status === 'created');
        const updated = notices.filter(e => e.status === 'updated');

        arr.push(`<h1>Rapport de chargement Joconde du ${date} ${month} ${year}, ${hours}h${minutes}</h1>`)
        arr.push(`<h2>Établissement: TODO </h2>`)
        arr.push(`<h2>Contact: TODO</h2>`)
        arr.push(`<p>Nombre de notices chargées: ${notices.length}</p>`)
        arr.push(`<ul>`)
        arr.push(`<li>${notices.length} notices valides</li>`)
        arr.push(`<li>${created.length} notices crées</li>`)
        arr.push(`<li>${updated.length} notices mises à jour</li>`)
        arr.push(`<li>${0} notices rejetées</li>`)
        arr.push(`</ul>`)
        arr.push(`<p>Nombre d'images chargées: TODO</p>`)


        arr.push(`<h1>Notices créees</h1>`)

        const createdNoticeFormated = created.map(({ notice }) => [notice.REF, notice.INV])
        // arr.push(...getTable(createdNoticeFormated, ""))
        arr.push(`<h1>Notices modifiées</h1>`)
        arr.push(`<h1>Notices rejetées</h1>`)

        const status = {
            'updated': 'Modification',
            'created': 'Création',
        }

        for (var i = 0; i < notices.length; i++) {

            if (notices[i].status !== 'unchanged') {
                arr.push(this.getNewLine(notices[i].notice.REF, notices[i].notice.INV, status[notices[i].status], 'green', 'A definir', 'A definir'));
            }
            // for (var j = 0; j < notices[i].errors.length; j++) {

            // }
            for (var j = 0; j < notices[i].warnings.length; j++) {
                arr.push(this.getNewLine(notices[i].notice.REF, notices[i].notice.INV, 'Avertissement', 'orange', 'A definir', notices[i].warnings[j].text));
            }
        }

        return arr.join('');
    }

    getNewLine(ref, inv, status, color, champ, details) {
        const arr = [];
        arr.push(`<tr>`)
        arr.push(`<td style="font-family:Arial, Helvetica, sans-serif; padding: 10px; font-size:14px;border:1px solid black;">${ref}</td>`)
        arr.push(`<td style="font-family:Arial, Helvetica, sans-serif; padding: 10px; font-size:14px;border:1px solid black;">${inv}</td>`)
        arr.push(`<td style="font-family:Arial, Helvetica, sans-serif; padding: 10px; font-size:14px;border:1px solid black; background-color:${color}">${status}</td>`)
        arr.push(`<td style="font-family:Arial, Helvetica, sans-serif; padding: 10px; font-size:14px;border:1px solid black;">${champ}</td>`)
        arr.push(`<td style="font-family:Arial, Helvetica, sans-serif; padding: 10px; font-size:14px;border:1px solid black;">${details}</td>`)
        arr.push(`</tr > `)
        return arr.join('');
    }
}

function getTable(objs) {
    if (!objs.length) { return <div /> }
    const arr = [];
    arr.push(`<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">`)
    arr.push(`<tr>`)
    arr.push(...Object.keys(obj))
    arr.push(`</tr>`)

    // arr.push(`<th style="font-family:Arial, Helvetica, sans-serif; font-size:14px;border:1px solid black;">Identifiant Joconde</th>`)
    // arr.push(`<th style="font-family:Arial, Helvetica, sans-serif; font-size:14px;border:1px solid black;">N° inventaire</th>`)
    // arr.push(`<th style="font-family:Arial, Helvetica, sans-serif; font-size:14px;border:1px solid black;">État</th>`)
    // arr.push(`<th style="font-family:Arial, Helvetica, sans-serif; font-size:14px;border:1px solid black;">Champ</th>`)
    // arr.push(`<th style="font-family:Arial, Helvetica, sans-serif; font-size:14px;border:1px solid black;">Détails</th>`)

    arr.push(`</table >`);
    return arr;
}

const d = new Report();
export default d;
