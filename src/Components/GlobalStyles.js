import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";   //styled-components 4.x 버전에서 사용 
// styled-components 3.x, 2.x 버전에서는 { injecGlobal }로 사용

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 12px;
        background-color: rgba(20, 20, 20, 1);
        color: white;
        padding-top: 80px;
    }
`;

export default globalStyles;