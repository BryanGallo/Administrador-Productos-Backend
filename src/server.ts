import express from "express";
import router from "./routes/router";

const server = express();

server.use("/api/products", router);

export default server;
