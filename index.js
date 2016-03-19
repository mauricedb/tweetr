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

    var sheets = [1, 2];
    var sheetIndex = Math.floor(Math.random() * sheets.length);

    sheet.getRows(sheets[sheetIndex], function (error, tweets) {
        if (error) throw error;

        console.log(sheets[sheetIndex], tweets.length);

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
    if (tweet && tweet.tweet) {
        var msg = tweet.tweet;

        if (tweet.link) {
            msg += ' ' + tweet.link;
        }

        console.log(msg);
        sendTweet(tweet);
    }
});
