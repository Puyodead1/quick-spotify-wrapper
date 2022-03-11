/*
 *  Simple Javascript wrapper for the Spotify API
 *
 *  Copyright (c) 2021 Puyodead1
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

const fetch = require("node-fetch");

const Albums = require("./apis/Albums");
const Artists = require("./apis/Artists");
const Browse = require("./apis/Browse");
const Playlists = require("./apis/Playlists");
const Tracks = require("./apis/Tracks");
const Users = require("./apis/Users");

const Album = require("./objects/Album");
const Artist = require("./objects/Artist");
const Playlist = require("./objects/Playlist");
const Track = require("./objects/Track");

/** Main client */
class Spotify {
  /**
   * Creates a new spotify instance
   * @param {String} clientID spotify client id
   * @param {String} clientSecret spotify client sercret
   */
  constructor(clientID, clientSecret) {
    this._clientID = clientID;
    this._clientSecret = clientSecret;

    this.albums = new Albums(this);
    this.artists = new Artists(this);
    this.browse = new Browse(this);
    this.playlists = new Playlists(this);
    this.tracks = new Tracks(this);
    this.users = new Users(this);

    this.authenticated = false;
    this._access_token = null;
    this._token_type = null;
    this._expires_in = null;

    this.nextRequest = null;

    this.API_BASE = "https://api.spotify.com/v1";
  }

  /**
   * Gets initial tokens and create a refresh timer
   * @returns void
   */
  async login() {
    if (this.nextRequest) return;

    try {
      await this.getToken();
      console.debug(`Refreshing token in ${this._expires_in} seconds`);

      this.nextRequest = setTimeout(async () => {
        console.debug("Refreshing token...");
        await this.getToken();
        console.debug(`Refreshing token in ${this._expires_in} seconds`);
      }, this._expires_in * 1000);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Attempts to log the client in and obtain a token
   * @async
   * @returns object promise with access token, token type and expires in
   */
  async getToken() {
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
          this._access_token = res.access_token;
          this._token_type = res.token_type;
          this._expires_in = res.expires_in;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
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
        headers: { Authorization: `${this._token_type} ${this._access_token}` },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) reject(res);
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Searches Spotify API
   * @param {String} q - the search query
   * @param {Number} limit - max number of results to return; default: 20, min: 1, max: 50; *LIMIT IS APPLIED FOR EACH TYPE, NOT TOTAL RESPONSE*
   * @param {Array} type - list of types to search for
   * @returns Object of arrays for each type
   *
   * {@link https://developer.spotify.com/documentation/web-api/reference/search/search/}
   */
  search(q, limit, types) {
    return new Promise((resolve, reject) => {
      this.makeRequest(`/search?q=${q}&type=${types.join(",")}&limit=${limit}`)
        .then((res) => {
          const results = {};
          types.forEach((type) => {
            results[`${type}s`] = [];
            res[`${type}s`].items.forEach((item) => {
              switch (type) {
                case "album":
                  results[`${type}s`].push(new Album(item));
                  break;
                case "artist":
                  results[`${type}s`].push(new Artist(item));
                  break;
                case "playlist":
                  results[`${type}s`].push(new Playlist(item));
                  break;
                case "track":
                  results[`${type}s`].push(new Track(item));
                  break;
              }
            });
          });
          resolve(results);
        })
        .catch((error) => reject(error));
    });
  }
}

module.exports = Spotify;
