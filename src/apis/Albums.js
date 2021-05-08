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

const Album = require("../objects/Album");
const Track = require("../objects/Track");
class Albums {
  /**
   * Creates a new Albums instance
   * @constructor
   * @param {Spotify} spotify
   */
  constructor(spotify) {
    this.spotify = spotify;
  }

  /**
   * Get Spotify catalog information for a single album.
   * @param {String} album id
   * @returns Promise<obj>
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/albums/get-album/}
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
   * @param {Array} ids of album ids; Max 20
   * @returns array of albums
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/albums/get-several-albums/}
   */
  getAlbums(ids) {
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
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/}
   */
  getAlbumTracks(id, limit = 20) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/albums/${id}/tracks?limit=${limit}`)
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

module.exports = Albums;
