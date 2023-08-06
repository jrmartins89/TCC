const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./app/server/models");
const dbConfig = require("./app/server/config/ db.config");
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
    .connect(`mongodb+srv://jribamarjunior89:Thepillows1@vagouaqui.rt4976f.mongodb.net/`, {
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

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
//routes
app.get("/", (req, res) => {
    res.json({ message: "Bem vindo ao aplicativo VagouAqui." });
});
require('./app/server/routes/auth.routes')(app);
require('./app/server/routes/user.routes')(app);

// set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});