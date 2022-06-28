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
const SliderTitle = styled('nav')`
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

    const [trends, setTrends] = useState([]);
    const [pops, setPops] = useState([]);
    const [ups, setUps] = useState([]);

    useEffect(() => {
        animeData(1, 10, 'POPULARITY_DESC', 2022, 'NOT_YET_RELEASED', 'SUMMER').then((response) => setTrends(response.media))
    }, [])
    useEffect(() => {
        animeData(1, 10, 'POPULARITY_DESC', 2022).then((response) => setPops(response.media))
    }, [])
    useEffect(() => {
        animeData(1, 10, 'POPULARITY_DESC', 2022, 'NOT_YET_RELEASED', 'SUMMER').then((response) => setUps(response.media))
    }, [])

    return (
        <>
            <SliderTitle>
                <h4>Trending Sekarang</h4>
                <a href="/">Lebih banyak</a>
            </SliderTitle>
            <Swiper
                slidesPerView={3.1}
                centeredSlides={true}
                centeredSlidesBounds={true}
                spaceBetween={12}
            >
                {trends.map((anime) => (
                    <SwiperSlide>
                        <CoverImg src={anime.coverImage.extraLarge} alt={anime.id} />
                        <p key={anime.id}>{anime.title.english ? anime.title.english : anime.title.romaji}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
            <SliderTitle>
                <h4>Popular Season Ini</h4>
                <a href='/'>Lebih banyak</a>
            </SliderTitle>
            <Swiper
                slidesPerView={3.1}
                centeredSlides={true}
                centeredSlidesBounds={true}
                spaceBetween={12}
            >
                {pops.map((anime) => (
                    <SwiperSlide>
                        <CoverImg src={anime.coverImage.extraLarge} alt={anime.id} />
                        <p key={anime.id}>{anime.title.english ? anime.title.english : anime.title.romaji}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
            <SliderTitle>
                <h4>Akan Hadir</h4>
                <a href='/'>Lebih banyak</a>
            </SliderTitle>
            <Swiper
                slidesPerView={3.1}
                centeredSlides={true}
                centeredSlidesBounds={true}
                spaceBetween={12}
            >
                {ups.map((anime) => (
                    <SwiperSlide>
                        <CoverImg src={anime.coverImage.extraLarge} alt={anime.id} />
                        <p key={anime.id}>{anime.title.english ? anime.title.english : anime.title.romaji}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Popular