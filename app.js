const express = require("express");
const cors = require("cors");
const Link = require("./objects.js");

const app = express();

const objects = [new Link("Some guy", "Wikipedia", "https://wikipedia.org")];

app.use(express.static("public"));
app.use(express.json());
app.use(cors({
  origin: '*'
}))


app.get("/", (req, res) => {
  res.status(200).sendFile(`${__dirname}/views/index.html`);
});

app.get("/links", cors(), (req, res) => {
  res.json(objects);
});

app.listen(process.env.PORT || 5000, (err) => {
  if (err) console.err(err);
  console.log("Server is launched succesfully and ready for incoming requests");
});
