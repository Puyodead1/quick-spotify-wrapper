const Artist = require("../objects/Artist");
const Album = require("../objects/Album");
const Track = require("../objects/Track");

module.exports = module.exports = class Artists {
  constructor(spotify) {
    this.spotify = spotify;
  }

  /**
   * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
   * @param {String} id artist id
   * @returns an artist
   * @external https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/
   */
  getArtist(id) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/artists/${id}`)
        .then((res) => {
          resolve(new Artist(res));
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get Spotify catalog information about an artist’s albums. Optional parameters can be specified in the query string to filter and sort the response.
   * @param {String} id artist id
   * @returns Array of albums
   * @external https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-albums/
   */
  getArtistAlbums(id) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/artists/${id}/albums`)
        .then((res) => {
          const albums = [];
          res.items.forEach((album) => {
            albums.push(new Album(album));
          });
          resolve(albums);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get Spotify catalog information about an artist’s top tracks by country.
   * @param {String} id artist id
   * @param {String} countryCode An ISO 3166-1 alpha-2 country code
   * @returns array of tracks
   * @external https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-top-tracks/
   */
  getArtistTopTracks(id, countryCode) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/artists/${id}/top-tracks?country=${countryCode}`)
        .then((res) => {
          const tracks = [];
          res.tracks.forEach((track) => {
            tracks.push(new Track(track));
          });
          resolve(tracks);
        })
        .catch((error) => reject(error));
    });
  }

  getRelatedArtists(id) {}

  getArtists(...ids) {}
};
