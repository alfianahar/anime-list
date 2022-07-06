/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { NavLink, useLocation } from 'react-router-dom';
import { animebyId } from '../api/api';
import { db } from '../firebase-config'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import DeleteDialog from '../components/DeleteDialog';


const usePathname = () => {
    const location = useLocation();
    return location.pathname;
}

const ListContainer = styled('div')`
    padding-left: 1rem;
    padding-right: 1rem;    
`

const Img = styled('img')`
    width: 100%  
`

const CollectionPage = () => {

    const currentPath = usePathname().substring((usePathname().lastIndexOf("/")
    ) + 1)
    const colPath = currentPath
    const titlePath = currentPath.toUpperCase()
    // console.log(colPath)

    const [list, setList] = useState()

    // const docRef = doc(db, 'users', 'user1');
    // const colNameRef = collection(db, 'users', 'user1', 'colName');
    const animeListRef = collection(db, 'users', 'user1', 'animeList');
    const q = query(animeListRef, where("colName", "==", colPath));

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
                    <ListContainer>
                        <ImageList sx={{ width: 'auto', height: '100%' }}>
                            <ImageListItem key="Subheader" cols={2}>
                                <ListSubheader component="div" align="center" sx={{ bgcolor: '#151f2e', color: '#c2d3cd', borderRadius: '5px', fontWeight: 'bold', fontSize: '1.25rem' }}> {titlePath}</ListSubheader>
                            </ImageListItem>
                            {list.map((item) => (
                                <ImageListItem key={item.id} sx={{ borderRadius: '5px' }} >
                                    <NavLink to={`/anime/${item.id}/${item.title.english ? item.title.english.replaceAll(' ', '-') : item.title.romaji.replaceAll(' ', '-')}`}>

                                        <Img
                                            src={`${item.coverImage.extraLarge}?w=248&fit=crop&auto=format`}
                                            srcSet={`${item.coverImage.extraLarge}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title.english ? item.title.english : item.title.romaji}
                                            loading="lazy"
                                        />


                                    </NavLink>
                                    < ImageListItemBar
                                        title={item.title.english ? item.title.english : item.title.romaji}
                                        subtitle={item.author}
                                        actionIcon={
                                            <DeleteDialog item={item} col={colPath} />
                                        }
                                    />

                                </ImageListItem>


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
