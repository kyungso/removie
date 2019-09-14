import React from "react";
import DetailPresenter from "pages/Detail/DetailPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: { pathname }
        } = props;
        
        this.state = {
            result: null,
            imdb_id: null,
            videos: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: { id }
            },
            history: { push }
        } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        if(isNaN(parsedId)) {
            return push("/");
        }

        let result, imdb_id, videos = null;
        try {
            if(isMovie) {
                ({ data: result } = await moviesApi.movieDetail(parsedId));
                ({ data: imdb_id } = await moviesApi.movieFindImdbId(parsedId));
                ({ data: videos } = await moviesApi.movieVideos(parsedId));
            } else {
                ({ data: result } = await tvApi.showDetail(parsedId));
                ({ data: imdb_id } = await tvApi.showFindImdbId(parsedId));
                ({ data: videos } = await tvApi.showVideos(parsedId));
            }
        } catch {
            this.setState({ error: "Can't find anything" });
        } finally {
            this.setState({ loading: false, result, imdb_id, videos });
        }
    }
    render() {
        const { result, imdb_id, videos, error, loading } = this.state;
        return <DetailPresenter result={result} imdb_id={imdb_id} videos={videos} error={error} loading={loading} />;
    }
}