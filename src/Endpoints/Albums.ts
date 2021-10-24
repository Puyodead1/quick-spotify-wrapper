import { SpotifyClient } from "..";

export class Albums {
  private readonly _client: SpotifyClient;
  constructor(client: SpotifyClient) {
    this._client = client;
  }
}
