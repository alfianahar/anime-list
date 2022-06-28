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

const BannTitle = styled('div')`
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

const Banner = () => {

    const [animes, setAnimes] = useState([])

    useEffect(() => {
        animeData(1, 5).then((response) => setAnimes(response.media))
    }, [])

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
                        <BannerImg src={anime.bannerImage ? anime.bannerImage : anime.coverImage.extraLarge} key={anime.id} alt={anime.id} />
                        <BannTitle>
                            {anime.title.english ? anime.title.english : anime.title.romaji}
                        </BannTitle>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Banner