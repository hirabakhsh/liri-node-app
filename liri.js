
// Require all npm packages:

var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


// getting keys from keys.js

var keys = require('./keys.js');
var tweets = keys.twitterKeys;


var spotify = new spotify ({
    id: 'f5519412b3554478b3e886d7ac720a15', 
    secret: '281643a2976848f39a56a4d34968f0e8'
});

var inputArguments = process.argv;

// Grab second command
var command = inputArguments[2];

// Executing Liri command by request

if (command == 'my-tweets') {
    myTweets();
} else if (command == `spotify-this-song`) {
    spotifyThisSong(command);
} else if (command == `movie-this`) {
    movieThis(command);
} else if (command ==  `do-what-it-says`) {
    doWhatItSays();
} else {
    console.log('Please enter a valid command from following options: 1. my-tweets, 2. spotify-this-song, 3. movie-this, 4. do-what-it-says')
}


// Supporting Functions 

function myTweets() {
    var client = new Twitter(tweets);

    var parameters = {screen_name: 'HiraBakhsh', count: 20};

    client.get('statuses/user_timeline', parameters, function(error, mytweets, response) {
        if (error) {
            var errorMessage = 'ERROR: Retrieving user tweets... ' + JSON.stringify(error);
            console.log(errorMessage);

        } else {
            var outputMessage = '------------------------\n' +
                            'User Tweets:\n' +
                            '------------------------\n\n';

            for (var i = 0; i < mytweets.length; i++) {
                outputMessage += 'Created on: ' + mytweets[i].created_at + '\n' +
                             'Tweet content: ' + mytweets[i].text + '\n' +
                             '------------------------\n';
            }
        console.log(outputMessage);
        }

    });
}

function spotifyThisSong(song) {

    // If no song, LIRI defaults to 'The Sign' by Ace Of Base
    var search;
    if (song === '') {
        search = 'The Sign Ace Of Base';
    } else {
        search = song;
    }

    spotify.search({ type: 'track', query: search}, function(error, data) {
        if (error) {
            var errorStr1 = 'ERROR: Retrieving Spotify song... ' + error;

        } else {
            var songInfo = data.tracks.items[0];
            if (!songInfo) {

                var errorStr2 = 'ERROR: Song cannot be found, please try again';
                return;
            } else {
                var outputStr = '------------------------\n' +
                                'Song Information:\n' +
                                '------------------------\n\n' +
                                'Song Name: ' + songInfo.name + '\n'+
                                'Artist: ' + songInfo.artists[0].name + '\n' +
                                'Album: ' + songInfo.album.name + '\n' +
                                'Preview Here: ' + songInfo.preview_url + '\n';
                console.log(outputStr);
            }
        }
    });
}

function movieThis(movie) {
    // If no movie, LIRI defaults to 'Mr. Nobody'
    var search;
    if (movie === '') {
        search = 'Mr. Nobody';
    } else {
        search = movie;
    }

    search = inputArguments.slice(3).join(' ');
    var queryStr = 'http://www.omdbapi.com/?t=' + search + '&plot=full&apikey=40e9cece';


    request(queryStr, function (error, response, body) {
        if ( error || (response.statusCode !== 200) ) {
            var errorStr1 = 'ERROR: No OMDB entry... ' + error;


        } else {
            var data = JSON.parse(body);
            if (!data.Title && !data.Released && !data.imdbRating) {
                var errorStr2 = 'ERROR: Movie not found. Please try again';
                console.log(errorStr2);

            } else {
                var outputStr = '------------------------\n' +
                                'Movie Information:\n' +
                                '------------------------\n\n' +
                                'Movie Title: ' + data.Title + '\n' +
                                'Year Released: ' + data.Released + '\n' +
                                'IMBD Rating: ' + data.imdbRating + '\n' +
                                'Country Produced: ' + data.Country + '\n' +
                                'Language: ' + data.Language + '\n' +
                                'Plot: ' + data.Plot + '\n' +
                                'Actors: ' + data.Actors + '\n' +
                                'Rotten Tomatoes Rating: ' + data.tomatoRating + '\n' +
                                'Rotten Tomatoes URL: ' + data.tomatoURL + '\n';
                console.log(outputStr);
            }
        }
    });
}


function doWhatItSays() {

    fs.readFile('./random.txt', 'utf8', function (error, data) {
        if (error) {
            console.log('Error reading file... ' + error);
            return;
        } else {
            var cmdString = data.split(',');
            var command = cmdString[0].trim();
            var param = cmdString[1].trim();

            switch(command) {
                case 'my-tweets':
                    myTweets();
                    break;

                case 'spotify-this-song':
                    spotifyThisSong(param);
                    break;

                case 'movie-this':
                    movieThis(param);
                    break;
            }
        }
    });
}

