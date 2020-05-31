const Track = require("../objects/Track");
class Tracks {
  /**
   * Creates a new Tracks instance
   * @constructor
   * @param {Spotify} spotify
   */
  constructor(spotify) {
    this.spotify = spotify;
  }

  /**
   * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
   * @param {String} ids array of track ids
   * @returns array of tracks
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-tracks/}
   */
  getTracks(ids) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/tracks?ids=${ids.join(",")}`)
        .then((res) => {
          const trackList = [];
          res,
            tracks.forEach((track) => {
              trackList.push(new Track(track));
            });
          resolve(trackList);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get Spotify catalog information for a single track identified by its unique Spotify ID.
   * @param {String} id track id
   * @returns track
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/}
   */
  getTrack(id) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/tracks?ids=${id}`)
        .then((res) => {
          resolve(new Track(res.tracks[0]));
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports = Tracks;
