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

const Artist = require("./Artist");

class Track {
  /**
   * Creates a new Track
   * @constructor
   * @param {Object} object
   */
  constructor(object) {
    this.album = null;
    this.artists =
      object.artists && Array.isArray(object.artists)
        ? this.makeArtists(object.artists)
        : null;
    this.available_markets = object.available_markets;
    this.disk_number = object.disk_number;
    this.duration_ms = object.duration_ms;
    this.explicit = object.explicit;
    this.external_ids = object.external_ids;
    this.external_urls = object.external_urls;
    this.href = object.href;
    this.id = object.id;
    this.name = object.name;
    this.preview_url = object.preview_url;
    this.track_number;
    this.type = object.type;
    this.uri = object.uri;
  }

  makeArtists(artists) {
    const artistsList = [];
    artists.forEach((artist) => {
      artistsList.push(new Artist(artist));
    });
    return artistsList;
  }
}

module.exports = Track;
