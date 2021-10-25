import {
  SearchIncludeExternalTypes,
  SearchResponse,
  SearchType,
} from "Interfaces";
import { SpotifyClient } from "..";
import { ENDPOINTS } from "../Constants";

export class Search {
  private readonly _client: SpotifyClient;
  constructor(client: SpotifyClient) {
    this._client = client;
  }

  /**
   * Get Spotify Catalog information about albums, artists, playlists, tracks, shows or episodes that match a keyword string.
   * @param query Search query keywords and optional field filters and operators.\
   * \
   * For example: ``q=roadhouse%20blues``\
   * \
   * Example value: "Muse"
   * @param type A comma-separated list of item types to search across.\
   * \
   * Valid types are: One of {@link SearchIncludeExternalTypes}\
   * \
   * Search results include hits from all the specified item types. \
   * \
   * For example: ``q=name:abacab&type=album,track`` returns both albums _**and**_ tracks with "abacab" included in their name.\
   * \
   * Example value: "track,artist"
   * @param options Optional parameters that can be passed.
   * @param options.include_external Possible values: One of {@link SearchIncludeExternalTypes}\
   * \
   * If ``include_external=audio`` is specified the response will include any relevant audio content that is hosted externally.\
   * \
   * By default external content is filtered out from responses.
   * @param options.limit Maximum number of results to return. Default: 20. Minimum: 1. Maximum: 50.\
   * \
   * **Note:** The limit is applied within each type, not on the total response.\
   * For example, if the limit value is 3 and the type is ``artist,album``, the response contains 3 artists and 3 albums.
   * @param options.market An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.\
   * \
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.\
   * \
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * \
   * Example value: "ES"
   * @param options.offset The index of the first result to return. Default: 0 (the first result). Maximum offset: 100.000. Use with limit to get the next page of search results.
   * @returns Search response
   */
  async search(
    query: string,
    type: SearchType[],
    options?: {
      include_external?: SearchIncludeExternalTypes;
      limit?: number;
      market?: string;
      offset?: number;
    }
  ): Promise<SearchResponse> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<SearchResponse>(ENDPOINTS.SEARCH(query, type, options))
        .then(resolve)
        .catch(reject);
    });
  }
}
