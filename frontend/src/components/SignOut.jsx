import React from 'react'
import Typography from '@mui/material/Typography'
import {Link as LinkRouter} from "react-router-dom"
import MenuItem from '@mui/material/MenuItem'
import {connect} from 'react-redux';
import usersActions from '../redux/actions/usersActions';

function SignOut(props) {
    function signOut() {
		props.signOut(props.user.email)
	}
    return ( //returno el HTML
        <MenuItem onClick={props.handleCloseUserMenu}>
            <LinkRouter to={'/'}>
                <Typography onClick={signOut} className='fredokaFont' sx={{color: 'black'}}>signout</Typography>
            </LinkRouter>
        </MenuItem>       
    )
}

const mapDispatchToProps = {
	signOut: usersActions.SignOut,
}

const mapStateToProps = (state) => {
	return {
		user: state.usersReducers.user,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)