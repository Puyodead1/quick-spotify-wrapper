import { config } from "dotenv";

config({
  path: ".env",
});

import { suite, test } from "mocha-typescript";
import { expect } from "chai";
import { SpotifyClient } from "../src";

const client = new SpotifyClient(
  process.env.TESTS_CLIENT_ID,
  process.env.TESTS_CLIENT_SECRET
);

@suite
class PlaylistsTest {
  async before() {
    await client.login();
  }

  @test async "should get a playlist"() {
    const playlist = await client.playlists.getPlaylist(
      "2AnJjcunltlCloeir9Dorm"
    );
    expect(playlist)
      .to.be.an("object")
      .that.has.property("id", "2AnJjcunltlCloeir9Dorm");
  }

  async after() {
    client.destroy();
  }
}
