# LIRI-Bot
Node.js project; Takes command line arguments and searches for information about a movie or a list of songs based on a searched track title. The program utilizes axios, file system, and node-spotify-api npm packages and can execute one of three functions:

1) movie-this: Takes a movie title from the command line and displays information about the movie, including the title of the movie, year released, plot, actors, etc. If no movie title is provided, the program will pull up information for the film, Mr. Nobody.

2) spotify-this-song: Takes a song title and pulls up a list of 5 songs that Spotify pulls up from this search. The information provided includes the Artist, name of the song, album the song is from, and a spotify preview link. If no song is provided, the program will search spotify for "The Sign". 

3) do-what-it-says: This command does not require any additional arguments. This will ask the program to take the information from an external file (random.txt), and execute the desired function based on what I've listed above.

Here is the link to the video showing the program in action: https://www.youtube.com/watch?v=n0OxFXJ4F-8&t=1s

*NOTE* - I did change a couple variables in the spotifySong() function after the video was released, making sure the actual song titles and preview links were correct.
