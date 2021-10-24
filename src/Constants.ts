export const API_BASE = "https://api.spotify.com/v1";
export const TOKEN_URL = "https://accounts.spotify.com/api/token";
export const ALBUMS = {
  /**
   * Builds the URL for requesting a specific album
   * @param id The Spotify ID of the album.\
   * Example value: "4aawyAB9vmqN3uQ7FjRGTy"
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.\
   * \
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.\
   * \
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * \
   * Example value: "ES"
   * @returns URL
   */
  GET_ALBUM: (id: string, market?: string) =>
    `${API_BASE}/albums/${id}${market ? `?market=${market}` : ""}`,
  /**
   * Builds the URL for requesting a several albums
   * @param ids A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.\
   * Example value: "382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc"
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.\
   * \
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.\
   * \
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * \
   * Example value: "ES"
   * @returns URL
   */
  GET_ALBUMS: (ids: string, market?: string) =>
    `${API_BASE}/albums?ids=${ids}${market ? `?market=${market}` : ""}`,
  /**
   * Builds the URL for requesting an album's tracks
   * @param id The Spotify ID for the album.
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.\
   * \
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.\
   * \
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * \
   * Example value: "ES"
   * @returns URL
   */
  GET_ALBUM_TRACKS: (
    id: string,
    limit: number = 20,
    offset: number = 0,
    market?: string
  ) =>
    `${API_BASE}/albums/${id}/tracks?limit=${limit}&offset=${offset}${
      market ? `?market=${market}` : ""
    }`,
};
