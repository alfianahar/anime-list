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

const CollectionPage = () => {

    const currentPath = usePathname().substring((usePathname().lastIndexOf("/")
    ) + 1)
    const colPath = currentPath
    // console.log(colPath)

    const [id, setId] = useState([])
    const [list, setList] = useState([])



    // const docRef = doc(db, 'users', 'user1');
    // const colNameRef = collection(db, 'users', 'user1', 'colName');
    const animeListRef = collection(db, 'users', 'user1', 'animeList');


    useEffect(() => {
        const q = query(animeListRef, where("colName", "==", colPath));

        const getId = () => {
            onSnapshot(q, (querySnapshot) => {
                const animes = [];
                querySnapshot.forEach((doc) => {
                    // animebyId(doc.data().animeId).then((response) => animes.push(response.media[0]))
                    animes.push(doc.data().animeId);
                })
                setId(animes)
            })
        }
        getId()

    }, []);
    console.log(id)

    // useEffect(() => {
    //     id.map((anime) => (
    //         animebyId(anime).then((response) => setList(response.media))
    //     ))
    //     console.log(list)
    // }, [])

    return (
        <div>
            {/* <img src={list.coverImage.extraLarge} alt="sdasd" /> */}
            {/* <ImageList sx={{ width: 500, height: 450 }}>
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">{colPath}</ListSubheader>
                </ImageListItem>
                {id.map((item) => (
                    <ImageListItem >
                        <img
                            src={`${item.coverImage.extraLarge}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.coverImage.extraLarge}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title.english ? item.title.english : item.title.romaji}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
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
                ))}
            </ImageList> */}

            {/* <input
                placeholder='Name...'
                onChange={(e) => {
                    setNewName(e.target.value)
                }}
            />
            <input
                type='number'
                placeholder='Age...'
                onChange={(e) => {
                    setNewAge(e.target.value)
                }}
            />
            <button onClick={createUser}> Create User </button>
            {users.map((user) => {
                return (
                    <div>
                        {' '}
                        <h1>Name: {user.name}</h1>
                        <h1>Age: {user.age}</h1>
                        <button onClick={() => { updateUser(user.id, user.age) }}> Tambah Umur </button>
                        <button onClick={() => { deletUser(user.id) }}> Delete User </button>
                    </div>

                )
            })} */}
        </div>
    )
}

export default CollectionPage
