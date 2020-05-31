/* 
 *  Ssimple nodejs wrapper for the Spotify API that was developed for Woof discord bot by Chat&Share
 *  Copyright (C) 2020 Puyodead1
 *  
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *  
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
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
