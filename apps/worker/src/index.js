const express = require("express");

const PORT = 8081;

const app = express();

app.get("/", (req, res) => {
  res.send("Server Running\n");
});

app.post("/", (req, res) => {
  console.log("Message");
  res.send("Message received\n");
});

app.post("/sitemap", (req, res) => {
  console.log("sitemap");
  res.send("sitemap\n");
});

app.listen(PORT, () => console.log("Listening on port " + PORT));

console.log("RUN", new Date());
