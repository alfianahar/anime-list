/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import React from 'react'


const Navigation = styled('nav')`
    display: flex;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
`

const Header = () => {
    return (
        <Navigation>
            <NavLink to="/">
                <h2 css={css`font-family: cursive;`}>Ani-Zoune</h2>
            </NavLink>
            <div>Menu</div>
        </Navigation>
    )
}

export default Header