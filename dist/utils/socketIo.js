"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const admin_ui_1 = require("@socket.io/admin-ui");
const configureSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: ["https://admin.socket.io", "http://localhost:3000"],
            credentials: true,
        },
    });
    (0, admin_ui_1.instrument)(io, {
        auth: false,
        mode: "development",
    });
    io.on("connection", (socket) => {
        console.log("A user connected");
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
    return io;
};
exports.default = configureSocket;
