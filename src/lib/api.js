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
    trending: () => api.get("trending/movie/day"),
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    topRated: () => api.get("movie/top_rated"),
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
    search: (term, i) => 
        api.get("search/movie", {
            params: {
                query: decodeURIComponent(term),
                page: i            
            }
        })
};

export const tvApi = {
    trending: () => api.get("trending/tv/day"),
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
    search: (term, i) =>
        api.get("search/tv", {
            params: {
                query: decodeURIComponent(term),
                page: i
            }
        })
};

export const collectionApi = {
    collectionDetail: id => 
        api.get(`collection/${id}`),
    search: (term, i) =>
        api.get("search/collection", {
            params: {
                query: decodeURIComponent(term),
                page: i
            }
        })

};

export const loginApi = {
    createRequetToken: () => api.get("authentication/token/new"),
    validateWithLogin: ({username, password, request_token}) => api.post("authentication/token/validate_with_login", {username, password, request_token}),
    createSessionId: (request_token) => api.post("authentication/session/new", {request_token}),
    deleteSessionId: (session_id) => api.delete("authentication/session", {data: {session_id: session_id}}),
    //deleteSessionId: (session_id) => api.delete("authentication/session", {session_id}),
};