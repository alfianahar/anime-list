import React, { useEffect, useState } from 'react'
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css";
import animeData from '../api/api';

const CoverImg = styled('img')`
    position: relative;
    height: 12rem;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
`
const PopularTitle = styled('nav')`
    display: flex;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-bottom: 0.75rem;
    margin-top: 1.75rem;
    font-size: 1rem;
    line-height: 1.75rem;
`

const Popular = () => {

    const [pops, setPops] = useState([])

    useEffect(() => {
        animeData(1, 10, 'POPULARITY_DESC', 2022).then((response) => setPops(response.media))
    }, [])

    return (
        <>
            <PopularTitle>
                <h4>Popular Season Ini</h4>
                <a href='/'>Lebih banyak</a>
            </PopularTitle>
            <Swiper
                slidesPerView={3.1}
                centeredSlides={true}
                centeredSlidesBounds={true}
                spaceBetween={12}
            >
                {pops.map((anime) => (
                    <SwiperSlide>
                        <CoverImg src={anime.coverImage.medium} key={anime.id} alt={anime.id} />
                        <p>{anime.title.english ? anime.title.english : anime.title.romaji}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Popular