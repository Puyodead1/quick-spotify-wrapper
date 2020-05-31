const Image = require("./Image");

class User {
  /**
   * creates a new user
   * @constructor
   * @param {Object} object
   */
  constructor(object) {
    this.display_name = object.display_name;
    this.external_urls = object.external_urls;
    this.href = object.href;
    this.id = object.id;
    this.images = object.images ? this.makeImages(object.images) : null;
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
}

module.exports = User;
