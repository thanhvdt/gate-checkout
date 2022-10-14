import express from "express";
import http from "http";
import fs from "fs";
import { router } from "./routes/routes.js";

const app = express();
const port = process.env.PORT || 8888;

const server = http.createServer(app);

app.use(express.json());
app.use(router);

server.listen(port, () => {
	console.log(`🚀 Server is running on port ${port} ...`);
});

process.on("SIGINT", () => {
	console.log("🤖 Server closed");
});
 