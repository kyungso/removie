import React from 'react';
import HomePresenter from "./HomePresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
    state = {
        movieTrending: null,
        tvTrending: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        try {
            const {
                data: { results: movieTrending }
            } = await moviesApi.trending();
            const {
                data: { results: tvTrending }
            } = await tvApi.trending();
    
            this.setState({
                movieTrending,
                tvTrending
            });
            
        } catch {
            this.setState({
                error: "Can't find trending information."
            });
        } finally {
            this.setState({
                loading: false
            });
        }
    }
    render() {
        const { movieTrending, tvTrending, error, loading } = this.state;
        return (
            <HomePresenter 
                movieTrending={movieTrending}
                tvTrending={tvTrending}
                error={error}
                loading={loading}
            />
        );
    }
}