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
const Copyright = require("./Copyright");
const Image = require("./Image");
const Track = require("./Track");

class Album {
  /**
   * Creates a new Album
   * @constructor
   * @param {Object} object
   */
  constructor(object) {
    this.album_type = object.album_type;
    this.artists =
      object.artists && Array.isArray(object.artists)
        ? this.makeArtists(object.artists)
        : null;
    this.available_markets = object.available_markets;
    this.copyrights =
      object.copyrights && Array.isArray(object.copyrights)
        ? this.makeCopyrights(object.copyrights)
        : null;
    this.genres = object.genres;
    this.href = object.href;
    this.id = object.id;
    this.images =
      object.images && Array.isArray(object.images)
        ? this.makeImages(object.images)
        : null;
    this.name = object.name;
    this.popularity = object.popularity;
    this.release_date = object.release_date;
    this.release_date_precision = object.release_date_precision;
    this.tracks =
      object.tracks && Array.isArray(object.tracks)
        ? this.makeTracks(object.tracks.items)
        : null;
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

  makeCopyrights(copyrights) {
    const copyrightsList = [];
    copyrights.forEach((copyright) => {
      copyrightsList.push(new Copyright(copyright));
    });
    return copyrightsList;
  }

  makeImages(images) {
    const imagesList = [];
    images.forEach((image) => {
      imagesList.push(new Image(image));
    });
    return imagesList;
  }

  makeTracks(tracks) {
    const tracksList = [];
    tracks.forEach((track) => {
      tracksList.push(new Track(track));
    });
    return tracksList;
  }
}

module.exports = Album;
