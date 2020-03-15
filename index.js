var Twitter = require("twitter");
var { GoogleSpreadsheet } = require("google-spreadsheet");

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

async function getTweet(cb) {
  var doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  await doc.useApiKey(process.env.GOOGLE_API_KEY);

  var sheets = [1, 2];
  var sheetIndex = Math.floor(Math.random() * sheets.length);

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[sheetIndex];

  const tweets = await sheet.getRows();
  console.log("tweets", tweets.length);

  var index = Math.floor(Math.random() * tweets.length);
  var tweet = tweets[index];
  cb(tweet);
}

function sendTweet(status) {
  console.log(status);

  client.post(
    "statuses/update",
    {
      status: status
    },
    function(error, tweet, response) {
      if (error) {
        console.log(error);
        throw error;
      }
    }
  );
}

getTweet(function(tweet) {
  if (tweet && tweet.Tweet) {
    var msg = tweet.Tweet;

    if (tweet.By) {
      msg += ". By " + tweet.By;
    }

    if (tweet.Link) {
      msg += " " + tweet.Link;
    }

    sendTweet(msg);
  }
});
