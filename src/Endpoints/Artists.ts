import { ENDPOINTS } from "../Constants";
import { SpotifyClient } from "../index";
import {
  AlbumGroups,
  Artist,
  PaginatedAlbums,
  RecommendationsResponse,
  SeveralArtistsResponseJSON,
} from "../Interfaces";

export class Artists {
  private readonly _client: SpotifyClient;
  constructor(client: SpotifyClient) {
    this._client = client;
  }

  /**
   * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
   * @param id The Spotify ID of the artist.\
   * Example value: "0TnOYISbd1XYRBk9myaseg"
   * @returns An artist as {@link Artist}
   */
  async getArtist(id: string): Promise<Artist> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<Artist>(ENDPOINTS.ARTISTS.GET_ARTIST(id))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Get Spotify catalog information for several artists based on their Spotify IDs.
   * @param ids A comma-separated list of the Spotify IDs for the artists. Maximum: 50 IDs.\
   * Example value: "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6"
   * @returns A set of artists as {@link SeveralArtistsResponseJSON}
   */
  async getArtists(ids: string[]): Promise<SeveralArtistsResponseJSON> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<SeveralArtistsResponseJSON>(ENDPOINTS.ARTISTS.GET_ARTISTS(ids))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Get Spotify catalog information about an artist's albums.
   * @param id The Spotify ID for the artist.\
   * Example value: "0TnOYISbd1XYRBk9myaseg"
   * @param options Optional parameters that can be passed.
   * @param options.limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param options.offset The index of the first item to return. Default: 0 (the first object). Use with limit to get the next set of items.
   * @param options.include_groups A comma-separated list of {@link AlbumGroups keywords} that will be used to filter the response. If not supplied, all tracks are returned.
   * @param options.market An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.\
   * \
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.\
   * \
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * \
   * Example value: "ES"
   * @returns Pages of content as {@link PaginatedAlbums}
   */
  async getArtistAlbums(
    id: string,
    options?: {
      limit?: number;
      offset?: number;
      include_groups?: AlbumGroups[];
      market?: string;
    }
  ): Promise<PaginatedAlbums> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<PaginatedAlbums>(
          ENDPOINTS.ARTISTS.GET_ARTIST_ALBUMS(id, options)
        )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.
   * @param id The Spotify ID for the artist.\
   * Example value: "0TnOYISbd1XYRBk9myaseg"
   * @returns A set of artists as {@link SeveralArtistsResponseJSON}
   */
  async getRelatedArtists(id: string): Promise<SeveralArtistsResponseJSON> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<SeveralArtistsResponseJSON>(
          ENDPOINTS.ARTISTS.GET_RELATED_ARTISTS(id)
        )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.\
   * \
   * For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.
   * @param options
   * @param options.seed_artists A comma separated list of Spotify IDs for seed artists. Up to 5 seed values may be provided in any combination of ``seed_artists``, ``seed_tracks`` and ``seed_genres``.\
   * Example value: "4NHQUGzhtTLFvgF5SZesLK"
   * @param options.seed_genres A comma separated list of any genres in the set of available genre seeds. Up to 5 seed values may be provided in any combination of ``seed_artists``, ``seed_tracks`` and ``seed_genres``.\
   * Example value: "classical,country"
   * @param options.seed_tracks A comma separated list of Spotify IDs for a seed track. Up to 5 seed values may be provided in any combination of ``seed_artists``, ``seed_tracks`` and ``seed_genres``.\
   * Example value: "0c6xIDDpzE81m2q797ordA"
   * @param options.limit The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20. Minimum: 1. Maximum: 100.
   * @param options.market An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.\
   * \
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.\
   * \
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * \
   * Example value: "ES"
   * @param options.max_acousticness For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.\
   * \>= 0 <= 1
   * @param options.max_danceability For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.\
   * \>= 0 <= 1
   * @param options.max_duration_ms For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.
   * @param options.max_energy For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.\
   * \>= 0 <= 1
   * @param options.max_instrumentalness For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.\
   * \>= 0 <= 1
   * @param options.max_key For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.\
   * \>= 0 <= 1
   * @param options.max_liveness For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.\
   * \>= 0 <= 1
   * @param options.max_loudness For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.
   * @param options.max_mode For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.\
   * \>= 0 <= 1
   * @param options.max_popularity For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.\
   * \>= 0 <= 100
   * @param options.max_speechiness For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.\
   * \>= 0 <= 1
   * @param options.max_tempo For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.
   * @param options.max_time_signature For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.
   * @param options.max_valence For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``max_instrumentalness=0.35`` would filter out most tracks that are likely to be instrumental.\
   * \>= 0 <= 1
   * @param options.min_acousticness For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \>= 0 <= 1
   * @param options.min_danceability For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \>= 0 <= 1
   * @param options.min_duration_ms For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
   * @param options.min_energy For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \>= 0 <= 1
   * @param options.min_instrumentalness For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \>= 0 <= 1
   * @param options.min_key For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \>= 0 <= 11
   * @param options.min_liveness For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \>= 0 <= 1
   * @param options.min_loudness For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
   * @param options.min_mode For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \>= 0 <= 1
   * @param options.min_popularity For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \>= 0 <= 100
   * @param options.min_speechiness For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \>= 0 <= 1
   * @param options.min_tempo For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
   * @param options.min_time_signature For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \<= 11
   * @param options.min_valence For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, ``min_tempo=140`` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\
   * \>= 0 <= 1
   * @param options.target_acousticness For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.\
   * \>= 0 <= 1
   * @param options.target_danceability For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.\
   * \>= 0 <= 1
   * @param options.target_duration_ms Target duration of the track (ms)
   * @param options.target_energy For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.\
   * \>= 0 <= 1
   * @param options.target_instrumentalness For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.\
   * \>= 0 <= 1
   * @param options.target_key For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.\
   * \>= 0 <= 11
   * @param options.target_liveness For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.\
   * \>= 0 <= 1
   * @param options.target_loudness For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.
   * @param options.target_mode For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.\
   * \>= 0 <= 1
   * @param options.target_popularity For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.\
   * \>= 0 <= 100
   * @param options.target_speechiness For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.\
   * \>= 0 <= 1
   * @param options.target_tempo Target tempo (BPM)
   * @param options.target_time_signature For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.
   * @param options.target_valence For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request ``target_energy=0.6`` and ``target_danceability=0.8``. All target values will be weighed equally in ranking results.\
   * \>= 0 <= 1
   * @returns A set of recommendations
   */
  async getRecommendations(options?: {
    seed_artists?: string[];
    seed_genres?: string[];
    seed_tracks?: string[];
    limit?: number;
    market?: string;
    max_acousticness?: number;
    max_danceability?: number;
    max_duration_ms?: number;
    max_energy?: number;
    max_instrumentalness?: number;
    max_key?: number;
    max_liveness?: number;
    max_loudness?: number;
    max_mode?: number;
    max_popularity?: number;
    max_speechiness?: number;
    max_tempo?: number;
    max_time_signature?: number;
    max_valence?: number;
    min_acousticness?: number;
    min_danceability?: number;
    min_duration_ms?: number;
    min_energy?: number;
    min_instrumentalness?: number;
    min_key?: number;
    min_liveness?: number;
    min_loudness?: number;
    min_mode?: number;
    min_popularity?: number;
    min_speechiness?: number;
    min_tempo?: number;
    min_time_signature?: number;
    min_valence?: number;
    target_acousticness?: number;
    target_danceability?: number;
    target_duration_ms?: number;
    target_energy?: number;
    target_instrumentalness?: number;
    target_key?: number;
    target_liveness?: number;
    target_loudness?: number;
    target_mode?: number;
    target_popularity?: number;
    target_speechiness?: number;
    target_tempo?: number;
    target_time_signature?: number;
    target_valence?: number;
  }): Promise<RecommendationsResponse> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<RecommendationsResponse>(
          ENDPOINTS.ARTISTS.GET_RECOMMENDATIONS(options)
        )
        .then(resolve)
        .catch(reject);
    });
  }
}
