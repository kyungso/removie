import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: { pathname }
        } = props;
        
        this.state = {
            result: null,
            imdb_id: null,
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

        let result, imdb_id = null;
        try {
            if(isMovie) {
                ({ data: result } = await moviesApi.movieDetail(parsedId));
                ({ data: imdb_id } = await moviesApi.movieFindImdbId(parsedId));
            } else {
                ({ data: result } = await tvApi.showDetail(parsedId));
                ({ data: imdb_id } = await tvApi.showFindImdbId(parsedId));
            }
        } catch {
            this.setState({ error: "Can't find anything" });
        } finally {
            this.setState({ loading: false, result, imdb_id });
        }
    }
    render() {
        const { result, imdb_id, error, loading } = this.state;
        return <DetailPresenter result={result} imdb_id={imdb_id} error={error} loading={loading} />;
    }
}