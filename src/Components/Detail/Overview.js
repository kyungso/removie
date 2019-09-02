import React from 'react';
import styled from "styled-components";

const OverviewContent = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 60%;
`;

const Overview = ({ overview }) => (
    <OverviewContent>{overview}</OverviewContent>
);

export default Overview;


