import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import { db } from '../firebase-config'
import { collection, doc, serverTimestamp, setDoc, onSnapshot } from 'firebase/firestore'

const ariaLabel = { 'aria-label': 'description' };

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#0B1622',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ButtonDrawer({ animeid }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [users, setUsers] = useState([])
    const [newCol, setNewCol] = useState('')
    const [existingCol, setExistingCol] = useState('')
    const ref = useRef(true)

    const docRef = doc(db, 'users', 'user1');
    const colNameRef = collection(db, 'users', 'user1', 'colName');
    const animeListRef = collection(db, 'users', 'user1', 'animeList');
    console.log(newCol)

    const createCol = async () => {
        // console.log(colRef)
        await setDoc(doc(colNameRef, newCol), { colName: newCol })
        // await addDoc(animeListRef, { colName: newCol, animeId: animeid, timestamp: serverTimestamp() })
        await setDoc(doc(animeListRef, newCol + "-" + animeid), { colName: newCol, animeId: animeid, timestamp: serverTimestamp() })
    }

    const addAnimeinCol = async () => {
        await setDoc(doc(animeListRef, existingCol + "-" + animeid), { colName: existingCol, animeId: animeid, timestamp: serverTimestamp() })
        console.log(existingCol + ' run')
    }

    useEffect(() => {
        const getUser = async () => {
            await onSnapshot(collection(docRef, 'colName'), (snapshot) =>
                setUsers(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))))
            // console.log(users)
        }

        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (ref.current) {
            ref.current = true
            return
        }
        addAnimeinCol()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [existingCol])

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Add to List</Button>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Select collection
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 },
                                bgcolor: '#c2d3cd',
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Input placeholder="Add new collection" inputProps={ariaLabel} value={newCol} onChange={(e) => {
                                setNewCol(e.target.value.toLowerCase().replace(/[^\w]/gi, ''))
                            }} />
                            <Button sx={{
                                width: 100,
                            }} variant="contained" onClick={() => { createCol(); handleClose(); }}>Add</Button>
                        </Box>
                        {users.map((user) => {
                            return (
                                <Button sx={{
                                    width: 332, mt: 1,
                                }} variant="contained" onClick={() => {
                                    ref.current = false;
                                    setExistingCol(user.id); handleClose();
                                }} key={user.id}>{user.id}</Button>
                            )
                        })}
                    </Box>
                </Modal>
            </div>
        </>
    );
}
