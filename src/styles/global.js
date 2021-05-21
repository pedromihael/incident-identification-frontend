import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        outline: none;
    }

    body {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        color: #212121;
        background: #f1f1f1;
        font-family: 'Nunito Sans', sans-serif;
    }
`;
