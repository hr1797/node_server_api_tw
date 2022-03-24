const express = require("express");
const cors = require("cors");
const tw = require("twitter");
require("dotenv/config");

const app = express();

const apikey = process.env.apikey;
const apiSecretKey = process.env.apikeysecret;
const accessToken = process.env.accesstoken;
const accessTokenSecret = process.env.accesstokensecret;

const client = new tw({
  consumer_key: apikey,
  consumer_secret: apiSecretKey,
  access_token_key: accessToken,
  access_token_secret: accessTokenSecret,
});

app.listen(3000, () => console.log("Server running"));

// const params = { q: "rusia", count: "1", result_type: "popular" };

app.get("/", cors(), (req, res) => {
  const { q, count } = req.query;

  client.get(
    "https://api.twitter.com/1.1/search/tweets.json",
    { q, count },
    (error, tweets, response) => {
      if (error) throw error;
      console.log(tweets);
      // console.log(tweets.statuses[0].text);
      res.send(tweets);
    }
  );
});
