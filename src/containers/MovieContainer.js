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
    }

    render() {
        const { nowPlaying, upcoming, popular } = this.props;
        return (
            <>
            <Helmet>
                <title>Movies | REMOVIE</title>
            </Helmet>
            <MoviePresenter 
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
            />
            </>
        );
    }
}

export default connect(
    (state) => ({
        nowPlaying: state.movie.nowPlaying,
        upcoming: state.movie.upcoming,
        popular: state.movie.popular
    }),
    (dispatch) => ({
        MovieActions: bindActionCreators(movieActions, dispatch)
    })
)(MovieContainer);