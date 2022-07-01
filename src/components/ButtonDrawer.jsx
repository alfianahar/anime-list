import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import { db } from '../firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore'

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

    const docRef = doc(db, 'users', 'QhQUrl4OrOAu6p5ikEGn');
    // const allColRef = doc(db, 'users/QhQUrl4OrOAu6p5ikEGn');
    console.log(docRef)

    const createCol = async () => {
        let colRef = collection(docRef, newCol)
        // console.log(colRef)
        await addDoc(colRef, { animeId: animeid, timestamp: serverTimestamp() })
        console.log(newCol)
    }

    useEffect(() => {
        const getUser = async () => {
            const data = await getDoc(docRef)
            // console.log(data)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // console.log(users)
        }

        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            <Input placeholder="Add new collection" inputProps={ariaLabel} pattern="[A-Za-z0-9]+" onChange={(e) => {
                                setNewCol(e.target.value)
                            }} />
                            <Button sx={{
                                width: 100,
                            }} variant="contained" onClick={() => { createCol(); handleClose(); }}>Add</Button>
                        </Box>
                        {users.map((user) => {
                            return (
                                <Button sx={{
                                    width: 100,
                                }} variant="contained" >{user.id}</Button>
                            )
                        })}
                    </Box>
                </Modal>
            </div>
        </>
    );
}
