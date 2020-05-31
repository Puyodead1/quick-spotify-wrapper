const Image = require("./Image");

class Category {
  /**
   * Creates a new Category
   * @constructor
   * @param {Object} object
   */
  constructor(object) {
    this.href = object.href;
    this.icons = this.makeIcons(object.icons);
    this.id = object.id;
    this.name = object.name;
  }

  makeIcons(icons) {
    const iconList = [];
    icons.forEach((icon) => {
      iconList.push(new Image(icon));
    });
    return iconList;
  }
}

module.exports = Category;
