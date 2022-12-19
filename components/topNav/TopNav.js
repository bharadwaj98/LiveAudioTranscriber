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

import {useRouter} from "next/router";

const TopNav = (props) => {
    const { classes, auth, logout } = props;
    const router = useRouter();

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
                            : router.pathname === '/transcripts' 
                            ?
                            (
                                <Stack direction='row' columnGap={3}>
                                    <Link href='/' passHref>
                                        <Button component='a' classes={{ root: classes.button1 }}>
                                            <Typography classes={{ root: classes.navStyles }} style={{ fontSize: '18px' }}>Back to home</Typography>
                                        </Button>
                                    </Link>
                                    <Button type='text' classes={{ root: classes.button1 }}>
                                        <Typography classes={{ root: classes.navStyles }} style={{ fontSize: '18px' }} onClick={() => logout()}>Logout</Typography>
                                    </Button>
                                </Stack>

                            )
                            :
                            (
                                <Stack container direction='row' columnGap={3}>
                                    <Link href='/transcripts' passHref>
                                        <Button component='a' classes={{ root: classes.button1 }}>
                                            <Typography classes={{ root: classes.navStyles }} style={{ fontSize: '18px', whiteSpace: 'nowrap' }}>Saved Transcripts</Typography>
                                        </Button>
                                    </Link>
                                    <Button type='text' classes={{ root: classes.button1 }}>
                                        <Typography classes={{ root: classes.navStyles }} style={{ fontSize: '18px' }} onClick={() => logout()}>Logout</Typography>
                                    </Button>
                                </Stack>

                            )
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default TopNav;
