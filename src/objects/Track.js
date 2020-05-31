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
