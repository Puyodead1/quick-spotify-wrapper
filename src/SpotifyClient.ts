import { fetch, FetchResultTypes } from "@sapphire/fetch";
import { Albums } from "./Endpoints/Albums";
import { ENDPOINTS } from "./Constants";
import { TokenResponseJSON } from "./Interfaces";

export class SpotifyClient {
  public readonly clientId: string;
  public readonly clientSecret: string;
  public _token: string | null = null;
  public refreshInterval: NodeJS.Timer | null = null;
  public isAuthenticated: boolean = false;
  public readonly albums: Albums;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.albums = new Albums(this);
  }

  request<T>(url: string, options: RequestInit = {}): Promise<T> {
    if (!this._token) {
      throw new Error("No token has been acquired yet.");
    }

    return fetch<T>(
      `${ENDPOINTS.API_BASE}${url}`,
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
   * @param ms time in milliseconds
   */
  createRefreshTimer(expiresIn: number): void {
    this.refreshInterval = setTimeout(() => {
      this.login();
    }, expiresIn * 1000);
  }

  destroy(): void {
    if (this.refreshInterval) {
      clearTimeout(this.refreshInterval);
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
              `${this.clientId}:${this.clientSecret}`
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
