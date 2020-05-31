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
