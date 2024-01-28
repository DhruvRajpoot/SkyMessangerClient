import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
        user-select: none;
    }

    ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }
    
    ::-webkit-scrollbar-track {
        background-color: #797979;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #3f3f3f;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #252525;
    }
`;

export default GlobalStyle;
