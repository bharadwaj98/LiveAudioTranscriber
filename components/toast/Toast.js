import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useRecoilState } from 'recoil';


import { notificationState } from '../../libs/atoms/notification';


export const Toast = () => {
    const [state, setState] = useRecoilState(notificationState)
    const handleClose = (event) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setState({
            ...state,
            open: false
        });
    };
    
    return (
        <Snackbar open={state.open} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={ state.type } sx={{ width: '100%' }}>
                { state.message }
            </Alert>
        </Snackbar>
    );
}