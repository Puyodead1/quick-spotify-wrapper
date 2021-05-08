# Spotify API Wrapper

_Moved from Chat-and-Share/quick-spotify-wrapper_

Full documentation can be found [here](https://puyodead1.github.io/quick-spotify-wrapper).

For support you can join my [Discord Server](https://discord.gg/tMzrSxQ).

# Creating a client

Example:

```js
const Spotify = require("quick-spotify-wrapper");
const spotify = new Spotify("client id", "client secret");

(async () => {
  await spotify.login(); // you must call the login function before you can use any part of the library!
  // you can now use the library and make api calls!
})();
```

# Authentication Status

You can check the authentication status with `spotify.authenticated` which will return a boolean

# Search

Search Example:

```js
(async () => {
  await spotify.login();
  const results = await spotify
    .search("track:counting stars", 1, ["track"])
    .catch((error) => console.error(error));
  console.log(results);
})();
```

_information related to how to use search can be found here: [Spotify API Reference](https://developer.spotify.com/documentation/web-api/reference/search/search/)_

# Recommendations API

**AN IMPORTANT THING TO UNDERSTAND IS THAT BETWEEN SEED_ARTISTS, SEED_GENRES, AND SEED_TRACKS, YOU CAN ONLY HAVE A MAX OF 5 COMBINED! NOT 5 PER SEED!**

Recommendations API can be a bit complex so here are some examples:

Basic:

```js
(async () => {
  await spotify.login();
  const results = await spotify.browse
    .getRecommendations(
      ["2sf28o6euxEDpYkG9dMtuM", "3bwENxqj9nhaAI3fsAwmv9"],
      ["pop"],
      ["6XwnkMuCSCu46Q4BS5nGNL", "4BacK7ZctqLEyFomDuh9jG"]
    )
    .catch((error) => console.error(error));
  console.log(results);
})();
```

What this does is generates recommendations from artists, genres, and tracks provided. You can provide up to 5 tracks, genres, and artists. this is the most basic example.

Here is a more complex example:

```js
(async () => {
  await spotify.login();
  const results = await spotify.browse
    .getRecommendations(
      ["2sf28o6euxEDpYkG9dMtuM", "3bwENxqj9nhaAI3fsAwmv9"],
      ["pop"],
      ["6XwnkMuCSCu46Q4BS5nGNL", "4BacK7ZctqLEyFomDuh9jG"],
      ["min_popularity=1", "min_speechiness=0.33"],
      ["max_popularity=80", "max_speechiness=0.66"]
    )
    .catch((error) => console.error(error));
  console.log(results);
})();
```

This example generates recommendations with a minimum popularity of 1 and speechiness of 0.33, and a maximum popularity of 80 and speechiness of 0.66

_More information on how to use this API can be found here: [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/)_

# Errors:

Spotify api returns error objects in the following form:

```json
{ error: { status: <http resonse code>, message: '<error messages>' } }
```

Examples:

```json
{ "error": { "status": 404, "message": "No such user" } }
```

```json
{ "error": { "status": 400, "message": "invalid request" } }
```
