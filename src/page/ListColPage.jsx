/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { db } from '../firebase-config'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import { NavLink } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    letter-spacing: 0.05em;
    font-weight: 700;
    text-align: center;
`

const itemnBox = css`
    background: #151f2e;
    border-radius: 10px;
    color: #c2d3cd;
`

const ListColPage = () => {

    const [users, setUsers] = useState([])
    const docRef = doc(db, 'users', 'user1');

    useEffect(() => {
        const getColName = async () => {
            await onSnapshot(collection(docRef, 'colName'), (snapshot) =>
                setUsers(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))))
            // console.log(users)
        }

        getColName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <ListContainer>
            <h1 css={css` ${title}`}>Collection List</h1>
            <Stack spacing={2}>
                {users.map((col) => (
                    <NavLink to={`/user/${col.colName}`} key={col.colName}>
                        <Item css={css` ${itemnBox}`} >
                            {col.colName}
                        </Item>

                    </NavLink>
                ))}
            </Stack>

        </ListContainer >

    )
}

export default ListColPage