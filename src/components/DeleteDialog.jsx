import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { db } from '../firebase-config'
import { doc, deleteDoc } from 'firebase/firestore'

export default function DeleteDialog({ item, col }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteAnime = async (id) => {
        const animeDoc = doc(db, 'users', 'user1', 'animeList', col + '-' + id);
        await deleteDoc(animeDoc)
    }

    return (
        <div>
            <IconButton
                onClick={handleClickOpen}
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title.english ? item.title.english : item.title.romaji}`}
            >
                <DeleteForeverIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delet This List From Collection"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this list from your collection?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => { deleteAnime(item.id); handleClose() }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
