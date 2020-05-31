const Album = require("../objects/Album");
const Track = require("../objects/Track");

module.exports = class Albums {
  constructor(spotify) {
    this.spotify = spotify;
  }

  /**
   * Get Spotify catalog information for a single album.
   * @param {String} album id
   * @returns Promise<obj>
   * @external https://developer.spotify.com/documentation/web-api/reference/albums/get-album/
   */
  getAlbum(id) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/albums/${id}`)
        .then((res) => {
          resolve(new Album(res));
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Gets spotify catalog information for multiple albums identified by their spotify ids
   * @param {String[]} ids of album ids; Max 20
   * @returns Promise<obj>
   * @external https://developer.spotify.com/documentation/web-api/reference/albums/get-several-albums/
   */
  getAlbums(...ids) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/albums?ids=${ids.join(",")}`)
        .then((res) => {
          const albums = [];
          res.albums.forEach((album) => {
            albums.push(new Album(album));
          });
          resolve(albums);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
   * @param {String} id album id
   * @param {Number} limit Min: 1; Max: 50; Default: 20
   * @returns Array of tracks
   * @external https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/
   */
  getAlbumTracks(id, limit = 20) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`albums/${id}/tracks`)
        .then((res) => {
          const trackList = [];
          res.items.forEach((track) => {
            trackList.push(new Track(track));
          });
          resolve(trackList);
        })
        .catch((error) => reject(error));
    });
  }
};
