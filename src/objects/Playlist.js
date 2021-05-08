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

const Image = require("./Image");
const User = require("./User");
const Track = require("./Track");

class Playlist {
  /**
   * Creates a new playlist
   * @constructor
   * @param {Object} object
   */
  constructor(object) {
    this.collaborative = object.collaborative;
    this.description = object.description;
    this.external_urls = object.external_urls;
    this.href = object.href;
    this.id = object.id;
    this.images =
      object.images && Array.isArray(object.images)
        ? this.makeImages(object.images)
        : null;
    this.name = object.name;
    this.owner = object.owner ? this.makeUser(object.owner) : null;
    this.public = object.public;
    this.snapshot_id = object.snapshot_id;
    this.tracks = object.tracks.items
      ? this.makeTracks(object.tracks.items)
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

  makeUser(owner) {
    return new User(owner);
  }

  makeTracks(tracks) {
    const trackList = [];
    tracks.forEach((track) => {
      trackList.push(new Track(track.track ? track.track : track));
    });
    return trackList;
  }
}

module.exports = Playlist;
