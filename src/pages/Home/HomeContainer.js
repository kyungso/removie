import React from 'react';
import HomePresenter from "pages/Home/HomePresenter";
import { moviesApi, tvApi } from "api";

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
    
            const {
                data: { results: topRated }
            } = await moviesApi.topRated();

            this.setState({
                movieTrending,
                tvTrending,
                topRated
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
        const { movieTrending, tvTrending, topRated, error, loading } = this.state;
        return (
            <HomePresenter 
                movieTrending={movieTrending}
                tvTrending={tvTrending}
                topRated={topRated}
                error={error}
                loading={loading}
            />
        );
    }
}