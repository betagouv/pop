function formattedNow() {
  const now = new Date();
  return (
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2)
  );
}

function formatDate(d = new Date()) {
  var months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "decembre"
  ];
  const date = ("0" + d.getDate()).slice(-2);
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const minutes = ("0" + d.getMinutes()).slice(-2);
  const hours = ("0" + d.getHours()).slice(-2);

  return `${date} ${month} ${year}, ${hours}h${minutes}`;
}

module.exports = {
  formattedNow,
  formatDate
};
