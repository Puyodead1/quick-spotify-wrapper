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
class AlbumsTest {
  async before() {
    await client.login();
  }

  @test async "should get a single album"() {
    const album = await client.albums.getAlbum("33pt9HBdGlAbRGBHQgsZsU");
    expect(album).to.be.an("object").that.has.property("name", "Evolve");
  }

  @test async "should get several albums"() {
    const albums = await client.albums.getAlbums([
      "33pt9HBdGlAbRGBHQgsZsU",
      "2bbhW5ifCwOYM8DMkqoYBF",
    ]);
    expect(albums)
      .to.be.an("object")
      .that.has.property("albums")
      .that.is.an("array")
      .that.has.length(2)
      .that.satisfies((albums) =>
        albums.every(
          (album) => album.name === "Evolve" || album.name === "Native"
        )
      );
  }

  @test async "should get an album's tracks"() {
    const tracks = await client.albums.getTracks("33pt9HBdGlAbRGBHQgsZsU");
    expect(tracks)
      .to.be.an("object")
      .that.has.property("items")
      .that.is.an("array")
      .that.satisfies((tracks) => tracks[0].name === "Next To Me");
  }

  @test async "should get an album's tracks with a limit of 1"() {
    const tracks = await client.albums.getTracks("33pt9HBdGlAbRGBHQgsZsU", {
      limit: 1,
    });
    expect(tracks)
      .to.be.an("object")
      .that.has.property("items")
      .that.is.an("array")
      .that.has.length(1)
      .that.satisfies((tracks) => tracks[0].name === "Next To Me");
  }

  @test
  async "should get an album's tracks with options and offset of 1 and a limit of 1"() {
    const tracks = await client.albums.getTracks("33pt9HBdGlAbRGBHQgsZsU", {
      limit: 1,
      offset: 1,
    });
    expect(tracks)
      .to.be.an("object")
      .that.has.property("items")
      .that.is.an("array")
      .that.has.length(1)
      .that.satisfies((tracks) => tracks[0].name === "I Don’t Know Why");
  }

  @test async "should get new releases"() {
    const newReleases = await client.albums.getNewReleases();
    expect(newReleases)
      .to.be.an("object")
      .that.has.property("albums")
      .that.is.an("object")
      .that.has.property("items")
      .that.is.an("array")
      .that.has.length(20)
      .that.has.property("0")
      .that.has.property("id")
      .that.is.a("string");
  }

  async after() {
    client.destroy();
  }
}
