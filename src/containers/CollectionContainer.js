import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as collectionActions from 'store/modules/collection';

import CollectionPresenter from "components/collection/CollectionPresenter";

class CollectionContainer extends Component {

    componentDidMount() {
        const { 
            match: { params: { id } },
            history: { push }
        } = this.props;
        const parsedId = parseInt(id);
        if(isNaN(parsedId)) {
            return push("/");
        }

        try {
            const { CollectionActions } = this.props;
            CollectionActions.getCollectionList(parsedId);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { result, loading } = this.props;
        return (
            <CollectionPresenter 
                result={result} 
                loading={loading}
            />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        result: state.collection.result,
        loading: state.loading['collection/GET_COLLECTION_LIST']
    }), 
    (dispatch) => ({
        CollectionActions: bindActionCreators(collectionActions, dispatch)
    })
)(CollectionContainer))