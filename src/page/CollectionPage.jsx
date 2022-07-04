/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation } from 'react-router-dom';
import { animebyId } from '../api/api';
import { db } from '../firebase-config'
import { collection, addDoc, doc, query, where, onSnapshot, getDocs } from 'firebase/firestore'

const usePathname = () => {
    const location = useLocation();
    return location.pathname;
}

const ListContainer = styled('div')`
    padding-left: 1rem;
    padding-right: 1rem;    
`

const CollectionPage = () => {

    const currentPath = usePathname().substring((usePathname().lastIndexOf("/")
    ) + 1)
    const colPath = currentPath
    // console.log(colPath)

    const [details, setDetails] = useState()
    const [list, setList] = useState()



    // const docRef = doc(db, 'users', 'user1');
    // const colNameRef = collection(db, 'users', 'user1', 'colName');
    const animeListRef = collection(db, 'users', 'user1', 'animeList');
    const q = query(animeListRef, where("colName", "==", colPath));

    // const getId = async () => {
    //     let animes = [];
    //     await onSnapshot(q, (querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             animebyId(({ ...doc.data(), id: doc.id }.animeId)).then((response) => animes.push(response.media[0]));
    //             // animes.push({ ...doc.data(), id: doc.id }.animeId)
    //             // .map((i) => (
    //             //     animebyId(i.animeId).then((response) => setId(response.media))
    //             // ))
    //             // console.log({ ...doc.data(), id: doc.id }.animeId)
    //             // setList(animes)
    //         });
    //         // console.log(animes.length)

    //     })
    //     console.log(animes)
    //     // setList(animes)
    // }
    // const getId = async () => {
    //     // Snapshoot returns Unsubscribe to prevent from memoryleaks you need to ivoke it later like snap()
    //     const snap = onSnapshot(q, async (querySnapshot) => {
    //         if (querySnapshot.empty) return // If there is no data just do nothing.
    //         let promises = []
    //         for (let doc of querySnapshot.docs) {
    //             // Do all promisess in parallel
    //             promises.push(animebyId(({ ...doc.data(), id: doc.id }.animeId)))
    //         }
    //         // Await all promises
    //         const results = await Promise.all(promises)
    //         if (!results.length) return // If no result abort.
    //         let animes = []
    //         for (let doc of results) {
    //             animes.push(doc.media[0]);
    //         }
    //         setList(animes);
    //     })
    // }

    // useEffect(() => {

    //     getId()

    //     console.log(list)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    // console.log(list)
    // console.log(list.length)

    useEffect(() => {

        const getId = async () => {
            onSnapshot(q, async (querySnapshot) => {
                let animes = [];
                querySnapshot.forEach(doc => {
                    const anime = { ...doc.data(), id: doc.id };
                    animes.push(anime);
                })

                const animesNew = [];
                for (let anime of animes) {
                    const response = await animebyId(anime.animeId);
                    animesNew.push(response.media[0]);
                }
                setList(animesNew);
            })
        }

        getId()
        console.log(list)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>

            {list === undefined ?
                <>still Loading.....</> :

                <>

                    {/* <p>{list}</p> */}
                    <ListContainer>

                        <ImageList sx={{ width: '100%', height: '100%' }}>
                            <ImageListItem key="Subheader" cols={2}>
                                <ListSubheader component="div">{colPath}</ListSubheader>
                            </ImageListItem>
                            {list.map((item) => (
                                <>
                                    <ImageListItem key={item.id}>
                                        <img
                                            src={`${item.coverImage.extraLarge}?w=248&fit=crop&auto=format`}
                                            srcSet={`${item.coverImage.extraLarge}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title.english ? item.title.english : item.title.romaji}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            title={item.title.english ? item.title.english : item.title.romaji}
                                            subtitle={item.author}
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                    aria-label={`info about ${item.title.english ? item.title.english : item.title.romaji}`}
                                                >
                                                    <InfoIcon />
                                                </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                </>
                            )
                            )}
                        </ImageList>
                    </ListContainer>

                </>

            }
        </>
    )
}

export default CollectionPage
