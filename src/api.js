import axios from "axios";
//axios version @^0.18.0

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "de673ff7f12f1f8ac1034c13231d83e1",
        language: "ko-KR"
    }
});

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: id => 
        api.get(`movie/${id}`, {
            params: {
                append_to_response: "videos"
            }
        }),
    movieFindImdbId: id => 
        api.get(`movie/${id}/external_ids`),
    movieVideos: id =>
        api.get(`movie/${id}/videos`),
    search: term => 
        api.get("search/movie", {
            params: {
                query: decodeURIComponent(term)            
            }
        })
};

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: id => 
        api.get(`tv/${id}`, {
            params: {
                append_to_response: "videos"
            }
        }),
    showFindImdbId: id => 
        api.get(`tv/${id}/external_ids`),
    showVideos: id =>
        api.get(`tv/${id}/videos`),
    search: term =>
        api.get("search/tv", {
            params: {
                query: decodeURIComponent(term)
            }
        })
};