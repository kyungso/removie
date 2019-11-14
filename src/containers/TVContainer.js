import React, { Component } from "react";
import Helmet from "react-helmet";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tvActions from 'store/modules/tv';

import TVPresenter from "components/tv/TVPresenter";

class TVContainer extends Component {
    
    componentDidMount() {
        const { TVActions } = this.props;
        TVActions.getTvToprated();
        TVActions.getTvPopular();
        TVActions.getTvAiringtoday();
    }

    render() {
        const { topRated, popular, airingToday } = this.props;
        return (
            <>
            <Helmet>
                <title>TV Shows | REMOVIE</title>
            </Helmet>
            <TVPresenter 
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
        topRated: state.tv.topRated,
        popular: state.tv.popular,
        airingToday: state.tv.airingToday
    }),
    (dispatch) => ({
        TVActions: bindActionCreators(tvActions, dispatch)
    })
)(TVContainer);