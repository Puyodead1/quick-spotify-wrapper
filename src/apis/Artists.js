const Artist = require("../objects/Artist");
const Album = require("../objects/Album");
const Track = require("../objects/Track");

class Artists {
  /**
   * Creates a new artists instance
   * @constructor
   * @param {Spotify} spotify
   */
  constructor(spotify) {
    this.spotify = spotify;
  }

  /**
   * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
   * @param {String} id artist id
   * @returns an artist
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/}
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
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-albums/}
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
   * @param {String} country An ISO 3166-1 alpha-2 country code
   * @returns array of tracks
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-top-tracks/}
   */
  getArtistTopTracks(id, country = "US") {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/artists/${id}/top-tracks?country=${country}`)
        .then((res) => {
          const tracks = [];
          res.tracks.forEach((track) => {
            const album = new Album(track.album);
            const trck = new Track(track);
            trck.album = album;
            tracks.push(trck);
          });
          resolve(tracks);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community’s listening history.
   * @param {String} id artist id
   * @returns array of artists
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/artists/get-related-artists/}
   */
  getRelatedArtists(id) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/artists/${id}/related-artists`)
        .then((res) => {
          const artists = [];
          res.artists.forEach((artist) => {
            artists.push(new Artist(artist));
          });
          resolve(artists);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get Spotify catalog information for several artists based on their Spotify IDs.
   * @param  {Array} ids array of artist ids
   * @returns array of artists; Max 50
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/artists/get-several-artists/}
   */
  getArtists(ids) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/artists?ids=${ids.join(",")}`)
        .then((res) => {
          const artists = [];
          res.artists.forEach((artist) => {
            artists.push(new Artist(artist));
          });
          resolve(artists);
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports = Artists;
