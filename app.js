const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");

const app = express();

app.use(cors());


app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "market-session",
    keys: ["COOKIE_SECRET"], 
    httpOnly: true
  })
);

const db = require("./app/models");
const Role = db.role;

function initial() {
  Role.estimatedDocumentCount()
  .then(count => {
    if (count === 0) {
      return Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
        new Role({ name: "admin" }).save()
      ]);
    }
  })
  .then(savedRoles => {
    if (savedRoles) {
      savedRoles.forEach(savedRole => {
        console.log(`Added '${savedRole.name}' to roles collection`);
      });
    }
  })
  .catch(err => {
    console.error("Error:", err);
  });
}

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Yosik application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

