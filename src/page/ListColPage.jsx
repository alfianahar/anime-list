/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { animebyId } from '../api/api';
import { db } from '../firebase-config'
import { collection, doc, query, where, onSnapshot, limit } from 'firebase/firestore'
import CollectionCard from '../components/CollectionCard';
import FloatAddCol from '../components/FloatAddCol';

const ListContainer = styled('div')`
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

const title = css`
    font-size: 1.5rem; 
    line-height: 2rem;
    padding-bottom: 1.25rem;
    letter-spacing: 0.05em;
    font-weight: 700;
    text-align: center;
`

const float = css`
    margin: 0;
    top: 'auto';
    right: 20;
    bottom: 20;
    left: 'auto';
    position: 'fixed';
`

const ListColPage = () => {

    const [cols, setCols] = useState([])
    const [data, setData] = useState()


    const docRef = doc(db, 'users', 'user1');
    // const colNameRef = collection(db, 'users', 'user1', 'colName');
    const animeListRef = collection(db, 'users', 'user1', 'animeList');



    useEffect(() => {
        const getColName = async () => {
            await onSnapshot(collection(docRef, 'colName'), (snapshot) => {
                setCols(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
                // console.log(cols.length)
            })
        }
        getColName()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const getAnime = async () => {
            let animes = [];
            cols.forEach(col => {
                const q = query(animeListRef, where("colName", "==", col.colName), limit(1))
                onSnapshot(q, async (querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        const anime = { ...doc.data(), id: doc.id };
                        animes.push(anime);
                        // console.log(anime)
                    })
                    const animesNew = [];
                    for (let anime of animes) {
                        const response = await animebyId(anime.animeId);
                        animesNew.push({ col: anime.colName, data: response.media[0] });
                    }
                    setData(animesNew);
                })
            })
        }
        getAnime()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cols]);
    // console.log(cols)
    console.log(data)

    return (
        <ListContainer>
            <h1 css={css` ${title}`}>Collection List</h1>
            {data === undefined ?
                <>still loading...</>
                :
                <Stack spacing={2}>
                    {data.map((col) => (
                        <CollectionCard data={col} key={col.col} />
                    ))}
                </Stack>
            }
            <FloatAddCol />
        </ListContainer >

    )
}

export default ListColPage