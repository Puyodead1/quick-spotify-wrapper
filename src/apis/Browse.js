/* 
 *  Simple Javascript wrapper for the Spotify API
 *  
 *  Copyright (c) 2021 Puyodead1
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

const Category = require("../objects/Category");
const Playlist = require("../objects/Playlist");
const Album = require("../objects/Album");
const Track = require("../objects/Track");

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
   * @returns Category Object
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
   * @returns array of playlist objects
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-categorys-playlists/}
   */
  getCategoryPlaylists(id, country = "US", limit = 20) {
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
   * @returns array of categories
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
   * @returns array of playlists
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-list-featured-playlists/}
   */
  getFeaturedPlaylists(locale = "en_US", country = "US", limit = 20) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(
          `/browse/featured-playlists?locale=${locale}&country=${country}&limit=${limit}`
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
   * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
   * @param {String} country an ISO 3166-1 alpha-2 country code.
   * @param {Number} limit maximum number of items to return; Default: 20, Min: 1, Max: 50
   * @returns array of albums
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-list-new-releases/}
   */
  getNewReleases(country = "US", limit = 20) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/browse/new-releases?country=${country}&limit=${limit}`)
        .then((res) => {
          const albums = [];
          res.albums.items.forEach((album) => {
            albums.push(new Album(album));
          });
          resolve(albums);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Create a playlist-style listening experience based on seed artists, tracks and genres.
   * @description Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.
   * @note AN IMPORTANT THING TO UNDERSTAND IS THAT BETWEEN SEED_ARTISTS, SEED_GENRES, AND SEED_TRACKS, YOU CAN ONLY HAVE A MAX OF 5 COMBINED! NOT 5 PER SEED!
   * @param {Number} limit maximum number of items to return; default: 20, min: 1, max: 50
   * @param {String} market an ISO 3166-1 alpha-2 country code.
   * @param {Array} max For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, max_instrumentalness=0.35 would filter out most tracks that are likely to be instrumental.
   * @param {Array} min For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, min_tempo=140 would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
   * @param {Array} seedArtists array of artist ids; max 5 for all seed values
   * @param {String} seedGenres array of genres; max 5 for all seed values; See https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/#available-genre-seeds
   * @param {Array} seedTracks array of track ids; max 5 for all seed values
   * @param {Array} target For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request target_energy=0.6 and target_danceability=0.8. All target values will be weighed equally in ranking results.
   * @returns Array of tracks
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/}
   */
  getRecommendations(
    seedArtists,
    seedGenres,
    seedTracks,
    min = [],
    max = [],
    target = [],
    limit = 20
  ) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(
          `/recommendations?limit=${limit}${
            max.length > 0 ? "&" + max.join("&") : ""
          }${
            min.length > 0 ? "&" + min.join("&") : ""
          }&seed_artists=${seedArtists.join(",")}&seed_genres=${seedGenres.join(
            ","
          )}&seed_tracks=${seedTracks.join(",")}${
            target.length > 0 ? "&" + target.join("&") : ""
          }`
        )
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
}

module.exports = Browse;
