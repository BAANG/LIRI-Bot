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
// console.log(userSearch)


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
    if (userSearch) {
        var queryUrl = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp";
    } else {
        var queryUrl = "https://rest.bandsintown.com/artists/Wu-Tang+Clan/events?app_id=codingbootcamp";
    }
    
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
    if (userSearch) {
        var queryUrl = "https://api.spotify.com/v1/search?q=track:" + userSearch + "&type=track&limit=3"
    } else {
        var queryUrl = "https://api.spotify.com/v1/search?q=track:The+Sign+Ace+of+Base&type=track&limit=3"
    }
   
    spotify.request(queryUrl).then(function(response) {
        console.log(chalk.green("Artist(s): ") + response.tracks.items[0].artists[0].name)
        console.log(chalk.green("Track Name: ") + response.tracks.items[0].name)
        console.log(chalk.green("Album Name (Year): ") + response.tracks.items[0].album.name + " (" + response.tracks.items[0].album.release_date.substring(0, 4) + ")")
        if (response.tracks.items[0].preview_url) { //Checks if preview exists before printing to console.
            console.log(chalk.green("Preview: ") + response.tracks.items[0].preview_url)
        }
    })
    .catch(function(error) {
        console.log(error)
    })

}

// OMDB API
function findMovie() {
    if (userSearch) {
        var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + userSearch
    } else {
        var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=Mr+Nobody"
    }

    axios.get(queryUrl).then(function(response) {
        console.log(chalk.inverse(response.data.Title + " (" + response.data.Year + ")"))
        console.log(chalk.underline("\nRatings"))
        console.log("IMDB: " + response.data.Ratings[0].Value + " | Rotten Tomatoes: " + response.data.Ratings[1].Value)
        console.log("\nCountry/Language: " + response.data.Country + "/" + response.data.Language)
        console.log("\nPlot: " + response.data.Plot)
        console.log("\nCast: " + response.data.Actors)
    })
    .catch(function(error) {
        console.log(error)
    })
}

// Do what it says...
function doWhatItSays() {
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error)
        }
        var parseRandom = data.split(",");

            var operator = parseRandom[0];
            var searchQuery = parseRandom[1];
            
            searchQuery = searchQuery.substring(1, searchQuery.length-1);
            splitQuery = searchQuery.split(" ");
            for (var i = 0; i < splitQuery.length; i++) {
                userSearch += (splitQuery[i] + "+")
            }
            userSearch = userSearch.substring(0, userSearch.length-1);

            switch (operator) {
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
                    console.log("\nLet's not do this.")
                    break;
            }
    })
}

