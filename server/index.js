const express = require("express");
const app = express();
const http = require('http'); // exist in all nodejs apps
const cors = require('cors'); //library

app.use(cors());
const server = http.createServer(app);

server.listen(3001, () => {
    console.log("SERVER RUNNING");
})