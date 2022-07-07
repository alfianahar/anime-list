/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

const FooterTitle = styled('p')`
    font-family: monospace;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    padding: 1rem 1rem 2rem;
    border-top: 0.1rem solid #c2d3cd;
`
const A = styled('a')`
    color: #fff;
`

const pulse = keyframes`
    0% { 
        opacity: 0.5;
    }
    50% { 
        opacity: 1.0;
        
    }
    100% { 
        opacity: 0.5;
    }
`

const Footer = () => {
    return (
        <FooterTitle>
            Made with <span>&nbsp;&#10084;&#65039;&nbsp;</span> by <A css={css` animation: ${pulse} 3s ease-out infinite;`} href='https://www.alfianahar.com/bio' target='_blank' rel='noopener noreferrer' >&nbsp;Alfian Nahar</A>
        </FooterTitle >
    )
}

export default Footer