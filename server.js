const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./app/models");
const dbConfig = require("./app/config/ db.config");
const Role = db.role;
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


// db config.
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


//routes
app.get("/", (req, res) => {
    res.json({ message: "Bem vindo ao aplicativo VagouAqui." });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});