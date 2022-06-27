import { Global, css } from '@emotion/react';
// import styled from '@emotion/styled';
import React from 'react';
import Footer from './container/Footer';
import Header from './container/Header';
import MainContainer from './container/MainContainer';

const GlobalStyles = css`
  * {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

body {
  background-color: #0B1622;
  color: #c2d3cd;
}
`

function App() {
  return (
    <>
      <Global styles={GlobalStyles} />
      <Header />
      <MainContainer />
      <Footer />
    </>
  );
}

export default App;