const Album = require("../objects/Album");

module.exports = class Albums {
  constructor(spotify) {
    this.spotify = spotify;
  }

  /**
   * Gets spotify catalog information for multiple albums identified by their spotify ids
   * @param ids Array of ids
   * @returns Promise<obj>
   */
  getMultipleAlbums(...ids) {
    return new Promise((resolve, reject) => {
      this.spotify
        .makeRequest(`/albums?ids=${ids.join(",")}`)
        .then((res) => {
          const albums = [];
          res.albums.forEach((album) => {
            albums.push(new Album(album));
          });
          resolve(albums);
        })
        .catch((error) => reject(error));
    });
  }
};
