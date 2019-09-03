import React from "react";
import { Link, withRouter } from 'react-router-dom';
import styled from "styled-components";
import Overview from "./Overview";
import Company from "./Company";
import Country from "./Country";

const TabContainer = styled.header`
    color: white;
    width: 80%;
    height: 50px;
    display: flex;
    align-items: center;

    background-color: rgba(20, 20, 20, 0.3);
    z-index: 10;
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.3);
`;

const TabList = styled.ul`
    display: flex;
`;

const Tab = styled.li`
    width: 180px;
    height: 50px;
    text-align: center;
    border-bottom: 3px solid
        ${props => (props.current ? "#3498db" : "transparent")};
    margin-right: 3px;
    color: ${props => (props.current ? "#ffffff" : "#949494")}
    transition: border-bottom 0.5s ease-in-out;
    font-weight: 600;
    &:hover {
        border-bottom: 3px solid rgb(52,152,219,0.8);
    }
`;

const TLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TabContentContainer = styled.div`
    margin: 20px 0;
    height: 100px;
`;

const DetailTabs = withRouter(({ location, overview, result }) => {
   const id = `${result.id}`;
   const isMovie = location.pathname.includes("/movie/");
   const url = (isMovie ? `/movie/${id}` : `/show/${id}`);

   return (
    <>
    <TabContainer>
        <TabList>
            <Tab current={location.pathname === url}>
                <TLink to={url}>OVERVIEW</TLink>
            </Tab>
            <Tab current={location.pathname === `${url}/companies`}>
                <TLink to={`${url}/companies`}>Production Companies</TLink>
            </Tab>
            <Tab current={location.pathname === `${url}/countries`}>
                <TLink to={`${url}/countries`}>Production Countries</TLink>
            </Tab>
        </TabList>
    </TabContainer>
    <TabContentContainer>
        {location.pathname === url && <Overview overview={overview} /> }
        {location.pathname === `${url}/companies` && <Company result={result}/>}
        {location.pathname === `${url}/countries` && <Country result={result}/>}
    </TabContentContainer>
    </>
   );
});

export default DetailTabs;