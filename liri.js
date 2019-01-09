
//Sets environmental variables into process.env from a .env file. These values are used within this computer so anyone
//cloning my node will have to create their own .env file and not use my spotify keys.
require("dotenv").config();

//Getting access to the npm's we need for each of the functions we will be doing. Will need axios, Spotify, file sharing,
//Moment, and the Spotify API keys in my keys.js file.
let axios = require("axios");
let Spotify = require('node-spotify-api');
let fs = require("fs");
let spotifyKeys = require('./keys.js');
let spotify = new Spotify(spotifyKeys.spotify);

//Need to access the command line arguments to get the file to do what we want.
const [node, file, ...args] = process.argv;

/*If no film names are provided in the command line after "movie-this", the getMovie function will pull up information for Mr. Nobody. Otherwise,
it will grab the information for the desired film from OMDB*/
if (args[0] === "movie-this") {
    if (args[1] === undefined) {
        getMovie("Mr.+Nobody");
    }
    else {
        getMovie(args.slice(1).join("+"));
    }
};

/*If there are no film names provided in the command line, the spotifySong function will pull up all Spotify track information for songs 
named "The Sign"; otherwise it will pull up information for all tracks with the desired song title.*/
if (args[0] === "spotify-this-song") {

    if (args[1] === undefined) {
        spotifySong("The Sign");
    }
    else {
        let songTitle = args.slice(1).join(" ");
        spotifySong(songTitle);
    }
};

/*If the command "do-what-it-says" is given, the information in random.txt is read and will perform one of the two functions described below,
getMovie or spotifySong*/
if (args[0] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        dataArr = data.split(",");
        if (dataArr[0] === "movie-this") {
            if (dataArr[1] === undefined) {
                getMovie("Mr.+Nobody")
            }
            else {
                getMovie(dataArr[1].split().join("+"))
            }
        };

        if (dataArr[0] === "spotify-this-song") {
            if (dataArr[1] === undefined) {
                spotifySong("The Sign")
            }
            else {
                spotifySong(dataArr[1])
            }
        };
    });
};

/*This function takes a song title and pulls up 5 tracks from Spotify wbased on that title, showing the artist, the song name, the Spotify
preview link, and the Album the track is from.*/
function spotifySong(songName) {

    spotify.search({ type: 'track', query: songName, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        data.tracks.items.forEach(function (element) {
            console.log("");
            
            console.log(`Artist: ${element.artists[0].name}`);
            console.log(`Song: ${element.name}`);
            console.log(`Spotify Preview Link: ${element.external_urls.spotify}`);
            console.log(`Album: ${element.album.name}`);
        });
    })
};

/*This function takes a movie title and accesses OMDB's database using axios to provide the Title, Year released, IMDB rating, Rotton Tomatoes 
rating, list of countries the movie was produced in, the plot, and the starring actors.*/
function getMovie(movieName) {

    axios
        .get(`http://www.omdbapi.com/?t=${movieName}&apikey=cf1c54e0`)
        .then(function (movie) {

            console.log("");
            console.log(`Title: ${movie.data.Title}`);
            console.log(`Released: ${movie.data.Year}`);
            console.log(`IMDB Rating: ${movie.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${movie.data.Ratings[1].Value}`);
            console.log(`Produced in: ${movie.data.Country}`);
            console.log(`Plot: ${movie.data.Plot}`);
            console.log(`Starring: ${movie.data.Actors}`);

        })
        .catch(function (err) {
            console.log(err);
        });
};
