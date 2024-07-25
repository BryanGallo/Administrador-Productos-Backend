import express from "express";

const server = express();

server.get("/", (req, res) => {
    res.send("Hola desde Express");
});

export default server;
