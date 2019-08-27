import React from 'react';
import styled from "styled-components";

const CountryContainer = styled.div`
    witdh: 70%;
    margin-left: 25px;
`;

const Countries = styled.span``;

const Country = ({ result }) => (
    <CountryContainer>
       <Countries>
        {result.production_countries 
            ? result.production_countries.map((country, index) =>
                    index === result.production_countries.length - 1 ? country.name : `${country.name} / ` )
            : result.origin_country[0]
        }
       </Countries>
    </CountryContainer>
);

export default Country;


