import { fetch, FetchResultTypes } from "@sapphire/fetch";
import { Albums } from "./Endpoints/Albums";
import { ENDPOINTS } from "./Constants";
import { TokenResponseJSON } from "./Interfaces";
import { Artists } from "./Endpoints/Artists";
import { Search } from "./Endpoints/Search";
import { Users } from "./Endpoints/Users";
import { Playlists } from "./Endpoints/Playlists";

export class SpotifyClient {
  /**
   * @internal
   */
  public readonly _clientId: string;
  /**
   * @internal
   */
  public readonly _clientSecret: string;
  /**
   * @internal
   */
  public _token: string | null = null;
  /**
   * @internal
   */
  public _refreshInterval: NodeJS.Timer | null = null;
  public isAuthenticated: boolean = false;
  /**
   * Class that handles the Albums endpoints
   */
  public readonly albums: Albums;
  /**
   * Class that handles the Artists endpoints
   */
  public readonly artists: Artists;
  /**
   * Class that handles the Search endpoint
   */
  public readonly search: Search;
  /**
   * Class that handles the Users endpoints
   */
  public readonly users: Users;
  /**
   * Class that handles the Playlists endpoints
   */
  public readonly playlists: Playlists;

  /**
   *
   * @param clientId The client ID of the application
   * @param clientSecret The client secret of the application
   */
  constructor(clientId: string, clientSecret: string) {
    this._clientId = clientId.trim();
    this._clientSecret = clientSecret.trim();
    this.albums = new Albums(this);
    this.artists = new Artists(this);
    this.search = new Search(this);
    this.users = new Users(this);
    this.playlists = new Playlists(this);
  }

  /**
   * Creates a new request to the specified url
   * @internal
   * @param url The URL to fetch
   * @param options The options to pass to the fetch function
   * @returns
   */
  request<T>(url: string, options: RequestInit = {}): Promise<T> {
    if (!this._token) {
      throw new Error("No token has been acquired yet.");
    }

    return fetch<T>(
      url,
      {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${this._token}`,
        },
      },
      FetchResultTypes.JSON
    );
  }

  /**
   * Creates a refresh timer that will refresh the token in `expiresIn` milliseconds.
   * @internal
   * @param ms time in milliseconds
   */
  createRefreshTimer(expiresIn: number): void {
    this._refreshInterval = setTimeout(() => {
      this.login();
    }, expiresIn * 1000);
  }

  destroy(): void {
    if (this._refreshInterval) {
      clearTimeout(this._refreshInterval);
    }
  }

  /**
   * Fetches a new token from the Spotify API.
   * @async
   * @returns A promise that resolves when the token has been acquired.
   */
  async login(): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch<TokenResponseJSON>(
        ENDPOINTS.TOKEN_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${this._clientId}:${this._clientSecret}`
            ).toString("base64")}`,
          },
          body: new URLSearchParams({ grant_type: "client_credentials" }),
        },
        FetchResultTypes.JSON
      )
        .then((res) => {
          this._token = res.access_token;
          const expiresIn = res.expires_in;
          this.createRefreshTimer(expiresIn);
          resolve();
        })
        .catch(reject);
    });
  }
}
