import { config } from "dotenv";

if (!process.env.CI) {
  config({
    path: ".env",
  });
}

import { suite, test } from "mocha-typescript";
import { expect } from "chai";
import { SpotifyClient } from "../src";

const client = new SpotifyClient(
  process.env.TESTS_CLIENT_ID,
  process.env.TESTS_CLIENT_SECRET
);

@suite
class SearchTest {
  async before() {
    await client.login();
  }

  @test async "should search for a track"() {
    const results = await client.search.search("natural", ["track"], {
      limit: 1,
    });
    expect(results)
      .to.be.an("object")
      .that.has.property("tracks")
      .that.is.an("object")
      .that.has.property("items")
      .that.is.an("array")
      .that.has.lengthOf(1)
      .that.has.property("0")
      .that.has.property("id", "2FY7b99s15jUprqC0M5NCT");
  }

  async after() {
    client.destroy();
  }
}
