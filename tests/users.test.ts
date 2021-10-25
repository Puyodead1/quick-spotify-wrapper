import { suite, test } from "mocha-typescript";
import { expect } from "chai";
import { SpotifyClient } from "../src";
import { CLIENT_ID, CLIENT_SECRET } from "./config.json";

const client = new SpotifyClient(CLIENT_ID, CLIENT_SECRET);

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
