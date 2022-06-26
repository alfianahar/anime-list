import axios from 'axios';

async function animeData(page = 1, perPage = 10, sort = 'TRENDING_DESC') {
    const query = `
            query ($page: Int, $perPage: Int, $sort: [MediaSort]) {
                Page(page: $page, perPage: $perPage) {
                        pageInfo {
                            total
                            currentPage
                            lastPage
                            hasNextPage
                            perPage
                        }
                        media(type: ANIME, isAdult: false , sort: $sort) {
                        id
                        title {
                            romaji
                            english
                        }
                        bannerImage
                        coverImage {
                            medium
                            extraLarge
                        }
                        status
                    }
                }
            }
        `
    let variables = {
        page: page,
        perPage: perPage,
        sort: sort
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