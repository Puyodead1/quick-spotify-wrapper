const Category = require("../objects/Category");
const Playlist = require("../objects/Playlist");

class Browse {
  /**
   * Creates a new Browse instance
   * @constructor
   * @param {Spotify} spotify
   */
  constructor(spotify) {
    this.spotify = spotify;
  }

  /**
   * Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
   * @param {String} id Category id
   * @param {String} country an ISO 3166-1 alpha-2 country code.
   * @param {String} localean ISO 639-1 language code and an ISO 3166-1 alpha-2 country code; Default: en_US
   * @returns N/A
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-category/}
   */
  getCategory(id, country = "US", locale = "en_US") {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(
          `/browse/categories/${id}?country=${country}&locale=${locale}`
        )
        .then((res) => {
          resolve(new Category(res));
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get a list of Spotify playlists tagged with a particular category.
   * @param {String} id category id
   * @param {String} country an ISO 3166-1 alpha-2 country code.
   * @param {Number} limit maximum number of items to return; default: 20, min: 1, max: 50
   * @returns N/A
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-categorys-playlists/}
   */
  getCategoryPlaylists(id, country, limit = 20) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(
          `/browse/categories/${id}/playlists?country=${country}&limit=${limit}`
        )
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
   *
   * @param {String} country an ISO 3166-1 alpha-2 country code.
   * @param {String} locale an ISO 639-1 language code and an ISO 3166-1 alpha-2 country code; Default: en_US
   * @param {Number} limit maximum number of items to return; default: 20, min: 1, max: 50
   * @returns N/A
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-list-categories/}
   */
  getCategories(country = "US", locale = "en-US", limit = 20) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(
          `/browse/categories?country=${country}&locale=${locale}&limit=${limit}`
        )
        .then((res) => {
          const categoryList = [];
          res.categories.items.forEach((category) => {
            categoryList.push(new Category(category));
          });
          resolve(categoryList);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Get a list of Spotify featured playlists (shown, for example, on a Spotify player’s ‘Browse’ tab).
   * @param {String} locale an ISO 639-1 language code and an ISO 3166-1 alpha-2 country code; Default: en_US
   * @param {String} country an ISO 3166-1 alpha-2 country code.
   * @param {Number} limit maximum number of items to return; default: 20, min: 1, max: 50
   * @returns N/A
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-list-featured-playlists/}
   */
  getFeaturedPlaylists(locale = "en_US", country = "US", limit = 20) {
    throw new Error("Not Implemented");
  }

  /**
   * Create a playlist-style listening experience based on seed artists, tracks and genres.
   * @param {Number} limit maximum number of items to return; default: 20, min: 1, max: 50
   * @param {String} country an ISO 3166-1 alpha-2 country code.
   * @param {Array} seedArtists array of artist ids; max 5
   * @param {String} seedGenres array of genres; max 5
   * @param {Array} seedTracks array of track ids; max 5
   * @returns N/A
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/}
   */
  getRecommendations(
    limit = 20,
    country = "US",
    seedArtists,
    seedGenres,
    seedTracks
  ) {
    throw new Error("Not Implemented");
  }
}

module.exports = Browse;
