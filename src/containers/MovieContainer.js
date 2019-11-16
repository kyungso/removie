import React, { Component } from 'react';
import Helmet from "react-helmet";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as movieActions from 'store/modules/movie';

import MoviePresenter from "components/movie/MoviePresenter";

class MovieContainer extends Component {
    
    componentDidMount() {
        const { MovieActions } = this.props;
        MovieActions.getMovieNowplaying();
        MovieActions.getMovieUpcoming();
        MovieActions.getMoviePopular();
        document.documentElement.scrollTop = 0;
    }

    render() {
        const { nowPlaying, upcoming, popular, loading } = this.props;
        return (
            <>
            <Helmet>
                <title>Movies | REMOVIE</title>
            </Helmet>
            <MoviePresenter 
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                loading={loading}
            />
            </>
        );
    }
}

export default connect(
    (state) => ({
        nowPlaying: state.movie.nowPlaying,
        upcoming: state.movie.upcoming,
        popular: state.movie.popular,
        loading: state.loading['movie/GET_MOVIE_NOWPLAYING']
              || state.loading['movie/GET_MOVIE_UPCOMING']
              || state.loading['movie/GET_MOVIE_POPULAR']
    }),
    (dispatch) => ({
        MovieActions: bindActionCreators(movieActions, dispatch)
    })
)(MovieContainer);