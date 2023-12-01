import { Server } from "socket.io";
import { Socket } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import * as http from "http";

const configureSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: ["*"],
      credentials: true,
    },
  });

  instrument(io, {
    auth: false,
    mode: "development",
  });

  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

export default configureSocket;
