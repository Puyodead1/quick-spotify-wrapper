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

  /**
   * Makes array of Artist from array of artist objects
   * @param {Object} artists
   */
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
