// Linked packages

require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var axios = require("axios")
var fs = require("fs")
var moment = require("moment")
var chalk = require("chalk")

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
        console.log("\nSearching for concerts...\n")
        findConcert();
        break;

    case "spotify-this-song":
        console.log("\nSearching for song...\n")
        findSong();
        break;

    case "movie-this" :
        console.log("\nSearching for movie...\n")    
        findMovie();
        break;

    case "do-what-it-says" :
        console.log("\nDo what it says...\n")
        doWhatItSays();
        break;
} 

// Bands in Town API
function findConcert() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp";
    
    axios.get(queryUrl).then(function(response){
        console.log("Found a concert for " + chalk.inverse(response.data[0].lineup[0] + "...\n"))
        console.log(chalk.underline(response.data[0].venue.name))
        console.log("@ " + response.data[0].venue.city + ", " + response.data[0].venue.region)
        console.log(moment(response.data[0].datetime).format("dddd, MMMM Do YYYY, h:mm a"))
    })
    .catch(function(error) {
        console.log(error);
    });
}

// Spotify API
function findSong() {
    var queryUrl = "https://api.spotify.com/v1/search?q=track:" + userSearch + "&type=track&limit=3"
    spotify.request(queryUrl).then(function(response) {
        console.log(response.tracks.items[0].name)
    })
    .catch(function(error) {
        console.log(error)
    })

}


