import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Cover = styled.div`
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 290px;
    width: 200px;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 25px;
`;

const Title = styled.h3`
    margin-top: 15px;
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.div`
    margin-top: 60px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
`;

const CollectionPresenter = ({ result, error, loading }) => (
    <>
        <Helmet>
            <title>Collections | Netflix</title>
        </Helmet>
        {loading ? (
            <Loader /> 
            ) : (
            <Container>
                <Helmet>
                    <title>Collections | Netflix</title>
                </Helmet> 
                <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
                <Content>
                    <Cover 
                        bgImage={
                            result.poster_path
                                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                                :  require("../../assets/noPosterSmall.png")
                        }
                    />
                    <Data>
                        <Title>{result.name}</Title>
                        <ItemContainer>
                            <Item>
                                {result.parts && result.parts != null &&
                                    result.parts.map(series => 
                                        <Poster 
                                            key={series.id}
                                            id={series.id}
                                            imageUrl={series.poster_path}
                                            title={series.title}
                                            rating={series.vote_average}
                                            year={series.release_date.substring(0, 4)}
                                            isMovie={true}
                                        />)
                                }
                            </Item>
                        </ItemContainer>
                    </Data>
                </Content>
                {error && <Message color="#e74c3c" text={error} />}
            </Container>
        )}
    </>
);

CollectionPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
};

export default CollectionPresenter;