function formattedNow() {
  const now = new Date();
  return (formattedNow =
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2));
}

module.exports = {
  formattedNow
};
