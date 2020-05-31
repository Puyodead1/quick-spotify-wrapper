class Image {
  /**
   * Creates a new image
   * @constructor
   * @param {Object} object
   */
  constructor(object) {
    this.url = object.url;
    this.height = object.height;
    this.width = object.width;
  }
}

module.exports = Image;
