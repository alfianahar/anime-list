import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import AddIcon from '@mui/icons-material/Add';
import { doc, setDoc } from 'firebase/firestore'

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

export default function AddCol({ colRef }) {
    const [open, setOpen] = useState(false);
    const [newCol, setNewCol] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewCol('');
    }


    const createNewCol = async () => {
        // console.log(colRef)
        await setDoc(doc(colRef, newCol), { colName: newCol })
    }

    return (
        <>
            <AddIcon onClick={handleOpen} />
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add New Collection
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
                            }} variant="contained" onClick={() => { createNewCol(); handleClose(); }}>Add</Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </>
    );
}
