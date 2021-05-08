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
          res.tracks.forEach((track) => {
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
