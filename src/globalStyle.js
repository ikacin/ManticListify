import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-size: 120%;
    margin:0;
    padding: 0;
  }
  svg.mantine-1avyp1d {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 50%;
    top: 50%;
  }

  .loading-wrap {
    background: #b7b0b094;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99;
  }
  
  img{
    width: 100%;
  }

  h3.mantine-Text-root.mantine-Title-root.mantine-1o492w4 {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  tr:nth-child(odd) {
    background-color: lightgrey;
  }
  tr:nth-child(even) {
    background-color:orange;
  }
  .LazyLoad {
    opacity: 0;
    transition: all 1s ease-in-out;
  }

  .is-visible {
    opacity: 1;
  }
`;


export default GlobalStyle;