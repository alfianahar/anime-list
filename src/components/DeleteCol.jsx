import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, deleteDoc, getDocs, query, where } from 'firebase/firestore'

export default function DeleteCol({ data, animeRef, colRef }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const deleteCol = async (col) => {
        const animeCol = doc(colRef, col);
        const q = query(animeRef, where("colName", "==", col))
        const snapshot = await getDocs(q)

        const result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        await deleteDoc(animeCol)
        result.forEach(async (result) => {
            const animeDoc = doc(animeRef, result.id);
            await deleteDoc(animeDoc)
        })
        // console.log(result)
    }


    return (
        <div>
            <Button size="medium" color="warning" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete This Collection"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this collection?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => {
                        deleteCol(data.colName);
                        handleClose()
                    }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
