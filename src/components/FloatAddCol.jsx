import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function FloatAddCol() {
    return (
        <Box sx={{ top: 'auto', right: '20px', bottom: '20px', left: 'auto', position: 'fixed', '& > :not(style)': { m: 1 } }}>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Box>
    );
}
