// File: /workspaces/aicare/aicare-app/socket.ts

import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | null = null;

/**
 * Initialize Socket.IO with the given HTTP server
 */
export function initSocket(server: HttpServer) {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*" // or an array of allowed origins
    }
  });

  // Here you can define global event listeners
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinConversation", (threadId: string) => {
      socket.join(`thread_${threadId}`);
      console.log(`${socket.id} joined room: thread_${threadId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

/**
 * Retrieve the existing Socket.IO server instance
 */
export function getIO(): SocketIOServer {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}
