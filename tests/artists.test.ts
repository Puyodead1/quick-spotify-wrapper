import { suite, test } from "mocha-typescript";
import { expect } from "chai";
import { SpotifyClient } from "../src";
import { CLIENT_ID, CLIENT_SECRET } from "./config.json";

const client = new SpotifyClient(CLIENT_ID, CLIENT_SECRET);

@suite
class ArtistsTest {
  async before() {
    await client.login();
  }

  @test async "should get a single artist"() {
    const artist = await client.artists.getArtist("53XhwfbYqKCa1cC15pYq2q");
    expect(artist)
      .to.be.an("object")
      .that.has.property("name", "Imagine Dragons");
  }

  @test async "should get several artists"() {
    const artists = await client.artists.getArtists([
      "53XhwfbYqKCa1cC15pYq2q",
      "5Pwc4xIPtQLFEnJriah9YJ",
    ]);
    expect(artists)
      .to.be.an("object")
      .that.has.property("artists")
      .that.is.an("array")
      .that.has.length(2)
      .that.satisfies((albums) =>
        albums.every(
          (album) =>
            album.name === "Imagine Dragons" || album.name === "OneRepublic"
        )
      );
  }

  @test async "should get an artist's albums"() {
    const albums = await client.artists.getArtistAlbums(
      "5Pwc4xIPtQLFEnJriah9YJ"
    );
    expect(albums)
      .to.be.an("object")
      .that.has.property("items")
      .that.is.an("array")
      .that.has.property("0")
      .that.has.property("id")
      .that.is.a("string");
  }

  @test async "should get an artists's albums with a limit of 1"() {
    const albums = await client.artists.getArtistAlbums(
      "5Pwc4xIPtQLFEnJriah9YJ",
      { limit: 1 }
    );
    expect(albums)
      .to.be.an("object")
      .that.has.property("items")
      .that.is.an("array")
      .that.has.length(1)
      .that.has.property("0")
      .that.has.property("id")
      .that.is.a("string");
  }

  @test
  async "should get an artists's albums with limit of 1 and offset of 1"() {
    const albums = await client.artists.getArtistAlbums(
      "5Pwc4xIPtQLFEnJriah9YJ",
      { limit: 1, offset: 1 }
    );
    expect(albums)
      .to.be.an("object")
      .that.has.property("items")
      .that.is.an("array")
      .that.has.length(1)
      .that.has.property("0")
      .that.has.property("id")
      .that.is.a("string");
  }

  @test
  async "should get an artists's albums with includeGroups as single and limit of 1"() {
    const albums = await client.artists.getArtistAlbums(
      "5Pwc4xIPtQLFEnJriah9YJ",
      {
        limit: 1,
        include_groups: ["single"],
      }
    );

    expect(albums)
      .to.be.an("object")
      .that.has.property("items")
      .that.is.an("array")
      .that.has.length(1)
      .that.has.property("0")
      .that.has.property("id")
      .that.is.a("string");
  }

  @test async "should get related artists"() {
    const newReleases = await client.artists.getRelatedArtists(
      "5Pwc4xIPtQLFEnJriah9YJ"
    );
    expect(newReleases)
      .to.be.an("object")
      .that.has.property("artists")
      .that.is.an("array")
      .that.has.property("0")
      .that.has.property("id")
      .that.is.a("string");
  }

  @test async "should get recommendations"() {
    const recommendations = await client.artists.getRecommendations({
      seed_artists: ["53XhwfbYqKCa1cC15pYq2q", "5Pwc4xIPtQLFEnJriah9YJ"],
      seed_genres: ["pop"],
      seed_tracks: ["6sy3LkhNFjJWlaeSMNwQ62", "2FY7b99s15jUprqC0M5NCT"],
    });

    console.log(
      "Recommendations:",
      recommendations.tracks.map((x) => x.name).join(", ")
    );

    expect(recommendations)
      .to.be.an("object")
      .that.has.property("tracks")
      .that.is.an("array")
      .that.has.property("0")
      .that.has.property("id")
      .that.is.a("string");
  }

  async after() {
    client.destroy();
  }
}
