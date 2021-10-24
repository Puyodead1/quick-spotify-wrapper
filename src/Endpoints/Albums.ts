import { SpotifyClient } from "..";
import { ENDPOINTS } from "../Constants";
import {
  AlbumResponseJSON,
  AlbumTracksResponseJSON,
  BrowseNewReleasesResponseJSON,
  SeveralAlbumsResponseJSON,
} from "../Interfaces";

export class Albums {
  private readonly _client: SpotifyClient;
  constructor(client: SpotifyClient) {
    this._client = client;
  }

  /**
   * Get Spotify catalog information for a single album.
   * @param id The Spotify ID of the album.\
   * Example value: "4aawyAB9vmqN3uQ7FjRGTy"
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.\
   * \
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.\
   * \
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * \
   * Example value: "ES"
   * @returns An album
   */
  async getAlbum(id: string, market?: string): Promise<AlbumResponseJSON> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<AlbumResponseJSON>(ENDPOINTS.ALBUMS.GET_ALBUM(id, market))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
   * @param id A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.\
   * Example value: "382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc"
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.\
   * \
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.\
   * \
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * \
   * Example value: "ES"
   * @returns A set of albums
   */
  async getAlbums(
    ids: string[],
    market?: string
  ): Promise<SeveralAlbumsResponseJSON> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<SeveralAlbumsResponseJSON>(ENDPOINTS.ALBUMS.GET_ALBUMS(ids))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
   * @param id The Spotify ID for the album.\
   * Example value: "4aawyAB9vmqN3uQ7FjRGTy"
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.\
   * \
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.\
   * \
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * \
   * Example value: "ES"
   * @returns Pages of content
   */
  async getTracks(
    id: string,
    limit: number = 20,
    offset: number = 0,
    market?: string
  ): Promise<AlbumTracksResponseJSON> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<AlbumTracksResponseJSON>(
          ENDPOINTS.ALBUMS.GET_ALBUM_TRACKS(id, limit, offset, market)
        )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   * @param country An ISO 3166-1 alpha-2 country code. If a country code is specified, only albums available in that market will be returned.
   * @returns A paged set of albums
   */
  async getNewReleases(
    limit: number = 20,
    offset: number = 0,
    country?: string
  ): Promise<BrowseNewReleasesResponseJSON> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<BrowseNewReleasesResponseJSON>(
          ENDPOINTS.ALBUMS.BROWSE_NEW_RELEASES(limit, offset, country)
        )
        .then(resolve)
        .catch(reject);
    });
  }
}
