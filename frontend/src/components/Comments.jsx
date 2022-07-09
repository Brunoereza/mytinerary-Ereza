import * as React from 'react';
import './styles/SignUsers.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux'
import usersActions from '../redux/actions/usersActions'
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function comment() {
  const navigate = useNavigate()
  const dispatch = useDispatch() 
  const handleSubmit = async (event) => {//cuando el usuario hace click se ejecuta la funcion
    event.preventDefault();

    const logedUser = {
      email: event.target[0].value,
      password: event.target[2].value,
      from: "form-signin"
  }//se harcodea el from
  await dispatch(usersActions.signInUsers(logedUser))//el dispatch llama de la useraction a la accion signin user y le pasa un objeto, ese objeto contiene un email, un password y un from
  const token = localStorage.getItem('token')//recupero el token de local store si esta seteado
  if (token) {// si esta el token lo redirecciono al Navigate
      console.log('navigate')
      navigate("/")
    }
  // dispatch(usersActions.signInUsers(logedUser))
  };

  return (
    <div className='conteiner-comment'>
      <ThemeProvider theme={theme}>
      <Container className='conteiner-users' component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Comments!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="comment"
              label="Add your comment!"
              name="comment"
              autoComplete="comment"
              autoFocus
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add your comment!
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Modify your comment!
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
    
  );
}