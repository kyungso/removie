import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as detailActions from 'store/modules/detail';

import DetailPresenter from "components/detail/DetailPresenter";

class DetailContainer extends Component {

    async componentDidMount() {

        const {
            location: { pathname },
            match: { params: { id } },
            history: { push },
        } = this.props;

        const isMovie = pathname.includes("/movie/");
        const parsedId = parseInt(id);
        if(isNaN(parsedId)) {
            return push("/");
        }

        try {
            const { DetailActions } = this.props;
            if(isMovie) {
                DetailActions.getMovieDetail(parsedId);
                DetailActions.getMovieImdbId(parsedId);
                DetailActions.getMovieVideos(parsedId);
            } else {
                DetailActions.getTvDetail(parsedId);
                DetailActions.getTvImdbId(parsedId);
                DetailActions.getTvVideos(parsedId);
            }
        } catch (e){
           console.log(e);
        }
    }

    render() {
        const { result, imdb_id, videos } = this.props;
        return (
            <>
            {
                result && imdb_id && videos &&
                <DetailPresenter 
                    result={result} 
                    imdb_id={imdb_id} 
                    videos={videos}
                />
            }
            </>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        result: state.detail.get('result'),
        imdb_id: state.detail.get('imdb_id'),
        videos: state.detail.get('videos'), 
    }),
    (dispatch) => ({
        DetailActions: bindActionCreators(detailActions, dispatch)
    })
)(DetailContainer));