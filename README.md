# LIRI-Bot


![Demo Gif](images/liri-bot.gif)

LIRI-Bot is a command line/Node.js application that leverages several APIs to search for and print song information (via Spotify), concert information (via Bandsintown), and movie information (via OMDB).

I utilized Node.js as well as several packages (built-in and publically-sourced), in order to perform HTTP/API calls, format the command line output, and take in user input as parameter to give back data.

---

### How to Install/Use:

1. Clone down repository.
2. Install required Node.js packages with:
    ```
    $ npm install
    ```
3. Create a '.env' file with the structure:
    ```
    # Spotify API keys

    SPOTIFY_ID=YOUR_SPOTIFY_ID
    SPOTIFY_SECRET=YOUR_SPOTIFY_SECRET
    ```
4. You're good to go! Here are the commands:
    ```
    $node.js liri.js concert-this <artist>
    $node.js liri.js spotify-this-song <song name>
    $node.js liri.js movie-this <movie name>
    $node.js liri.js do-what-it-says
        NOTE:(do-what-it-says) gets the user input from the included random.txt file.
    ```

---
### Technologies Used:
* Javascript
* [Node.js](https://nodejs.org/en/)
* [Spotify API](https://developer.spotify.com/documentation/)
* [Bandsintown API](https://manager.bandsintown.com/support/bandsintown-api)
* [OMDB API](http://www.omdbapi.com/)
* [Moment.js](https://momentjs.com/)
* [axios](https://github.com/axios/axios)
* [Chalk](https://www.npmjs.com/package/chalk)