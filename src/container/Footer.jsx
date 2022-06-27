import styled from '@emotion/styled'
import React from 'react'

const FooterTitle = styled('p')`
    font-family: cursive;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    padding: 1rem 1rem 2rem;
`

const Footer = () => {
    return (
        <FooterTitle>
            Made with <span>&#10084;&#65039;</span> by<a href='/https://www.alfianahar.com/bio' target='_blank' rel='noopener noreferrer' >Alfian Nahar</a>
        </FooterTitle>
    )
}

export default Footer