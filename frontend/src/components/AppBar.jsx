import * as React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import logo from '../image/logo.png';
import {Link as LinkRouter} from "react-router-dom"
import SignOut from './SignOut';
import { connect, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person'


const navBarOptions=[{ nombre: 'Home', to: '/' },{ nombre: 'Cities', to: '/cities' }];
const settings = [{to:'/signin' , name: 'Sign in'},{to:'/signup', name: 'Sign up'}];

const  ResponsiveAppBar = (props) => {
  const user = useSelector(store => store.usersReducers.user)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#8d6e63" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={process.env.PUBLIC_URL + '/image/Logo2.png'} alt='logo' />
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
              {navBarOptions.map((page, index) => (
                <LinkRouter to={page.to} key={index}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography className='NavBarFont' sx={{textAlign: 'center'}}>{page.nombre}</Typography>
                  </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: "100vw", justifyContent: "center", padding: 1 }}>
            <img src={process.env.PUBLIC_URL + '/image/Logo2.png'} alt='logo' />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', width: "100vw", justifyContent: "center" } }}>
            {navBarOptions.map((page, index) => (
              <LinkRouter to={page.to} key={index}>
                <Button className='NavBarFont' onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.nombre}
                </Button>
              </LinkRouter>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user ? <Avatar alt="photoUser" src={user.photoUser} /> : <Avatar src="/static/images/avatar/2.jpg" />}
              </IconButton>
            </Tooltip>
  
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {props.user ?
               <SignOut handleCloseUserMenu={handleCloseUserMenu} /> :
              settings.map((element,index) => (
                <LinkRouter  key={index} onClick={handleCloseUserMenu}  to={element.to} >
                <MenuItem>
                  <Typography textAlign="center">{element.name}</Typography>
                </MenuItem>
                </LinkRouter>
                
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.usersReducers.user,
  }
}
export default connect(mapStateToProps, false)( ResponsiveAppBar)


// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import { Link as LinkRouter } from 'react-router-dom';
// import { SignOutUser } from '../../../controllers/usersControllers';



// const pages = [{ nombre: 'Home', to: '/' },
// { nombre: 'Cities', to: '/cities' }
// ];
// const settings = [
//   { nombre: "Sign In", to: "/signin" },
//   { nombre: "Sign Up", to: "/signup" }
//   { nombre: "Sign Out", to: "/signout" }
// ];

// const ResponsiveAppBar = () => {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#8d6e63" }}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
//             <img src={process.env.PUBLIC_URL + '/image/Logo2.png'} alt='logo' />
//           </Box>



//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}

//             >
//               {pages.map((page, index) => (
//                 <LinkRouter to={page.to} key={index}>
//                   <MenuItem onClick={handleCloseNavMenu}>
//                     <Typography className='NavBarFont' sx={{textAlign: 'center'}}>{page.nombre}</Typography>
//                   </MenuItem>
//                 </LinkRouter>
//               ))}
//             </Menu>
//           </Box>
//           <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: "100vw", justifyContent: "center", padding: 1 }}>
//             <img src={process.env.PUBLIC_URL + '/image/Logo2.png'} alt='logo' />
//           </Box>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', width: "100vw", justifyContent: "center" } }}>
//             {pages.map((page, index) => (
//               <LinkRouter to={page.to} key={index}>
//                 <Button className='NavBarFont' onClick={handleCloseNavMenu}
//                   sx={{ my: 2, color: 'white', display: 'block' }}
//                 >
//                   {page.nombre}
//                 </Button>
//               </LinkRouter>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {props.user ?
//                <SignOut handleCloseUserMenu={handleCloseUserMenu} /> :
//               settings.map((element,index) => (
//                 <LinkRouter  key={index} onClick={handleCloseUserMenu}  to={element.to} ></LinkRouter>
              
//               {settings.map((setting, index) => (
//                 <LinkRouter key={index} to={setting.to} onClick={handleCloseUserMenu}>
//                   <Button style= {{textAlign: 'center'}}>{setting.nombre}</Button>
//                 </LinkRouter>
//               ))}


//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default ResponsiveAppBar;





// const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  // return (
  //   <AppBar style={{height:'6rem', padding:'0.5rem' }} position="static" sx={{ backgroundColor:"rgb(250,191,183)",}} > 
  //     <Container maxWidth="xl">
  //       <Toolbar disableGutters>
  //         <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
  //         <img src={process.env.PUBLIC_URL + '/image/Logo2.png'} alt='logo' />
  //         </Box>
  //         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
  //           <IconButton
  //             size="large"
  //             aria-label="account of current user"
  //             aria-controls="menu-appbar"
  //             aria-haspopup="true"
  //             onClick={handleOpenNavMenu}
  //             color="inherit"
  //           >
  //             <MenuIcon />
  //           </IconButton>
  //           <Menu
  //             id="menu-appbar"
  //             anchorEl={anchorElNav}
  //             anchorOrigin={{
  //               vertical: 'bottom',
  //               horizontal: 'left',
  //             }}
  //             keepMounted
  //             transformOrigin={{
  //               vertical: 'top',
  //               horizontal: 'left',
  //             }}
  //             open={Boolean(anchorElNav)}
  //             onClose={handleCloseNavMenu}
  //             sx={{
  //               display: { xs: 'block', md: 'none' },
  //             }}
  //           >
  //               {navBarOptions.map((element,index) => (
  //              <LinkRouter  key={index} onClick={handleCloseNavMenu} to={element.to}>
  //               <MenuItem >
  //                 <Typography textAlign="center">{element.name}</Typography>
  //               </MenuItem>
  //               </LinkRouter>
  //             ))}
  //           </Menu>
  //         </Box>
  //          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: "100vw", justifyContent: "center", padding: 1 }}>
  //            <img src={process.env.PUBLIC_URL + '/image/Logo2.png'} alt='logo' />
  //          </Box>
  //         {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width:"100vw", justifyContent:"center" }}>
  //        <img src={logo} alt="imagen logo" style={{width:"40px"}} className='logo' />
  //         </Box> */}
  //         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
  //           {navBarOptions.map((element,index) => (
  //             <LinkRouter key={index}
  //             onClick={handleCloseNavMenu}
  //              to={element.to}>
  //               <Button sx={{ my: 2.5, color: 'white', display: 'block'}}>
  //               {element.name}
  //             </Button></LinkRouter>
  //           ))}
  //         </Box>
  //         <Box sx={{ flexGrow: 0 }}>
  //           <Tooltip title="Open settings">
  //             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
  //             {props.user ? 
  //             <Avatar className='avatar' src={props.user.photoUser} sx={{width: '40px', height: '40px'}}></Avatar> :
  //             <PersonIcon />
  //             }
  //             </IconButton>
    
  //           </Tooltip>