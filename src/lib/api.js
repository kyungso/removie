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
    movieAccountState: ({id, session_id}) => api.get(`movie/${id}/account_states`, {
        params: {
            session_id: session_id
        }
    }),
    movieFindImdbId: id => 
        api.get(`movie/${id}/external_ids`),
    movieVideos: id =>
        api.get(`movie/${id}/videos`),
    search: ({searchTerm, page}) => 
        api.get("search/movie", {
            params: {
                query: searchTerm,
                page: page            
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
    showAccountState: ({id, session_id}) => api.get(`tv/${id}/account_states`, {
        params: {
            session_id: session_id
        }
    }),
    showFindImdbId: id => 
        api.get(`tv/${id}/external_ids`),
    showVideos: id =>
        api.get(`tv/${id}/videos`),
    search: ({searchTerm, page}) =>
        api.get("search/tv", {
            params: {
                query: searchTerm,
                page: page
            }
        })
};

export const collectionApi = {
    collectionDetail: id => 
        api.get(`collection/${id}`),
    search: ({searchTerm, page}) =>
        api.get("search/collection", {
            params: {
                query: searchTerm,
                page: page
            }
        })

};

export const loginApi = {
    createRequetToken: () => api.get("authentication/token/new"),
    validateWithLogin: ({username, password, request_token}) => api.post("authentication/token/validate_with_login", {username, password, request_token}),
    createSessionId: (request_token) => api.post("authentication/session/new", {request_token}),
    deleteSessionId: (session_id) => api.delete("authentication/session", {data: {session_id: session_id}}),
};

export const accountApi = {
    getAccountDetail: (session_id) => api.get("account", {
        params: {
            session_id: session_id
        }
    }),
    getFavoriteMovies: ({account_id, session_id}) => api.get(`account/${account_id}/favorite/movies`, {
        params: {
            session_id: session_id
        }
    }),
    getFavoriteTV: ({account_id, session_id}) => api.get(`account/${account_id}/favorite/tv`, {
        params: {
            session_id: session_id
        }
    }),
    getGenreList: () => api.get("genre/movie/list"),
    markAsFavorite: async({account_id, session_id, media_type, media_id, favorite}) => 
        api.post(`account/${account_id}/favorite`, {
            media_type: media_type,
            media_id: parseInt(media_id),
            favorite: favorite
        }, {
            headers: { 'content-type': 'application/json;charset=utf-8'},
            params: {
                session_id: session_id
            },
    }),
    getRatedMovies: ({account_id, session_id}) => api.get(`account/${account_id}/rated/movies`, {
        params: {
            session_id: session_id
        }
    }),
    getRatedTV: ({account_id, session_id}) => api.get(`account/${account_id}/rated/tv`, {
        params: {
            session_id: session_id
        }
    }),
    deleteRatingMovies: ({id, session_id}) => api.delete(`movie/${id}/rating`, {
        headers: { 'content-type': 'application/json;charset=utf-8'},
        params: {
            session_id: session_id
        }
    }),
    deleteRatingTV: ({id, session_id}) => api.delete(`tv/${id}/rating`, {
        headers: { 'content-type': 'application/json;charset=utf-8'},
        params: {
            session_id: session_id
        }
    }),
    postRatingMovies: ({id, rate, session_id}) => api.post(`movie/${id}/rating`, {
            value: rate
        },{
            headers: { 'content-type': 'application/json;charset=utf-8'},
            params: {
                session_id: session_id
            }
    }),
    postRatingTV: ({id, rate, session_id}) => api.post(`tv/${id}/rating`, {
            value: rate
        },{
            headers: { 'content-type': 'application/json;charset=utf-8'},
            params: {
                session_id: session_id
            }
    })
}