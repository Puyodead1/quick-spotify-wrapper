export interface TokenResponseJSON {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export type AlbumType = "album" | "single" | "compilation";
export type ReleaseDatePrecision = "day" | "month" | "year";
export type RestrictionReason = "market" | "product" | "explicit";
export type AlbumGroups = AlbumType | "appears_on";
export type RecommendationSeedType = "artist" | "track" | "genre";

export interface ExternalUrls {
  /**
   * The Spotify URI for the object.
   */
  spotify: string;
}

export interface Image {
  /**
   * The source URL of the image.
   */
  url: string;
  /**
   * The width of the image in pixels.
   */
  width: number;
  /**
   * The height of the image in pixels.
   */
  height: number;
}

export interface Restrictions {
  /**
   * The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content. Additional reasons may be added in the future.\
   * One of: {@link RestrictionReason}
   */
  reason: RestrictionReason;
}

export interface Followers {
  /**
   * This will always be set to ``null``, as the Web API does not support it at the moment.
   */
  href: null; // unsupported
  /**
   * The total number of followers.
   */
  total: number;
}

export interface Artist {
  /**
   * Known external URLs for this artist.
   */
  external_urls: ExternalUrls;
  /**
   * Information about the followers of the artist.
   */
  followers: Followers;
  /**
   * A list of the genres the artist is associated with. If not yet classified, the array is empty.
   */
  genres: string[];
  /**
   * A link to the Web API endpoint providing full details of the artist.
   */
  href: string;
  /**
   * The Spotify ID for the artist.
   */
  id: string;
  /**
   * Images of the artist in various sizes, widest first.
   */
  images: Image[];
  /**
   * The name of the artist.
   */
  name: string;
  /**
   * The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.
   */
  popularity: number;
  /**
   * The object type: "artist"
   */
  type: "artist";
  /**
   * The Spotify URI for the artist.
   */
  uri: string;
}

export interface AlbumSimplifiedTrack {
  /**
   * The artists who performed the track. Each artist object includes a link in ``href`` to more detailed information about the artist.
   */
  artists: Artist[];
  /**
   * A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code.
   */
  available_markets: string[];
  /**
   * The disc number (usually ``1`` unless the album consists of more than one disc).
   */
  disc_number: number;
  /**
   * The track length in milliseconds.
   */
  duration_ms: number;
  /**
   * Whether or not the track has explicit lyrics (``true`` = yes it does; ``false`` = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * Known external URLs for this track.
   */
  external_urls: ExternalUrls;
  /**
   * A link to the Web API endpoint providing full details of the track.
   */
  href: string;
  /**
   * The Spotify ID for the track.
   */
  id: string;
  /**
   * Whether or not the track is from a local file.
   */
  is_local: boolean;
  /**
   * The name of the track.
   */
  name: string;
  /**
   * A link to a 30 second preview (MP3 format) of the track. Can be ``null``
   */
  preview_url: string;
  /**
   * The number of the track. If an album has several discs, the track number is the number on the specified disc.
   */
  track_number: number;
  /**
   * The object type: "track"
   */
  type: "track";
  /**
   * The Spotify URI for the track.
   */
  uri: string;
}

export interface AlbumTracks {
  /**
   * A link to the Web API endpoint returning the full result of the request
   */
  href: string;
  /**
   * The requested content
   */
  items: AlbumSimplifiedTrack[];
  /**
   * The maximum number of items in the response (as set in the query or by default).
   */
  limit: number;
  /**
   * URL to the next page of items. (``null`` if none)
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default).
   */
  offset: number;
  /**
   * URL to the previous page of items. (``null`` if none)
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   */
  total: number;
}

export interface Album {
  /**
   * The type of the album. One of {@link AlbumType}
   */
  album_type: AlbumType;
  /**
   * The number of tracks in the album.
   */
  total_tracks: number;
  /**
   * The markets in which the album is available: ISO 3166-1 alpha-2 country codes.\
   * NOTE: an album is considered available in a market when at least 1 of its tracks is available in that market.
   */
  available_markets: string[];
  /**
   * Known external URLs for this album.
   */
  external_urls: ExternalUrls;
  /**
   * A link to the Web API endpoint providing full details of the album.
   */
  href: string;
  /**
   * The Spotify ID for the album.
   */
  id: string;
  /**
   * The cover art for the album in various sizes, widest first.
   */
  images: Image[];
  /**
   * The name of the album. In case of an album takedown, the value may be an empty string.
   */
  name: string;
  /**
   * The date the album was first released.
   */
  release_date: string;
  /**
   * The precision of the release date: one of {@link ReleaseDatePrecision}
   */
  release_date_precision: ReleaseDatePrecision;
  /**
   * Included in the response when a content restriction is applied.
   */
  restrictions: Restrictions;
  /**
   * The object type: "album"
   */
  type: "album";
  /**
   * The Spotify URI for the album.
   */
  uri: string;
  /**
   * The artists of the album. Each artist object includes a link in ``href`` to more detailed information about the artist.
   */
  artists: Artist[];
  /**
   * The tracks of the album.
   */
  tracks: AlbumTracks[];
}

export interface SeveralAlbumsResponseJSON {
  albums: Album[];
}

export interface AlbumTracks {
  /**
   * A link to the Web API endpoint returning the full result of the request
   */
  href: string;
  /**
   * A link to the Web API endpoint returning the full result of the request
   */
  items: AlbumSimplifiedTrack[];
  /**
   * The maximum number of items in the response (as set in the query or by default).
   */
  limit: number;
  /**
   * URL to the next page of items. (``null`` if none)
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default).
   */
  offset: number;
  /**
   * URL to the previous page of items. (``null`` if none)
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   */
  total: number;
}

export interface PaginatedAlbums {
  /**
   * A link to the Web API endpoint returning the full result of the request
   */
  href: string;
  /**
   * The requested content
   */
  items: Album[];
  /**
   * The maximum number of items in the response (as set in the query or by default)
   */
  limit: number;
  /**
   * URL to the next page of items. (``null`` if none)
   */
  next: string | null;
  /**
   * The offset of the items returned (as set in the query or by default)
   */
  offset: number;
  /**
   * URL to the previous page of items. (``null`` if none)
   */
  previous: string | null;
  /**
   * The total number of items available to return.
   */
  total: number;
}

export interface BrowseNewReleasesResponseJSON {
  albums: PaginatedAlbums;
}

export interface SeveralArtistsResponseJSON {
  artists: Artist[];
}

export interface RecommendationSeed {
  /**
   * The number of tracks available after min_* and max_* filters have been applied.
   */
  afterFilteringSize: number;
  /**
   * The number of tracks available after relinking for regional availability.
   */
  afterRelinkingSize: number;
  /**
   * A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be ``null``.
   */
  href: string | null;
  /**
   * The id used to select this seed. This will be the same as the string used in the ``seed_artists``, ``seed_tracks`` or ``seed_genres`` parameter.
   */
  id: string;
  /**
   * The number of recommended tracks available for this seed.
   */
  initialPoolSize: number;
  /**
   * The entity type of this seed. One of {@link RecommendationSeedType}
   */
  type: RecommendationSeedType;
}

export interface LinkedFrom {
  /**
   * Known external URLs for this track.
   */
  external_urls: ExternalUrls;
  /**
   * A link to the Web API endpoint providing full details of the track.
   */
  href: string;
  /**
   * The Spotify ID for the track.
   */
  id: string;
  /**
   * The object type: "track".
   */
  type: "track";
}

export interface RecommendationsSimplifiedTrack {
  /**
   * The artists who performed the track. Each artist object includes a link in ``href`` to more detailed information about the artist.
   */
  artists: Artist[];
  /**
   * A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code.
   */
  available_markets: string[];
  /**
   * The disc number (usually ``1`` unless the album consists of more than one disc).
   */
  disc_number: number;
  /**
   * The track length in milliseconds.
   */
  duration_ms: number;
  /**
   * Whether or not the track has explicit lyrics (``true`` = yes it does; ``false`` = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * Known external URLs for this track.
   */
  external_urls: ExternalUrls;
  /**
   * A link to the Web API endpoint providing full details of the track.
   */
  href: string;
  /**
   * The Spotify ID for the track.
   */
  id: string;
  /**
   * Part of the response when Track Relinking is applied. If ``true``, the track is playable in the given market. Otherwise ``false``.
   */
  is_playable: boolean;
  /**
   * Part of the response when Track Relinking is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the ``linked_from`` object contains information about the originally requested track.
   */
  linked_from: LinkedFrom;
  /**
   * Included in the response when a content restriction is applied. See {@link Restrictions Restriction Object} for more details.
   */
  restrictions: Restrictions;
  /**
   * The name of the track.
   */
  name: string;
  /**
   * A link to a 30 second preview (MP3 format) of the track. Can be ``null``
   */
  preview_url: string;
  /**
   * The number of the track. If an album has several discs, the track number is the number on the specified disc.
   */
  track_number: number;
  /**
   * The object type: "track"
   */
  type: "track";
  /**
   * The Spotify URI for the track.
   */
  uri: string;
  /**
   * Whether or not the track is from a local file.
   */
  is_local: boolean;
}

export interface RecommendationsResponse {
  /**
   * An array of recommendation seed objects.
   */
  seeds: RecommendationSeed[];
  /**
   * An array of track object (simplified) ordered according to the parameters supplied.
   */
  tracks: RecommendationsSimplifiedTrack[];
}
