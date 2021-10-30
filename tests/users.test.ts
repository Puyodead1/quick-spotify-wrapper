import { config } from "dotenv";
import { resolve } from "path";

config({
  path: resolve(__dirname, ".env"),
});

import { suite, test } from "mocha-typescript";
import { expect } from "chai";
import { SpotifyClient } from "../src";

const client = new SpotifyClient(
  process.env.TESTS_CLIENT_ID,
  process.env.TESTS_CLIENT_SECRET
);

@suite
class UsersTest {
  async before() {
    await client.login();
  }

  @test async "should get a users profile"() {
    const user = await client.users.getUserProfile("puyodead1");
    expect(user).to.be.an("object").that.has.property("id", "puyodead1");
  }

  @test async "should check if one or more users are following a playlist"() {
    const results = await client.users.checkUsersAreFollowingPlaylist(
      "2AnJjcunltlCloeir9Dorm",
      ["puyodead1", "313mb2ewmpq7wrcwryyzvba6ieim"]
    );

    expect(results)
      .to.be.an("array")
      .that.has.length(2)
      .that.eql([true, false]);
  }

  async after() {
    client.destroy();
  }
}
