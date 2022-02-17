const express = require("express");
const cors = require("cors");
const Link = require("./module/objects.js");

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

app.get("/links", (req, res) => {
  res.json(objects);
});

app.post("/links", (req, res) => {
  if(req.body) {
    const {author, title, url } = req.body;
    objects.push(new Link(author, title, url));
  }
  res.status(200).json({"ok": true})
})

app.listen(process.env.PORT || 5000, (err) => {
  if (err) console.err(err);
  console.log("Server is launched succesfully and ready for incoming requests");
});
