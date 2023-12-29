import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import BackdropLoader from './BackdropLoader';
import LogoutIcon from '@mui/icons-material/Logout';
import { MenuItem } from "@material-ui/core";

const UserMenu = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserProfileClick = () => {
    navigate('/studentProfile')
  };
  const handleLogoutClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem('@storage_Key');
      localStorage.removeItem('userId');


      setIsLoading(false);
      navigate('/login');
    }, 2000);
  };


  return (
    <div>
      {/* IconButton und Menü-Icon */}
      <IconButton
        style={{ backgroundColor: 'transparent' }}
        color="inherit"
        aria-label="user menu"
        onClick={handleMenuOpen}
        disableRipple
        disableFocusRipple
      >
        <AccountCircleIcon fontSize="large" style={{ color: '#000', fontSize: '50px' }} />
        <ArrowDropDownIcon fontSize="small" style={{ marginTop: '5px' }} />
      </IconButton>

      {/* Das Dropdown-Menü */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          '.MuiPaper-root': {
            backgroundColor: '#F2F5F9',
          },
        }}
      >
        {/* Menüpunkt für Benutzerprofil */}
        <MenuItem onClick={handleUserProfileClick}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>

        {/* Menüpunkt für Logout */}
        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>

      {/* Ladeanzeige im Hintergrund */}
      <BackdropLoader open={isLoading} />
    </div>
  );
};

export default UserMenu;
