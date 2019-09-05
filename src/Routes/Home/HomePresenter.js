import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import Carousel from "../../Components/Carousel/Carousel";

const Container = styled.div`
    margin-top: 10px;
    padding: 20px;
`;
  
const HomePresenter = ({ movieTrending, tvTrending, topRated, loading, error }) => (
    <>
        <Helmet>
            <title>Home | Netflix</title>
        </Helmet>
        {loading ? (
            <Loader /> 
            ) : (
            <>
            <Container>
                <Helmet>
                    <title>Home | Netflix</title>
                </Helmet>

                <Carousel topRated={topRated} />

                {movieTrending && movieTrending.length > 0 && (
                    <Section title="Trending Movies" isHome={true}>
                        {movieTrending.map(movie => (
                            <Poster 
                                key={movie.id}
                                id={movie.id}
                                imageUrl={movie.poster_path}
                                title={movie.title}
                                rating={movie.vote_average}
                                year={movie.release_date.substring(0, 4)}
                                isMovie={true}
                            />
                        ))}
                    </Section>
                )}

                {tvTrending && tvTrending.length > 0 && (
                    <Section title="Trending TV Shows" isHome={true}>
                        {tvTrending.map(show => (
                            <Poster 
                                key={show.id}
                                id={show.id}
                                imageUrl={show.poster_path}
                                title={show.name}
                                rating={show.vote_average}
                                year={show.first_air_date.substring(0, 4)}
                            />
                        ))}
                    </Section>
                )}
                {error && <Message color="#e74c3c" text={error} />}
            </Container>
            </>
        )}
    </>
);

HomePresenter.propTypes = {
    movieTrending: PropTypes.array,
    tvTrending: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default HomePresenter;