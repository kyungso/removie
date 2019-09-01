import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from "styled-components";

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
    z-index: 10;
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

export default withRouter(({ location: { pathname }}) => (
    <SearchTabContainer>
        <SearchTabs>
            <SearchTab current={pathname === "/movie"}>
                <SearchLink to="/movie">Movies</SearchLink>
            </SearchTab>
            <SearchTab current={pathname === "/tv"}>
                <SearchLink to="/tv">TV Shows</SearchLink>
            </SearchTab>
            <SearchTab current={pathname === "/search"}>
                <SearchLink to="/search">Collections</SearchLink>
            </SearchTab>
        </SearchTabs>
    </SearchTabContainer>
));