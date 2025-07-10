import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

const appSession = session({
  secret: "kshdjshdjhdufheuhfs",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 60 * 24 },
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/sessiondb",
    collectionName: "myssion", // (optional)
  }),
});

app.use(appSession);

app.get("/", (req, res) => {
  if (req.session.username) {
    res.send(`<h1>Username from session is ${req.session.username}</h1>`);
  } else {
    res.send(`<h1>Home Page<h1/></br>
        <h1>No username found in session</h1>`);
  }
});

app.get("/set-username", (req, res) => {
  req.session.username = "FarazArshad";
  res.send("<h1>Username has been set in session</h1>");
});

app.get("/get-username", (req, res) => {
  if (req.session.username) {
    res.send(`<h1>Username from session is ${req.session.username}</h1>`);
  } else {
    res.send(`<h1>No username from session</h1>`);
  }
});

app.get("/destroy-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Failed to destroy session");
    }
    res.send("<h1>Session destroyed Successfully</h1>");
  });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
