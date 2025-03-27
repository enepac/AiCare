import express from "express";
import { createServer } from "http";
import next from "next";
import { initSocket } from "./socket";

const port = parseInt(process.env.PORT || "4000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);

  initSocket(httpServer);

  server.all("/api/*", (req, res) => handle(req, res));
  server.all("*", (req, res) => handle(req, res));

  httpServer.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`✅ Server ready at http://localhost:${port}`);
  });
});
