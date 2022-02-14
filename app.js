const express = require("express");

const app = express();

app.use(express.static("public"))
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).sendFile(`${__dirname}/views/index.html`);
})


app.listen(process.env.PORT || 5000, (err) => {
    if(err) console.err(err);
    console.log("Server is launched succesfully and ready for incoming requests");
})