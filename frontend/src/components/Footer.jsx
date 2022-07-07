import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {Link as LinkRouter} from 'react-router-dom';
import './styles/Footer.css'



const pages = [{nombre:'Home', to:'/'},
  {nombre:'Cities', to:'/cities' }
 ];
// const settings = ['Profile', 'Account', 'SignIn', 'Logout'];

const Footer = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <AppBar position="static" sx={{backgroundColor:"#8d6e63"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
           <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
           <img src='./image/Logo2.png' alt='logo' /> 
           </Box>
           


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              
            >
              {pages.map((page, index) => (
                <LinkRouter to={page.to} key={index}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography className='NavBarFont' textAlign="center">{page.nombre}</Typography>
                </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width:"100vw", justifyContent:"center", padding:1 }}>
          <img src='./image/Logo2.png' alt='logo' /> 
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', width:"100vw", justifyContent:"center" } }}>
            {pages.map((page, index) => (
              <LinkRouter to={page.to} key={index}>
             <Button className='NavBarFont' onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.nombre}
              </Button>
              </LinkRouter>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Footer;








