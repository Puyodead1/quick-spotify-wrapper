const Image = require("./Image");
const User = require("./User");
const Track = require("./Track");

class Playlist {
  /**
   * creates a new playlist
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
    this.tracks =
      object.tracks && Array.isArray(object.tracks)
        ? this.makeTracks(object.tracks)
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
      trackList.push(new Track(track));
    });
    return trackList;
  }
}

module.exports = Playlist;
