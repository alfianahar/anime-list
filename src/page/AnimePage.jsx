/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { animebyId } from '../api/api';
import ButtonDrawer from '../components/ButtonDrawer';

const usePathname = () => {
    const location = useLocation();
    return location.pathname;
}

const title = css`
    font-size: 1.5rem; 
    line-height: 2rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    letter-spacing: 0.05em;
    font-weight: 700;
    text-align: center;
`
const subtitle = css`
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: 0.05em;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-weight: 500;
`

const AnimePageContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    margin-bottom: 1.25rem;
    font-size: 1rem;
    line-height: 1.5rem;
    letter-spacing: 0.05em;
`

const CoverImg = styled('img')`
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
`

const DescriptionBox = styled('div')`
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 0.9rem;
    background: #151f2e;
    border-radius: 10px;
    margin-bottom: 0.75rem;
`

const AnimePage = () => {

    const currentPath = usePathname().substring(
        usePathname().indexOf("e/") + 1,
        usePathname().lastIndexOf("/")
    ).replace('/', '');
    const animeID = parseInt(currentPath)
    // console.log(typeof animeID)

    const [detail, setDetail] = useState();

    useEffect(() => {
        animebyId(animeID).then((response) => setDetail(response.media[0]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // console.log(detail)

    return (
        <>
            {detail === undefined ?
                <></> :
                <AnimePageContainer>
                    <CoverImg src={detail.coverImage.extraLarge} alt={detail.id} />
                    <p css={css` ${title} `} >{detail.title.english ? detail.title.english : detail.title.romaji}</p>
                    <ButtonDrawer animeid={detail.id} />
                    <div>
                        <p css={css` ${subtitle}`}>Genres</p>
                        <DescriptionBox >
                            <p>{detail.genres.toString().replace(/([A-Z])/g, ' $1')} </p>
                        </DescriptionBox>
                    </div>
                    <div css={css`display: flex; flex-direction: row; justify-content: space-between`}>
                        <div css={css`width: 48%`}>
                            <p css={css` ${subtitle}`}>Start Airing:</p>
                            <DescriptionBox >
                                <p>{detail.startDate.day}/{detail.startDate.month}/{detail.startDate.year} </p>
                            </DescriptionBox>
                        </div>
                        <div css={css`width: 48%`}>
                            <p css={css` ${subtitle}`}>Status</p>
                            <DescriptionBox >
                                <p>{detail.status.charAt(0).toUpperCase() + detail.status.substr(1).toLowerCase().replace(/_/g, ' ')} </p>
                            </DescriptionBox>
                        </div>
                    </div>
                    <div css={css`display: flex; flex-direction: row; justify-content: space-between`}>
                        <div css={css`width: 48%`}>
                            <p css={css` ${subtitle}`}>Average Score:</p>
                            <DescriptionBox >
                                <p>{detail.averageScore} %</p>
                            </DescriptionBox>
                        </div>
                        <div css={css`width: 48%`}>
                            <p css={css` ${subtitle}`}>Mean Score:</p>
                            <DescriptionBox >
                                <p>{detail.meanScore} %</p>
                            </DescriptionBox>
                        </div>
                    </div>
                    <div>
                        <p css={css` ${subtitle}`}>Description</p>
                        <DescriptionBox >
                            <p dangerouslySetInnerHTML={{ __html: detail.description }} />
                        </DescriptionBox>
                    </div>
                </AnimePageContainer>}
        </>
    )
}

export default AnimePage

