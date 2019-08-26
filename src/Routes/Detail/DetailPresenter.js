import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Helmet from "react-helmet";  // public/index.html 변경

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
    height: 100%;
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
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const DetailPresenter = ({ result, imdb_id, loading, error }) => 
    loading ? (
        <>
            <Helmet>
                <title>Loading | Netflix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>
                    {result.title ? result.title : result.name}{" "}
                </title>
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
                    <Title>
                        {result.title
                            ? result.title
                            : result.name}
                    </Title>
                    <ItemContainer>
                        <Item>
                            {result.release_date
                                ? result.release_date.substring(0,4)
                                : result.first_air_date.substring(0, 4)}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result.runtime ? result.runtime : (result.runtime === 0 ? '' : result.episode_run_time[0])} min
                        </Item> 
                        <Divider>•</Divider>
                        <Item>
                            {   
                                <>
                                    <span className="imdbRatingPlugin" data-user="ur107063764" data-title={`${imdb_id.imdb_id}`} data-style="t1">
                                        <a href={`https://www.imdb.com/title/${imdb_id.imdb_id}/?ref_=tt_plg_rt`}>
                                            <img alt={`${result.title ? result.title : result.name} on IMDb`} src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png" />
                                        </a>
                                    </span>
                                    <script>
                                        {(function(d,s,id){
                                            var js,stags=d.getElementsByTagName(s)[0];
                                            if(d.getElementById(id)){return;}
                                                js=d.createElement(s);
                                                js.id=id;
                                                js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";
                                                stags.parentNode.insertBefore(js,stags);
                                        })(document,'script','imdb-rating-api')}    
                                    </script>                    
                                </>                
                            }         
                            {/* <A href={`https://www.imdb.com/title/${result.imdb_id}/`}>
                                <Button src={require("../../assets/IMDb.png")} />
                            </A> */}
                        </Item>
                    </ItemContainer>
                    <ItemContainer>
                        <Item>
                            {result.genres &&
                                result.genres.map((genre, index) =>
                                    index === result.genres.length - 1
                                      ? genre.name
                                      : `${genre.name} / `
                                )}
                        </Item>
                    </ItemContainer>
                    <Overview>{result.overview}</Overview>
                </Data>
            </Content>
        </Container>
    );

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;