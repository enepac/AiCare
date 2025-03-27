import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

declare global {
  // eslint-disable-next-line no-var
  var io: Server | undefined;
}

export const initSocket = (server: HttpServer) => {
  if (!global.io) {
    global.io = new Server(server, {
      path: "/api/socketio",
      cors: {
        origin: process.env.NEXTAUTH_URL || "http://localhost:4000",
        methods: ["GET", "POST"]
      }
    });

    global.io.on("connection", (socket: Socket) => {
      console.log(`✅ Socket connected: ${socket.id}`);

      socket.on("join_thread", (threadId: string) => {
        socket.join(threadId);
        console.log(`➡️ Joined thread: ${threadId}`);
      });

      socket.on("leave_thread", (threadId: string) => {
        socket.leave(threadId);
        console.log(`⬅️ Left thread: ${threadId}`);
      });

      socket.on("disconnect", () => {
        console.log(`❌ Socket disconnected: ${socket.id}`);
      });
    });

    console.log("✅ Socket.IO initialized at path /api/socketio");
  }
};

export const getIO = () => {
  if (!global.io) {
    throw new Error("❌ Socket.IO not initialized!");
  }
  return global.io;
};
