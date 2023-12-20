const express = require("express");
const webpush = require("web-push");
const path = require("path");
require("dotenv").config()

const app = express();

app.use(express.json());
// Set static path
app.use(express.static(path.join(__dirname, "client")));


const publicVapidKey = "BKinIfnzoZwErfBNWbUV4zwXmx4pIIVJmi4j0jidQy8JsFK2TXQ3IyxJLy4gNVVOahZEfwL01cruTXXircJaD6Q";
const privateVapidKey = process.env.PrivateKey;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  res.status(201).send({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 8000;

app.listen(port, () => console.log("Server is running on PORT", port));
