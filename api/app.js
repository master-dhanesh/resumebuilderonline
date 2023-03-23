require("dotenv").config({ path: "./.env" });
const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");

// database connection
require("./models/database").databaseconnection();

// cors config
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
// logging
const logger = require("morgan");
app.use(logger("tiny"));
// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// sessions and cookies
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(cookieparser());
// express fileuploader
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// routes
const indexRoute = require("./routes/indexRoutes");
app.use("/", indexRoute);

// error handler
const ErrorHandler = require("./utils/ErrorHandler");
const { createErrors } = require("./middleware/errors");
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Request URL ${req.path} not found`, 404));
});
app.use(createErrors);

// --------------------------------socket
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
    },
});
let users = [];
let connections = [];
let messages = [];
io.on("connection", (socket) => {
    connections.push(socket);
    console.log(`Connected: ${connections.length} sockets connected`);

    // New User
    socket.on("new user", (data) => {
        socket.username = data;
        users.push(socket.username);
        io.emit("get users", users);
    });

    // Send Message
    socket.on("send message", (data) => {
        // code to save messages in db
        messages.push({ msg: data, user: socket.username });
        io.emit("new message", messages);
    });

    // disconnect
    socket.on("disconnect", (data) => {
        users.splice(connections.indexOf(socket), 1);
        io.emit("get users", users);
        connections.splice(connections.indexOf(socket.username), 1);
        console.log(`Disconnected: ${connections.length} sockets connected`);
        if (users.length === 0 && connections.length === 0) {
            messages = [];
        }
    });
});

// ----------------------------------------socket

server.listen(
    process.env.PORT,
    console.log(`Server running on port ${process.env.PORT}`)
);
