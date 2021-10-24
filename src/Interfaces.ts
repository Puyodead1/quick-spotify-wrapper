export interface TokenResponseJSON {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export type AlbumType = "album" | "single" | "compilation";
export type ReleaseDatePrecision = "day" | "month" | "year";
export type RestrictionReason = "market" | "product" | "explicit";

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Restrictions {
  reason: RestrictionReason;
}

export interface Followers {
  href: null; // unsupported
  total: number;
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
}

export interface Track {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
}

export interface AlbumTracks {
  href: string;
  items: Track[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface AlbumResponseJSON {
  album_type: AlbumType;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  restrictions: Restrictions;
  type: "album";
  uri: string;
  artists: Artist[];
  tracks: AlbumTracks[];
}

export interface SeveralAlbumsResponseJSON {
  albums: AlbumResponseJSON[];
}

export interface AlbumTracksResponseJSON {
  href: string;
  items: Track[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface PaginatedAlbums {
  href: string;
  items: AlbumResponseJSON[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface BrowseNewReleasesResponseJSON {
  albums: PaginatedAlbums;
}
