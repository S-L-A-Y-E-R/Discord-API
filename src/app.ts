import express from "express";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";

const app = express();

//Limit data incoming from the request body
app.use(express.json());

//serving static files
app.use(express.static(path.join(__dirname, "public")));

//Enable outsource proxies
app.set("trust proxy", true);

//Allow cors for all domains
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//Set security http headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

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

// Handle requests from wrong urls
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Using global error handling middleware
app.use(globalErrorHandler);

export default app;
