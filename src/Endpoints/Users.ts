import { User } from "Interfaces";
import { SpotifyClient } from "..";
import { ENDPOINTS } from "../Constants";

export class Users {
  private readonly _client: SpotifyClient;
  constructor(client: SpotifyClient) {
    this._client = client;
  }

  /**
   * Get public profile information about a Spotify user.
   * @param id The user's Spotify user ID.\
   * Example value: "smedjan"
   * @returns A user
   */
  async getUserProfile(id: string): Promise<User> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<User>(ENDPOINTS.USERS.GET_USER(id))
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Check to see if one or more Spotify users are following a specified playlist.
   * @param playlistId The Spotify ID of the playlist.\
   * Example value: "3cEYpjA9oz9GiPac4AsH4n"
   * @param userIds A comma-separated list of Spotify User IDs ; the ids of the users that you want to check to see if they follow the playlist. Maximum: 5 ids.\
   * Example value: "jmperezperez,thelinmichael,wizzler"
   * @returns Array of booleans
   */
  async checkUsersAreFollowingPlaylist(
    playlistId: string,
    userIds: string[]
  ): Promise<boolean[]> {
    if (!this._client._token) await this._client.login();
    return new Promise((resolve, reject) => {
      this._client
        .request<boolean[]>(
          ENDPOINTS.USERS.USERS_ARE_FOLLOWING_PLAYLIST(playlistId, userIds)
        )
        .then(resolve)
        .catch(reject);
    });
  }
}
