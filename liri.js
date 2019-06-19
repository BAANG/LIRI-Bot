// Linked packages

require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios")
var fs = require("fs")

// Global Variables
var parseUserInput = "";

var parsedInput = function() { //Takes user inputted search parameters and strings it together with "+" & removes final "+" in string.
    for (var i = 3; i < process.argv.length; i++) {
        parseUserInput += (process.argv[i] + "+")
    }
    parseUserInput = parseUserInput.substring(0, parseUserInput.length - 1);
}

parsedInput();
var userInput = process.argv[2];
var userSearch = parseUserInput
console.log(userSearch)


// Switch-case that runs functions based on user input
switch (userInput) {
    case "concert-this":
        console.log("Searching for concerts...")
        findConcert();
        break;

    case "spotify-this-song":
        console.log("Searching for song...")
        findSong();
        break;

    case "movie-this" :
        console.log("Searching for movie...")    
        findMovie();
        break;

    case "do-what-it-says" :
        console.log("Do what it says...")
        doWhatItSays();
        break;
} 

// Bands in Town API

var queryUrl = "https://rest.bandsintown.com/artists/" + userSearch + "events?app+id=codingbootcamp"

