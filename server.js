"use strict";

// Jani Haiko, 2021

import http from "http";
import https from "https";
import fs from "fs";
import express from "express";

const app = express();

const url = "www.example.com"

app.all("/redirect", (req, res) => {
    res.redirect(307, `${req.protocol}://${url}?${new URLSearchParams(new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`).search).toString()}`);
});

http.createServer(app).listen(80);
https.createServer({
    key: fs.readFileSync("./key.key", "UTF-8"),
    cert: fs.readFileSync("./cert.crt", "UTF-8")
}, app).listen(443);