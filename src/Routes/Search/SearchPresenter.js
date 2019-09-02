import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import SearchTabs from  "../../Components/Search/SearchTabs";

const Container = styled.div`
    padding: 20px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
    padding-left: 50px;
`;

const SearchPresenter = ({ movieResults, tvResults, collectionResults, loading, error, searchTerm, handleSubmit, updateTerm }) => 
    <Container>
        <Helmet>
            <title>Search | Netflix</title>
        </Helmet>
        <Form onSubmit={handleSubmit}>
            <Input 
                placeholder="Search Movies or TV Shows..."
                value={searchTerm}
                onChange={updateTerm}
            />
        </Form>
        {loading ? (
            <Loader />
        ) : (
            <>
                {(movieResults || tvResults || collectionResults) && <SearchTabs movieResults={movieResults} tvResults={tvResults} collectionResults={collectionResults}/>}

                {error && <Message color="#e74c3c" text={error} />}
                {tvResults &&
                  movieResults &&
                    collectionResults &&
                    tvResults.length === 0 &&
                      movieResults.length === 0 && 
                      collectionResults.length === 0 && (
                        <Message text="Nothing found" color="#95a5a6" />
                )}
            </>
        )}
    </Container>

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    collectionResults: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;