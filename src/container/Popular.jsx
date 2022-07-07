import React, { useEffect, useState } from 'react'
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css";
import { animeData } from '../api/api';
import { NavLink } from 'react-router-dom'

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

const P = styled('p')`
    color: #c2d3cd;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const A = styled('a')`
    color: #fff;
`

const Popular = () => {

    const [trends, setTrends] = useState([]);
    const [pops, setPops] = useState([]);
    const [ups, setUps] = useState([]);

    useEffect(() => {
        animeData(1, 10).then((response) => setTrends(response.media))
        animeData(1, 10, 'POPULARITY_DESC', 2022).then((response) => setPops(response.media))
        animeData(1, 10, 'POPULARITY_DESC', 2022, 'NOT_YET_RELEASED', 'SUMMER').then((response) => setUps(response.media))
    }, [])
    // console.log(ups)
    return (
        <>
            <SliderTitle>
                <h4>Trending Sekarang</h4>
                <A href="/trendinglist">Lebih banyak</A>
            </SliderTitle>
            <Swiper
                slidesPerView={3.1}
                centeredSlides={true}
                centeredSlidesBounds={true}
                spaceBetween={12}
            >
                {trends.map((anime) => (
                    <SwiperSlide key={anime.id}>
                        <NavLink to={`/anime/${anime.id}/${anime.title.english ? anime.title.english.replaceAll(' ', '-') : anime.title.romaji.replaceAll(' ', '-')}`}>
                            <CoverImg src={anime.coverImage.extraLarge} alt={anime.id} />
                            <P>{anime.title.english ? anime.title.english : anime.title.romaji}</P>

                        </NavLink>
                    </SwiperSlide>
                ))}
            </Swiper>
            <SliderTitle>
                <h4>Popular Season Ini</h4>
                <A href='/popularlist'>Lebih banyak</A>
            </SliderTitle>
            <Swiper
                slidesPerView={3.1}
                centeredSlides={true}
                centeredSlidesBounds={true}
                spaceBetween={12}
            >
                {pops.map((anime) => (
                    <SwiperSlide key={anime.id}>
                        <NavLink to={`/anime/${anime.id}/${anime.title.english ? anime.title.english.replaceAll(' ', '-') : anime.title.romaji.replaceAll(' ', '-')}`}>
                            <CoverImg src={anime.coverImage.extraLarge} alt={anime.id} />
                            <P>{anime.title.english ? anime.title.english : anime.title.romaji}</P>
                        </NavLink>
                    </SwiperSlide>
                ))}
            </Swiper>
            <SliderTitle>
                <h4>Akan Hadir</h4>
                <A href='/upcominglist'>Lebih banyak</A>
            </SliderTitle>
            <Swiper
                slidesPerView={3.1}
                centeredSlides={true}
                centeredSlidesBounds={true}
                spaceBetween={12}
            >
                {ups.map((anime) => (
                    <SwiperSlide key={anime.id}>
                        <NavLink to={`/anime/${anime.id}/${anime.title.english ? anime.title.english.replaceAll(' ', '-') : anime.title.romaji.replaceAll(' ', '-')}`}>
                            <CoverImg src={anime.coverImage.extraLarge} alt={anime.id} />
                            <P>{anime.title.english ? anime.title.english : anime.title.romaji}</P>
                        </NavLink>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Popular