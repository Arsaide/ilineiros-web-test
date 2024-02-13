import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import {drawerWidth} from './index';
import Drawer from "@mui/material/Drawer";
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SideBar from './sideBar/SideBar'
import useOpenUserMenu from "../../../hooks/useOpenUserMenu/useOpenUserMenu";
import useDrawerState from "../../../hooks/useDrawerState/useDrawerState";
import useOpenModal from "../../../hooks/useOpenModal/useOpenModal";
import {useContext} from "react";
import {Context} from "../../../index";
import RegModal from "../modals/regModal/RegModal";
import LoginModal from "../modals/loginModal/LoginModal";

interface ResponsiveDrawerProps {
    children: React.ReactNode;
}

export default function ResponsiveDrawer({children}: ResponsiveDrawerProps) {
    const {store} = useContext(Context);
    const handleSubmit = () => {
        store.logout();
        window.location.reload();
    };

    const isAuth = localStorage.getItem('isAuth') === 'true';

    const {mobileOpen, handleDrawerClose, handleDrawerTransitionEnd, handleDrawerToggle} = useDrawerState();
    const {handleOpenUserMenu, anchorElUser, handleCloseUserMenu} = useOpenUserMenu();

    const {
        openLoginModal,
        openRegistrationModal,
        handleLoginClickOpen,
        handleRegistrationClickOpen,
        handleClose,
    } = useOpenModal();

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                    bgcolor: "#040A2F",
                }}>
                <Toolbar>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: {
                            md: 'flex-end',
                            sm: 'space-between'
                        },
                        width: '100%'
                    }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {sm: 'none'}}}>
                            <MenuIcon/>
                        </IconButton>
                        <Box sx={{flexGrow: 0}}>

                            {!isAuth && (
                                <>
                                    <Button
                                        variant="contained"
                                        color='inherit'
                                        sx={{
                                            color: 'white',
                                            bgcolor:"#1B266B",
                                            '&:hover': {
                                                bgcolor: '#2c3f9e',
                                            },
                                    }}
                                        onClick={handleLoginClickOpen}>
                                        Log in
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color='inherit'
                                        sx={{
                                            color: 'white',
                                            bgcolor:"#1B266B",
                                            ml:2,
                                            '&:hover': {
                                                bgcolor: '#2c3f9e',
                                            },
                                    }}
                                        onClick={handleRegistrationClickOpen}>
                                        Registration
                                    </Button>


                                    <RegModal
                                        open={openRegistrationModal}
                                        onClose={handleClose}
                                    />
                                    <LoginModal
                                        open={openLoginModal}
                                        onClose={handleClose}
                                    />
                                </>
                            )}

                            {isAuth && (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Avatar alt="Monkey King" src="/avatar/avatar.jpg"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{mt: '45px'}}
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
                                        onClose={handleCloseUserMenu}>

                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Account</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Button onClick={handleSubmit}>Log out</Button>
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                        </Box>
                    </Box>
                </Toolbar>

            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {bgcolor: "#040A2F", boxSizing: 'border-box', width: drawerWidth},
                    }}>
                    <SideBar/>
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {bgcolor: "#040A2F", boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open>
                    <SideBar/>
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
                <Toolbar/>
                {children}
            </Box>
        </Box>
    );
}