class Artist {
  /**
   * creates a new artist
   * @constructor
   * @param {Object} object
   */
  constructor(object) {
    this.external_urls = object.external_urls;
    this.href = object.href;
    this.id = object.id;
    this.name = object.name;
    this.type = object.type;
    this.uri = object.uri;
  }
}

module.exports = Artist;
