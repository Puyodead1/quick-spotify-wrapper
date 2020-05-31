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
