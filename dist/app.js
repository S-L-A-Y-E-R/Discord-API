"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_1 = __importDefault(require("xss"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const serverRoutes_1 = __importDefault(require("./routes/serverRoutes"));
const memberRoutes_1 = __importDefault(require("./routes/memberRoutes"));
const channelRoutes_1 = __importDefault(require("./routes/channelRoutes"));
const conversationRoutes_1 = __importDefault(require("./routes/conversationRoutes"));
const socketIo_1 = __importDefault(require("./utils/socketIo"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const directMessagesRoutes_1 = __importDefault(require("./routes/directMessagesRoutes"));
const app = (0, express_1.default)();
exports.app = app;
// Socket.io setup
const server = (0, http_1.createServer)(app);
exports.server = server;
const io = (0, socketIo_1.default)(server);
app.use((req, res, next) => {
    req.io = io;
    return next();
});
//Set security http headers
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
//Limit data incoming from the request body
app.use(express_1.default.json());
//serving static files
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
//Enable outsource proxies
app.set("trust proxy", true);
//Allow cors for all domains
app.use((0, cors_1.default)({
    origin: ["https://admin.socket.io", "http://localhost:3000"],
    credentials: true,
}));
//Use morgan logger in the develpment
if (process.env.NODE_ENV === "development")
    app.use((0, morgan_1.default)("dev"));
//Data sanitization agains noSQL query injection
app.use((0, express_mongo_sanitize_1.default)());
//Data sanitization against xss attacks
(0, xss_1.default)('<script>alert("xss");</script>');
//Parse and manipulate cookies
app.use((0, cookie_parser_1.default)());
//Compress all text sent in the response to the client
if (process.env.NODE_ENV === "production") {
    app.use((0, compression_1.default)());
}
//Global resources
app.use("/api/v1/profiles", profileRoutes_1.default);
app.use("/api/v1/servers", serverRoutes_1.default);
app.use("/api/v1/members", memberRoutes_1.default);
app.use("/api/v1/channels", channelRoutes_1.default);
app.use("/api/v1/conversations", conversationRoutes_1.default);
app.use("/api/v1/messages", messageRoutes_1.default);
app.use("/api/v1/direct-messages", directMessagesRoutes_1.default);
// Handle requests from wrong urls
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
//Using global error handling middleware
app.use(errorController_1.default);
//Socket connection route
app.use("/api/v1/socket", (req, res) => {
    res.status(200).json({ message: "Socket.io connection route" });
});
