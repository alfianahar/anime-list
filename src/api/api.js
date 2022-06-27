import axios from 'axios';

async function animeData(page = 1, perPage = 5, sort = 'TRENDING_DESC', seasonYear = 2022, status, season) {
    const query = `
            query ($page: Int, $perPage: Int, $sort: [MediaSort], $seasonYear: Int $status: MediaStatus, $season: MediaSeason) {
                Page(page: $page, perPage: $perPage) {
                    pageInfo {
                        total
                        currentPage
                        lastPage
                        hasNextPage
                        perPage
                    }
                    media(isAdult: false, type: ANIME, sort: $sort, seasonYear: $seasonYear, status: $status, season: $season) {
                        id
                        title {
                            romaji
                            english
                        }
                        siteUrl
                        bannerImage
                        coverImage {
                            medium
                            extraLarge
                        }
                        status
                    }
                }
            }`;
    let variables = {
        page: page,
        perPage: perPage,
        sort: sort,
        seasonYear: seasonYear,
        status: status,
        season: season,
    };
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };
    return await axios.post(`https://graphql.anilist.co`, {
        query,
        variables,
        headers
    }).then(response => {
        // console.log('api response', response.data.data.Page)
        return response.data.data.Page
    }).catch(err => console.log(err.message))
}

export default animeData