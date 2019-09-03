import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// last-child만 제외하고 적용 (:not)
const Container = styled.div`
    :not(:last-child) { 
        margin-bottom: 50px;
    }
    margin-left: 80px;
    margin-right: 50px;
`;

const Title = styled.span`
    font-size: 17px;
    font-weight: 600;
`;

const Grid = styled.div`
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
`;

const HomeGrid = styled.div`
    margin-top: 25px;
    margin-right: 80px;
    display: grid;
    grid-template-columns: repeat(100, 125px);
    grid-gap: 15px;
    overflow-x: scroll;
`;

const Section = ({ title, isHome, children }) => (
    <Container>
        <Title>{title}</Title>
        {isHome 
         ? <HomeGrid>{children}</HomeGrid>
         : <Grid>{children}</Grid>}
    </Container>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Section;