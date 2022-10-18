const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
