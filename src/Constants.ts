import { AlbumGroup, SearchIncludeExternalTypes, SearchType } from "Interfaces";
import { join } from "path/posix";

function buildURL(endpoint: string, params?: any) {
  const url = new URL(`${ENDPOINTS.API_BASE}${endpoint}`);
  if (params) {
    Object.keys(params).forEach((key) => {
      if (!params[key]) return;
      url.searchParams.append(key, (params as any)[key as any]);
    });
  }
  return url.toString();
}

export const ENDPOINTS = {
  API_BASE: "https://api.spotify.com/v1",
  TOKEN_URL: "https://accounts.spotify.com/api/token",
  ALBUMS: {
    GET_ALBUM: (id: string, options?: { market?: string }) =>
      buildURL(`/albums/${id}`, options),

    GET_ALBUMS: (ids: string[], options?: { market?: string }) =>
      buildURL(`/albums`, { ids: ids.join(","), ...options }),

    GET_ALBUM_TRACKS: (
      id: string,
      options?: { limit?: number; offset?: number; market?: string }
    ) => buildURL(`/albums/${id}/tracks`, options),

    BROWSE_NEW_RELEASES: (options?: {
      limit?: number;
      offset?: number;
      country?: string;
    }) => buildURL(`/browse/new-releases`, options),
  },
  ARTISTS: {
    GET_ARTIST: (id: string) => buildURL(`/artists/${id}`),
    GET_ARTISTS: (ids: string[]) =>
      buildURL(`/artists`, { ids: ids.join(",") }),
    GET_ARTIST_ALBUMS: (
      id: string,
      options?: {
        limit?: number;
        offset?: number;
        include_groups?: AlbumGroup[];
        market?: string;
      }
    ) => buildURL(`/artists/${id}/albums`, options),
    GET_RELATED_ARTISTS: (id: string) =>
      buildURL(`/artists/${id}/related-artists`),
    GET_RECOMMENDATIONS: (options?: {
      seed_artists?: string[];
      seed_genres?: string[];
      seed_tracks?: string[];
      limit?: number;
      market?: string;
      max_acousticness?: number;
      max_danceability?: number;
      max_duration_ms?: number;
      max_energy?: number;
      max_instrumentalness?: number;
      max_key?: number;
      max_liveness?: number;
      max_loudness?: number;
      max_mode?: number;
      max_popularity?: number;
      max_speechiness?: number;
      max_tempo?: number;
      max_time_signature?: number;
      max_valence?: number;
      min_acousticness?: number;
      min_danceability?: number;
      min_duration_ms?: number;
      min_energy?: number;
      min_instrumentalness?: number;
      min_key?: number;
      min_liveness?: number;
      min_loudness?: number;
      min_mode?: number;
      min_popularity?: number;
      min_speechiness?: number;
      min_tempo?: number;
      min_time_signature?: number;
      min_valence?: number;
      target_acousticness?: number;
      target_danceability?: number;
      target_duration_ms?: number;
      target_energy?: number;
      target_instrumentalness?: number;
      target_key?: number;
      target_liveness?: number;
      target_loudness?: number;
      target_mode?: number;
      target_popularity?: number;
      target_speechiness?: number;
      target_tempo?: number;
      target_time_signature?: number;
      target_valence?: number;
    }) => buildURL(`/recommendations`, options),
  },
  SHOWS: {
    GET_SHOW: (id: string) => buildURL(`/shows/${id}`),
    GET_SHOWS: (ids: string[], options?: { market?: string }) =>
      buildURL(`/shows`, { ids: ids.join(","), ...options }),
    GET_SHOW_EPISODES: (
      id: string,
      options?: { limit?: number; offset?: number; market?: string }
    ) => buildURL(`/shows/${id}/episodes`, options),
  },
  EPISODES: {
    GET_EPISODE: (id: string, options?: { market?: string }) =>
      buildURL(`/episodes/${id}`, options),
    GET_EPISODES: (ids: string[], options?: { market?: string }) =>
      buildURL(`/episodes`, { ids: ids.join(","), ...options }),
  },
  TRACKS: {
    GET_TRACK: (id: string, options?: { market?: string }) =>
      buildURL(`/tracks/${id}`, options),
    GET_TRACKS: (ids: string[], options?: { market?: string }) =>
      buildURL(`/tracks`, { ids: ids.join(","), ...options }),
    GET_TRACK_AUDIO_FEATURES: (id: string) =>
      buildURL(`/audio-features`, { id }),
    GET_TRACKS_AUDIO_FEATURES: (ids: string[]) =>
      buildURL(`/audio-features`, { ids: ids.join(",") }),
    GET_TRACK_AUDIO_ANALYSIS: (id: string) =>
      buildURL(`/audio-analysis`, { id }),
  },
  SEARCH: (
    q: string,
    type: SearchType[],
    options?: {
      include_external?: SearchIncludeExternalTypes;
      limit?: number;
      offset?: number;
      market?: string;
    }
  ) => buildURL("/search", { q, type: type.join(","), ...options }),
};
