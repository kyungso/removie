import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from "styled-components";

import Section from "../Section";
import Poster from "../Poster";

const SearchTabContainer = styled.header`
    color: white;
    position: absolute;
    top: 160px;
    left: 70px;
    width: 150px;
    height: 25%;
    display: flex;
    
    flex-direction: column;
    background-color: rgba(20, 20, 20, 0.8);
    z-index: 5;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
    padding-left: 10px;
`;

const SearchTabs = styled.ul`
    display: flex;
    flex-direction: column;
`;

const SearchTab = styled.li`
    width: 120px;
    height: 50px;
    text-align: center;
    border-bottom: 3px solid
        ${props => (props.current ? "#3498db" : "transparent")};
    margin-right: 3px;
    color: ${props => (props.current ? "#ffffff" : "#7d7d7d")}
    transition: border-bottom 0.5s ease-in-out;
    font-size: 14px;
    font-weight: 500;
    &:hover {
        border-bottom: 3px solid rgb(52,152,219,0.8);
    }
`;

const SearchLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 5px;
`;

const SectionContainer = styled.div`
    padding-left: 165px;
    margin-bottom: 100px;
`;

export default withRouter(({ location, movieResults, tvResults, collectionResults }) => (
    <>
    <SearchTabContainer>
        <SearchTabs>
            <SearchTab current={location.pathname === "/search"}>
                <SearchLink to="/search">Movies ({movieResults.length})</SearchLink>
            </SearchTab>
            <SearchTab current={location.pathname === "/search/tv_result"}>
                <SearchLink to="/search/tv_result">TV Shows ({tvResults.length})</SearchLink>
            </SearchTab>
            <SearchTab current={location.pathname === "/search/collection_result"}>
                <SearchLink to="/search/collection_result">Collections ({collectionResults.length})</SearchLink>
            </SearchTab>
        </SearchTabs>
    </SearchTabContainer>

    {location.pathname === "/search" && movieResults && movieResults.length > 0 && (
        <SectionContainer>
        <Section title={`Movie Results (${movieResults.length })`}>
            {movieResults.map(movie => (
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
        </SectionContainer>
    )}

    {location.pathname === "/search/tv_result" && tvResults && tvResults.length > 0 && (
        <SectionContainer>
        <Section title={`TV Show Results (${tvResults.length})`}>
            {tvResults.map(show => (
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
        </SectionContainer>
    )}

    {location.pathname === "/search/collection_result" && collectionResults && collectionResults.length > 0 && (
        <SectionContainer>
        <Section title={`Collection Results (${collectionResults.length})`}>
            {collectionResults.map(collection => (
                <Poster 
                    key={collection.id}
                    id={collection.id}
                    imageUrl={collection.poster_path}
                    title={collection.name}
                    isCollection={true}
                />
            ))}
        </Section>
        </SectionContainer>
    )}

    </>
));
