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

const User = require("../objects/User");

class Users {
  /**
   * Creates a new Users instance
   * @constructor
   * @param {Spotify} spotify
   */
  constructor(spotify) {
    this.spotify = spotify;
  }

  /**
   * Get public profile information about a Spotify user.
   * @param {String} id user id or username
   * @returns User object
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/users-profile/get-users-profile/}
   */
  getUser(id) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/users/${id}`)
        .then((res) => {
          resolve(new User(res));
        })
        .catch((error) => reject(error));
    });
  }
}
module.exports = Users;
