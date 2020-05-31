# Spotify API Wrapper

Example:

```js
const Spotify = require("spotify-api-wrapper");
const spotify = new Spotify("client id", "client secret");

(async () => {
  await spotify.login(); // you must call the login function before you can use any part of the library!
  // you can now use the library and make api calls!
})();
```

You can check the authentication status with `spotify.authenticated` which will return a boolean

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
