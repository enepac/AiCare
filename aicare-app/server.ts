import next from "next";
import express, { Request, Response, RequestHandler } from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import "dotenv/config"; // Ensure envs are loaded

import { initSocket, getIO } from "./socket";
import { dbConnect } from "@/utils/db";
import Conversation from "@/models/conversation";

const dev = process.env.NODE_ENV !== "production";
const port = 4000;

const app = next({ dev });
const handle = app.getRequestHandler();

// Only used for the chatbot messages route
const postThreadMessages: RequestHandler = async (req: Request, res: Response) => {
  try {
    await dbConnect();

    const threadId = req.params.threadId;
    const { sender, content } = req.body;

    if (!sender || !content) {
      res.status(400).json({ error: "Missing sender or content" });
      return;
    }
    if (!["user", "ai"].includes(sender)) {
      res.status(400).json({ error: 'Sender must be "user" or "ai"' });
      return;
    }

    const conversation = await Conversation.findOne({ _id: threadId });
    if (!conversation) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    // Add user message
    const userMsg = {
      sender,
      content,
      timestamp: new Date()
    };
    conversation.messages.push(userMsg);
    await conversation.save();

    // Broadcast via Socket.IO
    const io = getIO();
    io.to(`thread_${threadId}`).emit("newMessage", {
      ...userMsg,
      _id: conversation.messages[conversation.messages.length - 1]._id
    });

    // Return updated conversation
    res.status(200).json({ conversation });
  } catch (err) {
    console.error("Error in POST /api/chatbot/threads/:threadId/messages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);

  // Initialize Socket.IO
  initSocket(server);

  // Apply bodyParser **only** to the chatbot route
  expressApp.post("/api/chatbot/threads/:threadId/messages", bodyParser.json(), postThreadMessages);

  // Delegate all other requests to Next.js (handles NextAuth, etc.)
  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`> Custom server ready on http://localhost:${port}`);
  });
});
