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

const Image = require("./Image");

class User {
  /**
   * creates a new user
   * @constructor
   * @param {Object} object
   */
  constructor(object) {
    this.display_name = object.display_name;
    this.external_urls = object.external_urls;
    this.followers = object.followers;
    this.href = object.href;
    this.id = object.id;
    this.images =
      object.images && Array.isArray(object.images)
        ? this.makeImages(object.images)
        : null;
    this.type = object.type;
    this.uri = object.uri;
  }

  makeImages(images) {
    const imageList = [];
    images.forEach((image) => {
      imageList.push(new Image(image));
    });
    return imageList;
  }
}

module.exports = User;
