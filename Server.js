import express from "express";

const app = express()

app.get("/", (req, res) => {
    res.json("Mi biblioteca");
});


app.listen(9000, () => {
    console.log("connected to server, port 9000")
});

