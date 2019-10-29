import React, { Component } from 'react';
import Helmet from "react-helmet";
import queryString from 'query-string';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from 'store/modules/home';

import HomePresenter from "components/home/HomePresenter";
import Loader from "components/common/Loader";

class HomeContainer extends Component {

    constructor(props) {
        super(props);

        let query = queryString.parse(window.location.search);
        if(query['approved']) {
            window.location.href='https://removie.netlify.com/#/';
        } else if(query['denied']){
            localStorage.setItem('logged', false);
            window.location.href='https://removie.netlify.com/#/login';
            alert('인증이 거부되었습니다. 다시 시도해 주세요.')
        }
        // window.location.replace("http://localhost:3000/approved");
    }

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
            {loading 
                ? (<Loader />) 
                :   <HomePresenter 
                        movieTrending={movieTrending}
                        tvTrending={tvTrending}
                        topRated={topRated}
                    />
            }
            </>
        );
    }
}

export default connect(
    (state) => ({
        movieTrending: state.home.get('movieTrending'),
        tvTrending: state.home.get('tvTrending'),
        topRated: state.home.get('topRated'),
        loading: state.pender.pending['home/GET_MOVIE_TRENDING'] || state.pender.pending['home/GET_TV_TRENDING'] || state.pender.pending['home/GET_TOPRATED'],
    }),
    (dispatch) => ({
        HomeActions: bindActionCreators(homeActions, dispatch)
    })
)(HomeContainer);