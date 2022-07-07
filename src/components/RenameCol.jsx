import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { db } from '../firebase-config'
// import { doc, deleteDoc } from 'firebase/firestore'

export default function RenameCol({ item, col }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const deleteAnime = async (id) => {
    //     const animeDoc = doc(db, 'users', 'user1', 'animeList', col + '-' + id);
    //     await deleteDoc(animeDoc)
    // }

    return (
        <div>
            <Button size="medium" color="primary" onClick={handleClickOpen}>
                Rename
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"This feature on progress"}
                </DialogTitle>
                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This feature under progress, please wait for an update!
                    </DialogContentText>
                </DialogContent> */}
                {/* <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => {
                        // deleteAnime(item.id); 
                        handleClose()
                    }} autoFocus>
                        Yes
                    </Button>
                </DialogActions> */}
            </Dialog>
        </div >
    );
}
