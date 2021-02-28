const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const connectDB = require("./config/connection");
const indexRouter = require("./routes/indexRoutes");
const stockRouter = require("./routes/stockRoutes");

connectDB();
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", () => {
  console.log("a user connected");
});

app.set("socketio", io);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const rootFolder = "/bse-sensex";
const fullPath = __dirname.substring(0, __dirname.indexOf(rootFolder) + rootFolder.length);
const distPath = path.join(fullPath + "/dist/bse-sensex/");
app.use(express.static(distPath));

app.use("/api", stockRouter);
app.use(indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = { app: app, server: server };
