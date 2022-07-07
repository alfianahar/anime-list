import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { NavLink } from 'react-router-dom';
import defaultBann from './default-banner.jpg'

export default function CollectionCard({ data }) {
    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardActionArea>
                <CardMedia
                    component={NavLink}
                    to={`/user/${data.col}`}
                    image={data.data.bannerImage ? data.data.bannerImage : data.data.coverImage.extraLarge ? data.data.coverImage.extraLarge : defaultBann}
                    alt={data.col}
                    sx={{ aspectRatio: '4.75 / 1' }}
                />
                <CardContent sx={{ paddingY: "8px" }}>
                    <Typography variant="h5" component="div" >
                        {data.col}
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
