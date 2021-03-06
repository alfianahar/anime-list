import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { NavLink } from 'react-router-dom';
import defaultBann from './default-banner.jpg'
import DeleteCol from './DeleteCol';
import RenameCol from './RenameCol';

export default function CollectionCard({ data, animeRef, colRef }) {
    // console.log(data.data === undefined)
    return (
        <Card sx={{ maxWidth: '100%', bgcolor: '#c2d3cd' }}>
            <CardActionArea>
                <CardMedia
                    component={NavLink}
                    to={`/user/${data.colName}`}
                    image={
                        data.data === undefined ? defaultBann : data.data.bannerImage ? data.data.bannerImage : data.data.coverImage.extraLarge ? data.data.coverImage.extraLarge :
                            defaultBann}
                    alt={data.colName}
                    sx={{ aspectRatio: '3.5 / 1' }}
                />
                <CardContent sx={{ paddingY: "8px" }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: '700' }}>
                        {data.colName}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ paddingY: "0px" }}>
                <RenameCol />
                <DeleteCol data={data} animeRef={animeRef} colRef={colRef} />
            </CardActions>
        </Card>
    );
}
