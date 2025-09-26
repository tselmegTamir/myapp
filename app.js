let express = require("express");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
let app = express();
let router = require("./router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    session({
    secret: "n2RfkvoBI9QJCYI8TuIVnGeHqDhKcaKh",
    store: mongoStore.create({
        mongoUrl: process.env.CONNECTION_STRING,
        dbName: "Myapp",
        collectionName: "session",
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
    })
);
app.use(flash());
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", router);

module.exports = app;
