import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function CollectionCard() {
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                    sx={{ aspectRatio: '4.75 / 1' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="medium" color="primary">
                    Rename
                </Button>
                <Button size="medium" color="warning">
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}
