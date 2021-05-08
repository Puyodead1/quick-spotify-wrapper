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
