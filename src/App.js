import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Footer from './container/Footer';
import Header from './container/Header';
import AnimePage from './page/AnimePage';
import MainPage from './page/MainPage';
import loading from './container/loading.svg'

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
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;