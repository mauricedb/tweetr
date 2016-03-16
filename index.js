var Twitter = require('twitter');
var GoogleSpreadsheet = require("google-spreadsheet");

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function getTweet(cb) {
    var sheet = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    sheet.getRows(1, function (error, tweets) {
        if (error) throw error;

        var index = Math.floor(Math.random() * tweets.length);
        var tweet = tweets[index];
        cb(tweet);
    });
}

function sendTweet(status) {
    client.post('statuses/update', {
            status: status
        },
        function (error, tweet, response) {
            if (error) throw error;
        });
}

getTweet(function (tweet) {
    if (tweet) {
        console.log(tweet.tweet);
        //sendTweet(tweet);
    }
});
