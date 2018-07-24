class Report {
    generate(notices, collection) {

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
        const rejected = notices.filter(e => e.status === 'rejected');

        const imagesNumber = notices.reduce((acc, val) => {
            if (val.status === 'created' || val.status === 'updated') {
                return acc + val.images.length;
            }
            return acc;
        }, 0);

        arr.push(`<h1>Rapport de chargement ${collection} du ${date} ${month} ${year}, ${hours}h${minutes}</h1>`)
        arr.push(`<h2>Établissement: X</h2>`)
        arr.push(`<h2>Contact: X</h2>`)
        arr.push(`<p>Nombre de notices chargées: ${notices.length}</p>`)
        arr.push(`<ul>`)
        arr.push(`<li>${created.length + updated.length} notices valides</li>`)
        arr.push(`<li>${created.length} notices crées</li>`)
        arr.push(`<li>${updated.length} notices mises à jour</li>`)
        arr.push(`<li>${rejected.length} notices rejetées</li>`)
        arr.push(`</ul>`)
        arr.push(`<p>Nombre d'images chargées: ${imagesNumber}</p>`)

        arr.push(`<h1>Notices créees</h1>`)
        {
            const columns = ["Identifiant Joconde", "N° inventaire", "Etat", "Details"];
            const lines = []
            for (var i = 0; i < created.length; i++) {
                lines.push([created[i].notice.REF, created[i].notice.INV, 'Création', ''])
                for (var j = 0; j < created[i].warnings.length; j++) {
                    lines.push([created[i].notice.REF, created[i].notice.INV, 'Avertissement', created[i].warnings[j]])
                }
            }
            const table = createHTMLTable(columns, lines);
            arr.push(...table);
        }
        {
            arr.push(`<h1>Notices modifiées</h1>`)
            const columns = ["Identifiant Joconde", "N° inventaire", "Etat", "Details"];
            const lines = []
            for (var i = 0; i < updated.length; i++) {
                lines.push([updated[i].notice.REF, updated[i].notice.INV, 'Modification', ''])
                for (var j = 0; j < updated[i].warnings.length; j++) {
                    lines.push([updated[i].notice.REF, updated[i].notice.INV, 'Avertissement', updated[i].warnings[j]])
                }
            }
            const table = createHTMLTable(columns, lines);
            arr.push(...table);
        }
        {
            arr.push(`<h1>Notices rejetées</h1>`)
            const columns = ["Identifiant Joconde", "N° inventaire", "Etat", "Details"];
            const lines = []
            for (var i = 0; i < rejected.length; i++) {
                lines.push([rejected[i].notice.REF, rejected[i].notice.INV, 'Rejet', '']);
                for (var j = 0; j < rejected[i].warnings.length; j++) {
                    lines.push([rejected[i].notice.REF, rejected[i].notice.INV, 'Avertissement', rejected[i].warnings[j]])
                }
                for (var j = 0; j < rejected[i].errors.length; j++) {
                    lines.push([rejected[i].notice.REF, rejected[i].notice.INV, 'Erreur', rejected[i].errors[j]])
                }
            }
            const table = createHTMLTable(columns, lines);
            arr.push(...table);
        }
        return arr.join('');
    }

}

function createHTMLTable(columns, objs) {
    if (!objs.length) { return ['<div >Aucune</div>'] }
    const arr = [];
    arr.push(`<table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">`)
    arr.push(`<tr>`)
    arr.push(...columns.map(e => `<th style="font-family:Arial, Helvetica, sans-serif; font-size:14px;border:1px solid black;">${e}</th>`));
    arr.push(`</tr>`)
    arr.push(...objs.map(line => {
        const arr2 = [];
        arr2.push('<tr>')
        arr2.push(line.map(d => `<td style="font-family:Arial, Helvetica, sans-serif; padding: 10px; font-size:14px;border:1px solid black;">${d}</td>`).join(''))
        arr2.push('</tr>')
        return arr2.join('')
    }));
    arr.push(`</table > `);
    return arr;
}

const d = new Report();
export default d;
