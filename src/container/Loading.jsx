import React from 'react'
import styled from '@emotion/styled';
import loading from './loading.svg'

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

const ImgLoad = styled('img')`
    width: 25%
`

const Loading = () => {
    return (
        <LoadContainer>
            <ImgLoad src={loading} alt='load' />
        </LoadContainer>
    )
}

export default Loading