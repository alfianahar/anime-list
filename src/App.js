import { Global, css } from '@emotion/react';
// import styled from '@emotion/styled';
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Footer from './container/Footer';
import Header from './container/Header';
import AnimePage from './page/AnimePage';
import MainPage from './page/MainPage';

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
  a:link {
    color: #c2d3cd;
    background-color: transparent;
    text-decoration: none;
    }
  a:visited {
    color: #c2d3cd;
    background-color: transparent;
    text-decoration: none;
    }
  a:hover {
    background-color: transparent;
    }
`

function App() {
  return (
    <>
      <BrowserRouter>
        <Global styles={GlobalStyles} />
        <Routes>
          <Route element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }>
            <Route path="/" element={<MainPage />} />
            <Route path="/anime/*" element={<AnimePage />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;