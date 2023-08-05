const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const PORT = process.env.PORT || 8080;


var corsOptions = {
    origin: "http://localhost:8081"
};

//app configs.
app.use(cors(corsOptions)); // user cors middleware
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(                                                // helps to store the session data on the client within a cookie without requiring any database/resources on the server side
    cookieSession({
        name: "vagouAqui-session",
        keys: ["COOKIE_SECRET"], // should use as secret environment variable
        httpOnly: true
    })
);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bem vindo ao aplicaivo VagouAqui." });
});

