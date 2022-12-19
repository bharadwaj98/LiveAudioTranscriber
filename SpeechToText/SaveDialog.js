import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';


import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import * as yup from 'yup';
import { addTranscript } from '../firebase/transcripts';

export const SaveDialog = ({ open, setOpen, transcript, categories, uid }) => {

    const handleClose = () => {
        setOpen(false);
    };

    const schema = yup.object().shape({
        title: yup.string()
            .required("Please enter the title for your transcript")
    })

    const { handleSubmit, register, formState: { errors: formErrors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        handleClose()
        addTranscript({ title: data.title, transcript: transcript, categories: categories, uid: uid })
    };

    return (
        <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column'>
            {/* <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save transcript</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To save the transcript, please enter a title for the transcript.
                    </DialogContentText> */}
            <TextField
                autoFocus
                margin="dense"
                id="title"
                {...register('title')}
                label="Title"
                // fullWidth
                variant="standard"
                error={formErrors.password ? true : false}
                helperText={formErrors.email?.message}

            />
            <Box mt={2}>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button type='submit'>Save transcript</Button>
            </Box>
            {/* </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog> */}
        </Box>
    );
}
