import React from "react";
import { Link, withRouter } from 'react-router-dom';
import styled from "styled-components";
import Overview from "../Components/Overview";
import Company from "../Components/Company";
import Country from "../Components/Country";

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
    color: ${props => (props.current ? "#ffffff" : "#949494")}
    transition: border-bottom 0.5s ease-in-out;
    font-weight: 600;
`;

const TLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TabContentContainer = styled.div`
    margin: 20px 0;
`;

const DetailTabs = withRouter(({ match, location, overview, result }) => {
   return (
    <>
    <TabContainer>
        <TabList>
            <Tab current={location.pathname === `${match.url}`}>
                <TLink to={`${match.url}`}>OVERVIEW</TLink>
            </Tab>
            <Tab current={location.pathname === `${match.url}/companies`}>
                <TLink to={`${match.url}/companies`}>Production Companies</TLink>
            </Tab>
            <Tab current={location.pathname === `${match.url}/countries`}>
                <TLink to={`${match.url}/countries`}>Production Countries</TLink>
            </Tab>
        </TabList>
    </TabContainer>
    <TabContentContainer>
        {location.pathname === `${match.url}` && <Overview overview={overview} /> }
        {location.pathname === `${match.url}/companies` && <Company result={result}/>}
        {location.pathname === `${match.url}/countries` && <Country result={result}/>}
    </TabContentContainer>
    </>
   );
});

export default DetailTabs;