import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Footer from './container/Footer';
import Header from './container/Header';
import AnimePage from './page/AnimePage';
import MainPage from './page/MainPage';
import loading from './container/loading.svg'
import CollectionPage from './page/CollectionPage';
import ListColPage from './page/ListColPage';

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
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: 0.025em;
  }
  a {
    text-decoration: none !important;
  }
`

const LoadContainer = styled('div')`
    display: flex; 
    position: fixed; 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; 
    z-index: 20; 
    background: rgba(0, 0, 0, 0.7); 
    justify-content: center; 
    width: 100%; 
    height: 100%; 
    blur: blur(8px); 
`

const LoadContainerFinish = styled('div')`
    display: none; 
`

const ImgLoad = styled('img')`
    width: 25%
`

function App() {

  const [imgReady, setImgReady] = useState(true);

  useEffect(() => {
    Promise.all(
      Array.from(document.images)
        .filter(img => !img.complete)
        .map(img => new Promise(
          resolve => { img.onload = img.onerror = resolve; }
        )))
      .then(() => {
        setImgReady(false)
      });
  }, [])

  return (
    <>
      <BrowserRouter>
        <Global styles={GlobalStyles} />
        <Routes>
          <Route element={
            <>
              {
                imgReady ?
                  <LoadContainer>
                    <ImgLoad src={loading} alt='load' />
                  </LoadContainer>
                  :
                  <LoadContainerFinish>
                    <ImgLoad src={loading} alt='load' />
                  </LoadContainerFinish>
              }
              <Header />
              <Outlet />
              <Footer />
            </>
          }>
            <Route path="/" element={<MainPage />} />
            <Route path="/anime/*" element={<AnimePage />} />
            <Route path="/user/" element={<ListColPage />} />
            <Route path="/user/*" element={<CollectionPage />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Page Under Construction</p>
                </main>
              }
            />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;