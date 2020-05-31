const Artist = require("./Artist");
const Copyright = require("./Copyright");
const Image = require("./Image");
const Track = require("./Track");

module.exports = class Album {
  constructor(object) {
    this.album_type = object.album_type;
    this.artists = this.makeArtists(object.artists);
    this.available_markets = object.available_markets;
    this.copyrights = this.makeCopyrights(object.copyrights);
    this.genres = object.genres;
    this.href = object.href;
    this.id = object.id;
    this.images = this.makeImages(object.images);
    this.name = object.name;
    this.popularity = object.popularity;
    this.release_date = object.release_date;
    this.release_date_precision = object.release_date_precision;
    this.tracks = this.makeTracks(object.tracks.items);
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
};
