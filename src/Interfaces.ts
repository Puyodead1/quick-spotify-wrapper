export type AlbumType = "album" | "single" | "compilation";
export type ReleaseDatePrecision = "day" | "month" | "year";
export type RestrictionReason = "market" | "product" | "explicit";
export type AlbumGroup = AlbumType | "appears_on";
export type RecommendationSeedType = "artist" | "track" | "genre";
export type SearchType =
  | "artist"
  | "album"
  | "track"
  | "playlist"
  | "show"
  | "episode";
export type CopyrightType = "C" | "P";
export type SearchIncludeExternalTypes = "audio";
export type PlaylistAdditionalTypes = "track" | "episode";

export interface HTTPErrorObject {
  error: {
    /**
     * The HTTP status code (also returned in the response header; see Response Status Codes for more information).\
     * \>= 400 <= 599
     */
    status: number;
    /**
     * A short description of the cause of the error.
     */
    message: string;
  };
}

export interface TokenResponseJSON {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface ExternalUrls {
  /**
   * The Spotify URI for the object.
   */
  spotify?: string;
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
  restrictions?: Restrictions;
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

export interface PaginatedResponseBase<T> {
  /**
   * A link to the Web API endpoint returning the full result of the request
   */
  href: string;
  /**
   * The requested content
   */
  items: T[];
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

export interface ExternalIds {
  /**
   * International Standard Recording Code
   */
  isrc?: string;
  /**
   * International Article Number
   */
  ean?: string;
  /**
   * Universal Product Code
   */
  upc?: string;
}

export interface SearchTrackResponse {
  /**
   * The album on which the track appears. The album object includes a link in ``href`` to full information about the album.
   */
  album: Album;
  /**
   * The artists of the album. Each artist object includes a link in ``href`` to more detailed information about the artist.
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
   * Known external IDs for this track.
   */
  external_ids: ExternalIds;
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
   * The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.\
   * \
   * The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.\
   * \
   * Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity.
   * \
   * **Note**: _the popularity value may lag actual popularity by a few days: the value is not updated in real time._
   */
  popularity: number;
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

export interface Track {
  /**
   * The album on which the track appears. The album object includes a link in ``href`` to full information about the album.
   */
  album: Album & {
    /**
     * The artists of the album. Each artist object includes a link in ``href`` to more detailed information about the artist.
     */
    artists: Artist[];
    /**
     * The field is present when getting an artist's albums. Compare to album_type this field represents relationship between the artist and the album.\
     * One of: {@link AlbumGroup}
     */
    album_group: AlbumGroup;
  };
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
   * Known external IDs for this track.
   */
  external_ids: ExternalIds;
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
   * Part of the response when Track Relinking is applied, and the requested track has been replaced with different track. The track in the ``linked_from`` object contains information about the originally requested track.
   */
  linked_from: Track[];
  /**
   * Included in the response when a content restriction is applied. See {@link Restrictions Restriction Object} for more details.
   */
  restrictions: Restrictions;
  /**
   * The name of the track.
   */
  name: string;
  /**
   * The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.\
   * \
   * The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.\
   * \
   * Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity.
   * \
   * **Note**: _the popularity value may lag actual popularity by a few days: the value is not updated in real time._
   */
  popularity: number;
  /**
   * A link to a 30 second preview (MP3 format) of the track. Can be ``null``
   */
  preview_url: string | null;
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

export interface User {
  /**
   * The name displayed on the user's profile. ``null`` if not available.
   */
  display_name: string;
  /**
   * Known external URLs for this user.
   */
  external_urls: ExternalUrls;
  /**
   * Information about the followers of the user.
   */
  followers: Followers;
  /**
   * A link to the Web API endpoint for this user.
   */
  href: string;
  /**
   * The Spotify user ID for the user.
   */
  id: string;
  /**
   * The user's profile image.
   */
  images: Image[];
  /**
   * The object type: "user"
   */
  type: "user";
  /**
   * The Spotify URI for the user.
   */
  uri: string;
}

export interface Playlist {
  /**
   * ``true`` if the owner allows other users to modify the playlist.
   */
  collaborative: boolean;
  /**
   * The playlist description. Only returned for modified, verified playlists, otherwise ``null``.
   */
  description: string;
  /**
   * Known external URLs for this playlist.
   */
  external_urls: ExternalUrls;
  /**
   * Information about the followers of the playlist.
   */
  followers: Followers;
  /**
   * A link to the Web API endpoint providing full details of the playlist.
   */
  href: string;
  /**
   * The Spotify ID for the playlist.
   */
  id: string;
  /**
   * Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/) for more about playlists.\
   * **Note**: _If returned, the source URL for the image (``url``) is temporary and will expire in less than a day._
   */
  images: Image[];
  /**
   * The name of the playlist.
   */
  name: string;
  /**
   * The user who owns the playlist.
   */
  owner: User;
  /**
   * The playlist's public/private status: ``true`` the playlist is public, ``false`` the playlist is private, ``null`` the playlist status is not relevant. For more about public/private status, see Working with Playlists
   */
  public: boolean;
  /**
   * The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version.
   */
  snapshot_id: string;
  /**
   * The tracks of the playlist.
   */
  tracks: PaginatedTracks;
  /**
   * The object type: "playlist"
   */
  type: "playlist";
  /**
   * The Spotify URI for the playlist.
   */
  uri: string;
}

export interface Copyrights {
  /**
   * The copyright text for this content.
   */
  text: string;
  /**
   * The type of copyright: ``C`` = the copyright, ``P`` = the sound recording (performance) copyright.\
   * One of {@link CopyrightType}
   */
  type: CopyrightType;
}

export interface Show {
  /**
   * A list of the countries in which the show can be played, identified by their ISO 3166-1 alpha-2 code.
   */
  available_markets: string[];
  /**
   * The copyright statements of the show.
   */
  copyrights: Copyrights[];
  /**
   * A description of the show. HTML tags are stripped away from this field, use ``html_description`` field in case HTML tags are needed.
   */
  description: string;
  /**
   * A description of the show. This field may contain HTML tags.
   */
  html_description: string;
  /**
   * Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * External URLs for this show.
   */
  external_urls: ExternalUrls;
  /**
   * A link to the Web API endpoint providing full details of the show.
   */
  href: string;
  /**
   * The Spotify ID for the show.
   */
  id: string;
  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: Image[];
  /**
   * True if all of the show's episodes are hosted outside of Spotify's CDN. This field might be ``null`` in some cases.
   */
  is_externally_hosted: boolean | null;
  /**
   * A list of the languages used in the show, identified by their ISO 639 code.
   */
  languages: string[];
  /**
   * The media type of the show.
   */
  media_type: string;
  /**
   * The name of the show.
   */
  name: string;
  /**
   * The publisher of the show.
   */
  publisher: string;
  /**
   * The object type: "show"
   */
  type: "show";
  /**
   * The Spotify URI for the show.
   */
  uri: string;
  /**
   * The episodes of the show.
   */
  episodes: PaginatedEpisodes[];
}

export interface EpisodeShow {
  /**
   * A list of the countries in which the show can be played, identified by their ISO 3166-1 alpha-2 code.
   */
  available_markets: string[];
  /**
   * The copyright statements of the show.
   */
  copyrights: Copyrights[];
  /**
   * A description of the show. HTML tags are stripped away from this field, use ``html_description`` field in case HTML tags are needed.
   */
  description: string;
  /**
   * A description of the show. This field may contain HTML tags.
   */
  html_description: string;
  /**
   * Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * External URLs for this show.
   */
  external_urls: ExternalUrls;
  /**
   * A link to the Web API endpoint providing full details of the show.
   */
  href: string;
  /**
   * The Spotify ID for the show.
   */
  id: string;
  /**
   * The cover art for the show in various sizes, widest first.
   */
  images: Image[];
  /**
   * True if all of the show's episodes are hosted outside of Spotify's CDN. This field might be ``null`` in some cases.
   */
  is_externally_hosted: boolean | null;
  /**
   * A list of the languages used in the show, identified by their ISO 639 code.
   */
  languages: string[];
  /**
   * The media type of the show.
   */
  media_type: string;
  /**
   * The name of the show.
   */
  name: string;
  /**
   * The publisher of the show.
   */
  publisher: string;
  /**
   * The object type: "show"
   */
  type: "show";
  /**
   * The Spotify URI for the show.
   */
  uri: string;
}

export interface ResumePoint {
  /**
   * Whether or not the episode has been fully played by the user.
   */
  fully_played: boolean;
  /**
   * The user's most recent position in the episode in milliseconds.
   */
  resume_position_ms: number;
}

export interface Episode {
  /**
   * A URL to a 30 second preview (MP3 format) of the episode. ``null`` if not available.
   */
  audio_preview_url: string;
  /**
   * A description of the episode. HTML tags are stripped away from this field, use ``html_description`` field in case HTML tags are needed.
   */
  description: string;
  /**
   * A description of the episode, with HTML tags included.
   */
  html_description: string;
  /**
   * The episode's duration in milliseconds.
   */
  duration_ms: number;
  /**
   * Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).
   */
  explicit: boolean;
  /**
   * Known external URLs for this episode.
   */
  external_urls: ExternalUrls;
  /**
   * A link to the Web API endpoint providing full details of the episode.
   */
  href: string;
  /**
   * The Spotify ID for the episode.
   */
  id: string;
  /**
   * The cover art for the episode in various sizes, widest first.
   */
  images: Image[];
  /**
   * True if the episode is hosted outside of Spotify's CDN.
   */
  is_externally_hosted: boolean;
  /**
   * True if the episode is playable in the given market. Otherwise false.
   */
  is_playable: boolean;
  /**
   * The language used in the episode, identified by a ISO 639 code.
   * @deprecated This field is deprecated and might be removed in the future. Please use the languages field instead.
   */
  language: string;
  /**
   * A list of the languages used in the episode, identified by their ISO 639-1 code.
   */
  languages: string[];
  /**
   * The name of the episode.
   */
  name: string;
  /**
   * The date the episode was first released, for example ``"1981-12-15"``. Depending on the precision, it might be shown as ``"1981"`` or ``"1981-12"``.
   */
  release_date: string;
  /**
   * The precision with which ``release_date`` value is known.\
   * One of: {@link ReleaseDatePrecision}
   */
  release_date_precision: ReleaseDatePrecision;
  /**
   * The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.
   */
  resume_point: ResumePoint;
  /**
   * The object type: "episode"
   */
  type: "episode";
  /**
   * The Spotify URI for the episode.
   */
  uri: string;
  /**
   * Included in the response when a content restriction is applied. See {@link Restrictions Restriction Object} for more details.
   */
  restrictions: Restrictions;
  /**
   * The show that the episode belongs to.
   */
  show: EpisodeShow;
}

export interface PaginatedAlbums extends PaginatedResponseBase<Album> {}
export interface PaginatedTracks extends PaginatedResponseBase<Track> {}
export interface PaginatedArtists extends PaginatedResponseBase<Artist> {}
export interface PaginatedPlaylists extends PaginatedResponseBase<Playlist> {}
export interface PaginatedShows extends PaginatedResponseBase<Show> {}
export interface PaginatedEpisodes extends PaginatedResponseBase<Episode> {}

export interface SearchResponse {
  tracks: PaginatedTracks;
  artists: PaginatedArtists;
  albums: PaginatedAlbums;
  playlists: PaginatedPlaylists;
  shows: PaginatedShows;
  episodes: PaginatedEpisodes;
}
