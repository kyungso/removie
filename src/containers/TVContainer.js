import React, { Component } from "react";
import Helmet from "react-helmet";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tvActions from 'store/modules/tv';

import TVPresenter from "components/tv/TVPresenter";
import Loader from 'components/common/Loader';

class TVContainer extends Component {
    
    componentDidMount() {
        const { TVActions } = this.props;
        TVActions.getTvToprated();
        TVActions.getTvPopular();
        TVActions.getTvAiringtoday();
    }

    render() {
        const { topRated, popular, airingToday, loading } = this.props;
        return (
            <>
            <Helmet>
                <title>TV Shows | REMOVIE</title>
            </Helmet>
            {loading 
                ? (<Loader />) 
                : <TVPresenter 
                    topRated={topRated}
                    popular={popular}
                    airingToday={airingToday}
                  />
            }
            </>
        );
    }
}

export default connect(
    (state) => ({
        topRated: state.tv.get('topRated'),
        popular: state.tv.get('popular'),
        airingToday: state.tv.get('airingToday'),
        loading: state.pender.pending['tv/GET_TV_TOPRATED'] 
              || state.pender.pending['tv/GET_TV_POPULAR'] 
              || state.pender.pending['tv/GET_TV_AIRINGTODAY'],
    }),
    (dispatch) => ({
        TVActions: bindActionCreators(tvActions, dispatch)
    })
)(TVContainer);