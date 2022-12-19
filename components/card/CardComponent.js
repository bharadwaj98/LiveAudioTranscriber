import * as React from 'react';

import { Box, Card, CardActions, CardContent, Button, Divider, Typography, Chip, Stack, CardHeader, Grid } from '@mui/material';

import { makeStyles } from '@mui/styles';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

import { useRecoilState } from 'recoil';

import { notificationState } from '../../libs/atoms/notification';
import { deleteTranscript } from '../../firebase/transcripts';
import { Router, useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
    box: {
        backdropFilter: 'blur(5px)',
        background: 'linear-gradient(180deg, rgba(255,255,255,1) -20%, rgba(8,103,239,0.5) 100%)',
        height: '60rem'
    }
}));

export const CardComponent = ({ data }) => {
    const classes = useStyles();
    const router = useRouter();

    const [notification, setNotificationState] = useRecoilState(notificationState);

    const onCopy = (text) => {
        navigator.clipboard.writeText(text);
        setNotificationState({ type: 'success', open: true, message: 'Copied to clipboard' });
    }

    const onDelete =(uid, id) => {
        deleteTranscript(uid, id).then((response) => {
            setNotificationState({ type: 'success', open: true, message: 'Transcript deleted' });
        }).catch((error) => {
            setNotificationState({ type: 'error', open: true, message: 'Error deleting transcript' });
        })
        router.reload();
    }
    return (
        <Box sx={{ minWidth: '27rem', height: '22rem' }}>
            <Card variant="outlined" sx={{ height: '22rem' }}>
                <CardHeader title={data?.title} sx={{display:'flex', justifyContent: 'center'}}/>
                <Divider orientation='horizontal' fullwidth />
                <CardContent>
                    <Grid container direction='column' rowGap={3}>
                        <Stack style={{justifyItems:'flex-end'}} direction='row'>
                            {
                                data?.categories.map((category, index) => (
                                    <Chip label={category} variant="outlined" sx={{width: '5rem', alignSelf:'self-end'}} />
                                ))
                            }
                        </Stack>
                        <Typography sx={{ mb: 1.5, height: '9rem', overflowY: 'hidden', textOverflow: 'scroll' }} color="text.secondary">
                            {data?.transcript}
                        </Typography>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container>
                        <Button size="large" onClick={() => { onCopy(data?.transcript) }}>Share</Button>
                        <Button size="large" onClick={() => { onDelete(data?.uid, data?.id) }}>Delete</Button>    
                    </Grid>
                </CardActions>
            </Card>
        </Box>
    );
}