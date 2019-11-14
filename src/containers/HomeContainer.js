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
        const { movieTrending, tvTrending, topRated } = this.props;
        return (
            <>
            <Helmet>
                <title>Home | REMOVIE</title>
            </Helmet>
            <HomePresenter 
                movieTrending={movieTrending}
                tvTrending={tvTrending}
                topRated={topRated}
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
    }),
    (dispatch) => ({
        HomeActions: bindActionCreators(homeActions, dispatch)
    })
)(HomeContainer);