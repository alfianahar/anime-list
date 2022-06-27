import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination, Autoplay } from "swiper";
import styled from "@emotion/styled";
import animeData from "../api/api";

const BannerImg = styled('img')`
    position: relative;
    height: 12rem;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
`

const AniTitle = styled('div')`
    background: rgba(194, 211, 205, 0.5);
    padding: 0.25rem;
    bottom: 20px;
    left: 20px;
    float: left;
    position: absolute;
    border-radius: 5px;
    z-index: 9999;
    color: #0B1622;
    font-size: 1rem;
    font-weight: 900;
`

const Trending = styled('nav')`
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

const MainPage = () => {

    const [animes, setAnimes] = useState([])

    useEffect(() => {
        animeData(1, 10).then((response) => setAnimes(response.media))
    })

    return (
        <>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={true}
                slidesPerView={1.1}
                centeredSlides={true}
                centeredSlidesBounds={true}
                spaceBetween={7}
                modules={[Pagination, Autoplay]}
            >
                {animes.map((anime) => (
                    <SwiperSlide>
                        <BannerImg src={anime.bannerImage} key={anime.id} alt={anime.id} />
                        <AniTitle>
                            {anime.title.english}

                        </AniTitle>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Trending>
                <h4>Trending Sekarang</h4>
                <a>Lebih banyak</a>
            </Trending>
            <Swiper
                slidesPerView={3.1}
                centeredSlides={true}
                centeredSlidesBounds={true}
                spaceBetween={10}
            >
                {animes.map((anime) => (
                    <SwiperSlide>
                        <BannerImg src={anime.coverImage.medium} key={anime.id} alt={anime.id} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default MainPage