import React from 'react'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import {useDispatch, useSelector} from 'react-redux'
import './styles/Cities.css'

import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBar() {
    // eslint-disable-next-line
    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal} = state;


    const dispatch = useDispatch()
    const snack = useSelector(store => store.usersReducers.alert)


    const handleClose = () => {
        dispatch({
            type: 'MESSAGE',
            payload: {view: false, message: '', success: false}
        })
    }
    const messagge = (
        <Box className='snackbar'>
            {(typeof snack.message) === "string" ?
            (<p>{snack.message}</p>) :
            <div>{snack.message.map((message,index) =><p key={index}>{message.message}</p>)}</div>
            }
        </Box>
    )
    return (
        <>
        <Stack spacing={2} sx={{ width: '100%'}}>
            <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={snack.view}
            autoHideDuration={3000}
            onClose={handleClose}
            message={
                <Alert onClick={handleClose} severity="info" sx={{ width: '100%' }}>
                    {messagge}
                </Alert>
            }
            />
        </Stack>
        </>
    )
}

export default SnackBar

