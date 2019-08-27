import React from 'react';
import styled from "styled-components";

const CompanyContainer = styled.div`
    witdh: 70%;
    margin-left: 25px;
`;

const GridContainer = styled.div`
    :not(:last-child) { 
        margin-bottom: 50px;
    }
`;

const CompanyGrid = styled.div`
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 170px);
    grid-gap: 13px;
`;

const LogoContainer = styled.div`
    font-size: 12px;
`;

const Logo = styled.div`
    height: 40px;
    background-image: url(${props => props.logoImg});
    background-position: center center;
    background-size: contain;
    border-radius: 4px;
    background-repeat: no-repeat;
`;

const Title = styled.span`
    display: block;
    margin-top: 13px;
    text-align: center;
`;

const Company = ({ result }) => (
    <CompanyContainer>
       <GridContainer>
           <CompanyGrid>
                {result.production_companies &&
                            result.production_companies.map((company) =>
                    company.logo_path !== null &&
                        <LogoContainer>
                            <Logo key={company.id} logoImg={`https://image.tmdb.org/t/p/original${company.logo_path}`} />
                            <Title key={company.id}>{company.name}</Title> 
                        </LogoContainer>
                )}
            </CompanyGrid>
        </GridContainer> 
    </CompanyContainer>
);

export default Company;


