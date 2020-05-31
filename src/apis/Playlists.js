const fetch = require("node-fetch");

module.exports = class Playlists {
  constructor(spotify) {
    this.spotify = spotify;
  }
};
