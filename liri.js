// Make a JavaScript file named liri.js.
// At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says


var keysObject = require('./keys.js');
console.log(typeof(keysObject));

//Callback functions
var error = function (err, response, body) {
	console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var Twitter = require('twitter-node-client').Twitter;

//Get this data from your twitter apps dashboard
var config = {
    "consumerKey": keysObject.consumerKey,
    "consumerSecret": keysObject.consumerSecret,
    "accessToken": keysObject.accessToken,
    "accessTokenSecret": keysObject.accessTokenSecret,
}

var twitter = new Twitter(config);

//Example calls

twitter.getUserTimeline({ screen_name: 'BoyCook', count: '10'}, error, success);

twitter.getMentionsTimeline({ count: '10'}, error, success);

twitter.getHomeTimeline({ count: '10'}, error, success);

twitter.getReTweetsOfMe({ count: '10'}, error, success);

twitter.getTweet({ id: '1111111111'}, error, success);

//
  // Get 10 tweets containing the hashtag haiku
  //

// twitter.getSearch({'q':'#haiku','count': 10}, error, success);

//
  // Get 10 popular tweets with a positive attitude about a movie that is not scary 
  //

// twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 10, 'result\_type':'popular'}, error, success);