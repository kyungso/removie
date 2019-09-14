import React from "react";
import SearchPresenter from "pages/Search/SearchPresenter";
import { moviesApi, tvApi, collectionApi } from "api";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        collectionResults: null,
        searchTerm: "",
        loading: false,
        error: null
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if(searchTerm !== "") {
            this.searchByTerm();
        }
    };

    updateTerm = (event) => {
        const {
            target: { value }
        } = event;
        this.setState({
            searchTerm: value
        });
    };

    searchByTerm = async () => {
        const { searchTerm } = this.state;

        this.setState({ loading: true });
        
        try {
            const { data: mResults } = await moviesApi.search(searchTerm);
            let { data: { results: movieResults }} = await moviesApi.search(searchTerm, 1);

            let mPages = 2;
            if(mResults.total_pages > 1) {
                while(mPages <= mResults.total_pages) {
                    let { data: { results: pageResult }} = await moviesApi.search(searchTerm, mPages);
                    movieResults = [...movieResults, ...pageResult];
                    mPages++;
                }
            }

            const { data: tResults } = await tvApi.search(searchTerm);
            let { data: { results: tvResults }} = await tvApi.search(searchTerm, 1);

            let tPages = 2;
            if(tResults.total_pages > 1) {
                while(tPages <= tResults.total_pages) {
                    let { data: { results: pageResult }} = await tvApi.search(searchTerm, tPages);
                    tvResults = [...tvResults, ...pageResult];
                    tPages++;
                }
            }

            const { data: cResults } = await collectionApi.search(searchTerm);
            let { data: { results: collectionResults }} = await collectionApi.search(searchTerm, 1);

            let cPages = 2;
            if(cResults.total_pages > 1) {
                while(cPages <= cResults.total_pages) {
                    let { data: { results: pageResult }} = await collectionApi.search(searchTerm, cPages);
                    collectionResults = [...collectionResults, ...pageResult];
                    cPages++;
                }
            }

            this.setState({
                movieResults,
                tvResults,
                collectionResults
            });
            
        } catch {
            this.setState({
                error: "Can't find results."
            });
        } finally {
            this.setState({
                loading: false
            });
        }
    };

    render() {
        const { movieResults, tvResults, collectionResults, loading, error, searchTerm } = this.state;
        return(
            <SearchPresenter 
                movieResults={movieResults}
                tvResults={tvResults}
                collectionResults={collectionResults}
                loading={loading}
                error={error}
                searchTerm={searchTerm}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
}