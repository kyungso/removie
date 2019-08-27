import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
    padding: 20px;
`;

const HomePresenter = ({ loading, error }) => (
    <>
        <Helmet>
            <title>Movies | Netflix</title>
        </Helmet>
        {loading ? (
            <Loader /> 
            ) : (
            <Container>
                <Helmet>
                    <title>Movies | Netflix</title>
                </Helmet>
                HOME
                {error && <Message color="#e74c3c" text={error} />}
            </Container>
        )}
    </>
);

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default HomePresenter;