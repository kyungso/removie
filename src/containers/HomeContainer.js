import React, { Component } from 'react';
import Helmet from "react-helmet";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from 'store/modules/home';

import HomePresenter from "components/home/HomePresenter";

class HomeContainer extends Component {

    componentDidMount() {
        const { HomeActions } = this.props;
        HomeActions.getMovieTrending();
        HomeActions.getTvTrending();
        HomeActions.getTopRated();
    }

    render() {
        const { movieTrending, tvTrending, topRated, loading } = this.props;
        return (
            <>
            <Helmet>
                <title>Home | REMOVIE</title>
            </Helmet>
            <HomePresenter 
                movieTrending={movieTrending}
                tvTrending={tvTrending}
                topRated={topRated}
                loading={loading}
            />
            </>
        );
    }
}

export default connect(
    (state) => ({
        movieTrending: state.home.movieTrending,
        tvTrending: state.home.tvTrending,
        topRated: state.home.topRated,
        loading: state.loading['home/GET_MOVIE_TRENDING']
              || state.loading['home/GET_TV_TRENDING']
              || state.loading['home/GET_TOPRATED']
    }),
    (dispatch) => ({
        HomeActions: bindActionCreators(homeActions, dispatch)
    })
)(HomeContainer);