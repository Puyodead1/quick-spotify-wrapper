const fetch = require("node-fetch");

const Albums = require("./apis/Albums");
const Artists = require("./apis/Artists");
const Browse = require("./apis/Browse");
const Playlists = require("./apis/Playlists");
const Search = require("./apis/Search");
const Tracks = require("./apis/Tracks");

module.exports = class Spotify {
  constructor(clientID, clientSecret) {
    this._clientID = clientID;
    this._clientSecret = clientSecret;
    this._token = null;
    this.albums = null;
    this.artists = null;
    this.browse = null;
    this.playlists = null;
    this.search = null;
    this.tracks = null;
    this.authenticated = false;

    this.API_BASE = "https://api.spotify.com/v1";
  }

  /**
   * Attempts to log the client in and obtain a token
   * @returns Promise
   */
  async login() {
    return new Promise((resolve, reject) => {
      fetch("https://accounts.spotify.com/api/token", {
        method: "post",
        headers: {
          Authorization: `Basic ${new Buffer.from(
            `${this._clientID}:${this._clientSecret}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({ grant_type: "client_credentials" }),
      })
        .then((res) => res.json())
        .then((res) => {
          this._token = res.access_token;
          this.authenticated = true;
          this.albums = new Albums(this);
          this.artists = new Artists(this);
          this.browse = new Browse(this);
          this.playlists = new Playlists(this);
          this.search = new Search(this);
          this.tracks = new Tracks(this);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Returns a boolean if client has been logged in
   * @returns Boolean
   */
  authenticated() {
    return this.authenticated;
  }

  /**
   * Makes a request to the api
   * @param {String} url
   * @returns Promise
   */
  makeRequest(url) {
    return new Promise((resolve, reject) => {
      fetch(this.API_BASE + url, {
        method: "get",
        headers: { Authorization: `Bearer ${this._token}` },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) reject(res);
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  }
};
