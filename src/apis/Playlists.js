const Playlist = require("../objects/Playlist");
const Image = require("../objects/Image");
const Track = require("../objects/Track");

class Playlists {
  /**
   * Creates a new Playlists instance
   * @constructor
   * @param {Spotify} spotify
   */
  constructor(spotify) {
    this.spotify = spotify;
  }

  /**
   * Get a list of the playlists owned or followed by a Spotify user.
   * @param {String} id user id
   * @param {Number} limit maximum number of playlists to return; default: 20, min: 1, max: 50
   * @returns array of playlists
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-list-users-playlists/}
   */
  getUserPlaylists(id, limit = 20) {
    new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/users/${id}/playlists?limit=${limit}`)
        .then((res) => {
          const playlists = [];
          res.playlists.items.forEach((playlist) => {
            playlists.push(new Playlist(playlist));
          });
          resolve(playlists);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get the current image associated with a specific playlist.
   * @param {String} id playlist id
   * @returns array of image objects
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist-cover/}
   */
  getCoverImage(id) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/playlists/${id}/images`)
        .then((res) => {
          const images = [];
          res.forEach((image) => {
            images.push(new Image(image));
          });
          resolve(images);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get a playlist owned by a Spotify user.
   * @param {String} id playlist id
   * @returns playlist object
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/}
   */
  getPlaylist(id) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/playlists/${id}`)
        .then((res) => {
          resolve(new Playlist(res));
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get full details of the tracks or episodes of a playlist owned by a Spotify user.
   * @param {String} id playlist id
   * @param {Number} limit
   * @returns maximum number of items to return; default: 100, min: 1, max: 100
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/}
   */
  getPlaylistTracks(id, limit = 100) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/playlists/${id}/tracks?limit=${limit}`)
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
}

module.exports = Playlists;
