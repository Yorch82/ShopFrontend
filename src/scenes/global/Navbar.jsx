import React, { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
  Badge,
  MenuItem,
  Button,
  Menu,
  
} from '@mui/material';
import {
  Search,
  DarkMode,
  LightMode,
  Close,
  ShoppingBagOutlined,
  MenuOpen
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';
import { setIsCartOpen } from '../../features/cart/index';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.auth?.user?.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setLogout = e => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <FlexBetween padding='1rem 6%' backgroundColor={alt}>
      <FlexBetween gap='1.75rem'>
        <Typography
          fontWeight='bold'
          fontSize='clamp(1rem, 2rem, 2.25rem)'
          color='primary'
          onClick={() => navigate('/')}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          Tech Shop
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius='9px'
            gap='3rem'
            padding='0.1rem 1.5rem'
          >
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap='2rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color='secondary'
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px',
              },
            }}
          >
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              {theme.palette.mode === 'dark' ? (
                <ShoppingBagOutlined sx={{ fontSize: '25px' }} />
              ) : (
                <ShoppingBagOutlined sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
          </Badge>

          <Button
            id='demo-positioned-button'
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}            
          >
            {!user ? 'Login' : `${user.name}`}
          </Button>
          {!user ? (
            <Menu
              id='demo-positioned-menu'
              aria-labelledby='demo-positioned-button'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={() => navigate('/loginpage')}>
                Go to Login Page
              </MenuItem>
            </Menu>
          ) : (
            <Menu
              id='demo-positioned-menu'
              aria-labelledby='demo-positioned-button'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My orders</MenuItem>
              <MenuItem onClick={setLogout}>Logout</MenuItem>
            </Menu>
          )}
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuOpen />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position='fixed'
          right='0'
          bottom='0'
          height='100%'
          zIndex='10'
          maxWidth='500px'
          minWidth='300px'
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display='flex' justifyContent='flex-end' p='1rem'>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap='3rem'
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: '25px' }}
            >
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
            <Badge
              badgeContent={cart.length}
              color='secondary'
              invisible={cart.length === 0}
              sx={{
                '& .MuiBadge-badge': {
                  right: 5,
                  top: 5,
                  padding: '0 4px',
                  height: '14px',
                  minWidth: '13px',
                },
              }}
            >
              <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                {theme.palette.mode === 'dark' ? (
                  <ShoppingBagOutlined sx={{ fontSize: '25px' }} />
                ) : (
                  <ShoppingBagOutlined sx={{ color: dark, fontSize: '25px' }} />
                )}
              </IconButton>
            </Badge>
            <Button
              id='demo-positioned-button'
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {!user ? 'Login' : `${user.name}`}
            </Button>
            {!user ? (
              <Menu
                id='demo-positioned-menu'
                aria-labelledby='demo-positioned-button'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={() => navigate('/loginpage')}>
                  Go to Login Page
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                id='demo-positioned-menu'
                aria-labelledby='demo-positioned-button'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My orders</MenuItem>
                <MenuItem onClick={setLogout}>Logout</MenuItem>
              </Menu>
            )}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
