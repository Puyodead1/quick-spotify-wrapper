const Artist = require("./Artist");
const Album = require("./Album");

module.exports = class Track {
  constructor(object) {
    this.album = object.album ? this.makeAlbum(object.album) : null;
    this.artists = this.makeArtists(object.artists);
    this.available_markets = object.available_markets;
    this.disk_number = object.disk_number;
    this.duration_ms = object.duration_ms;
    this.explicit = object.explicit;
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

  makeAlbum(album) {
    return new Album(album);
  }
};
