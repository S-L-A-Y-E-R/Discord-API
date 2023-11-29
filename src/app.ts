import express from "express";
import path from "path";
import { createServer } from "http";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import profileRoutes from "./routes/profileRoutes";
import serverRoutes from "./routes/serverRoutes";
import memberRoutes from "./routes/memberRoutes";
import channelRoutes from "./routes/channelRoutes";
import conversationRoutes from "./routes/conversationRoutes";
import configureSocket from "./utils/socketIo";
import messageRoutes from "./routes/messageRoutes";
import directMessages from "./routes/directMessagesRoutes";

const app = express();

// Socket.io setup
const server = createServer(app);
const io = configureSocket(server);
app.use((req: any, res, next) => {
  req.io = io;
  return next();
});

//Set security http headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//Limit data incoming from the request body
app.use(express.json());

//serving static files
app.use(express.static(path.join(__dirname, "public")));

//Enable outsource proxies
app.set("trust proxy", true);

//Allow cors for all domains
app.use(
  cors({
    origin: ["https://admin.socket.io", "http://localhost:3000"],
    credentials: true,
  })
);

//Use morgan logger in the develpment
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Data sanitization agains noSQL query injection
app.use(mongoSanitize());

//Data sanitization against xss attacks
xss('<script>alert("xss");</script>');

//Parse and manipulate cookies
app.use(cookieParser());

//Compress all text sent in the response to the client
if (process.env.NODE_ENV === "production") {
  app.use(compression());
}

//Global resources
app.use("/api/v1/profiles", profileRoutes);
app.use("/api/v1/servers", serverRoutes);
app.use("/api/v1/members", memberRoutes);
app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/direct-messages", directMessages);

// Handle requests from wrong urls
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Using global error handling middleware
app.use(globalErrorHandler);

//Socket connection route
app.use("/api/v1/socket", (req, res) => {
  res.status(200).json({ message: "Socket.io connection route" });
});

export { app, server };
