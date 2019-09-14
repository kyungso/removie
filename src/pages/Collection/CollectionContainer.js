import React from 'react';
import CollectionPresenter from "pages/Collection/CollectionPresenter";
import { collectionApi } from "api";

export default class extends React.Component {

    state = {
        result: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        const {
            match: {
                params: { id }
            },
            history: { push }
        } = this.props;
        const parsedId = parseInt(id);
        if(isNaN(parsedId)) {
            return push("/");
        }

        try {
            const { data: result } = await collectionApi.collectionDetail(parsedId);
            
            this.setState({
                result
            });
            
        } catch {
            this.setState({
                error: "Can't find collection information."
            });
        } finally {
            this.setState({
                loading: false
            });
        }
    }
    render() {
        const { result, error, loading } = this.state;
        return (
            <CollectionPresenter 
                result={result}
                error={error}
                loading={loading}
            />
        );
    }
}