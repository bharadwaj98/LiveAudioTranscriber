import React from "react";

import {
    Grid,
    Stack,
    Toolbar,
    Box,
    Typography,
    IconButton,
    AppBar,
    Button,
} from "@mui/material";

import Link from "next/link";

import { Profile } from './Profile'

const TopNav = (props) => {
    const { classes, auth, logout } = props;
    return (
        <AppBar position="static" classes={{ root: classes.navBg }}>
            <Toolbar>
                <Grid
                    container
                    justifyContent={"space-between"}
                    direction="row"
                    alignItems="left"
                >
                    <Grid item>
                        <Link href="/" passHref>
                            <a>
                                <Typography classes={{ root: classes.navStyles }}>Speech To Text Converter</Typography>
                            </a>
                        </Link>
                    </Grid>
                    {
                        !auth
                            ? (
                                <Link href='/login' passHref>
                                    <Button component="a" type='text' classes={{ root: classes.button1 }}>
                                        <Typography classes={{ root: classes.navStyles }} style={{ fontSize: '18px' }}>Login</Typography>
                                    </Button>
                                </Link>
                            )
                            : (

                                <Button type='text' classes={{ root: classes.button1 }}>
                                    <Typography classes={{ root: classes.navStyles }} style={{ fontSize: '18px' }} onClick={() => logout()}>Logout</Typography>
                                </Button>

                            )
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default TopNav;
