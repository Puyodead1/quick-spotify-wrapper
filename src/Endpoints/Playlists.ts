import { Playlist, PlaylistAdditionalTypes } from "Interfaces";
import { SpotifyClient } from "..";
import { ENDPOINTS } from "../Constants";

export class Playlists {
  private readonly _client: SpotifyClient;
  constructor(client: SpotifyClient) {
    this._client = client;
  }

  /**
   * Get a playlist owned by a Spotify user.
   * @param id The Spotify ID of the playlist.\
   * \
   * Example value: "3cEYpjA9oz9GiPac4AsH4n"
   * @param options Optional parameters that can be passed.
   * @param options.additional_types A comma-separated list of item types that your client supports besides the default ``track`` type. Valid types are {@link PlaylistAdditionalTypes}\
   * @param options.market An ISO 3166-1 alpha-2 country code. If a country code is specified, only episodes that are available in that market will be returned.\
   * \
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.\
   * \
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * \
   * Example value: "ES"
   * @returns A playlist
   */
  async getPlaylist(
    id: string,
    options?: {
      additional_types?: PlaylistAdditionalTypes[];
      market?: string;
    }
  ): Promise<Playlist> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<Playlist>(ENDPOINTS.PLAYLISTS.GET_PLAYLIST(id, options))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Change a playlist's name and public/private state. (The user must, of course, own the playlist.)
   * @warning This has not been tested and may not work correctly!
   * @param id The Spotify ID of the playlist.\
   * Example value: "3cEYpjA9oz9GiPac4AsH4n"
   * @param options Optional parameters that can be passed.
   * @param options.name The new name for the playlist, for example "My New Playlist Title"
   * @param options.public If ``true`` the playlist will be public, if ``false`` it will be private.
   * @param options.collaborative If ``true`` the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client.\
   * _**Note**: You can only set collaborative to true on non-public playlists._
   * @param options.description Value for playlist description as displayed in Spotify Clients and in the Web API.
   * @returns void
   */
  async updatePlaylistDetails(
    id: string,
    options?: { name?: string; collaborative?: boolean; description?: string }
  ): Promise<void> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<void>(ENDPOINTS.PLAYLISTS.UPDATE_PLAYLIST_DETAILS(id), {
          method: "PUT",
          body: JSON.stringify(options),
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
