/**
 * Created by maurice on 3/15/2016.
 */

var Twitter = require('twitter');
var tweets = require('./data/tweets');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function getTweet() {
    var index = Math.floor(Math.random() * tweets.length);
    return tweets[index];
}

function sendTweet(status) {

    client.post('statuses/update',
        {
            status: status
        },
        function (error, tweet, response) {
            if (error) throw error;
        });
}


var tweet = getTweet();
if (tweet) {
    console.log(tweet);
    sendTweet(tweet);
}
