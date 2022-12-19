// import "regenerator-runtime/runtime";

import React, { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useRecoilValue } from "recoil";

import { authState } from "../../libs/atoms/auth";
import { useAuth } from "../../libs/hooks/auth";

import { Box, Typography, Paper, Grid, Stack, TextField, Button, CircularProgress } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import {Layout} from '../../components';

const useStyles = makeStyles(() => ({
  paper: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 28px #00000029",
    borderRadius: "22px",
    opacity: 1,
    width: '40rem',
    justifySelf: 'center',
    alignSelf: 'center'
  },
  box: {
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, rgba(255,255,255,1) -20%, rgba(8,103,239,0.5) 100%)'

  },
  SME: {
    textAlign: 'left',
    font: "normal normal 600 28px/40px Poppins",
    letterSpacing: '0px',
    color: '#091B7C',
    opacity: 1
  },
  body: {
    textAlign: 'left',
    font: "normal normal normal 18px/30px Poppins",
    letterSpacing: '0px',
    color: '#383940',
    opacity: 1
  },
  register: {
    textAlign: 'left',
    font: "normal normal normal 18px/35px Poppins",
    letterSpacing: '0px',
    color: '#747670',
    opacity: 1
  },
  login: {
    textAlign: 'left',
    font: "normal normal 600 20px/28px Poppins",
    letterSpacing: '0px',
    color: '#161F50',
    opacity: 1
  },
  details: {
    textAlign: 'left',
    font: "normal normal 500 14px/29px Poppins",
    letterSpacing: '0px',
    color: '#383940',
    opacity: 1
  },
  textField: {
    background: "#FFF 0% 0% no-repeat padding-box",
    width: "25rem",
    height: '100%',
    transition: "none",
    borderRadius: '8px',
    '&&&:before': {
      background: "#FFF 0% 0% no-repeat padding-box",
      width: "30rem",
      borderColor: "#000"
    },
    '&&:after': {
      background: "#FFF 0% 0% no-repeat padding-box",
      width: "30rem",
      borderColor: "#000"
    }
  },
  root: {
    background: "#FFF 0% 0% no-repeat padding-box",
    width: "100%",
    height: "100%",
    '&&&:before': {
      background: "#FFF 0% 0% no-repeat padding-box",
      width: "30rem",
      borderColor: "#000"
    },
    '&&:after': {
      background: "#FFF 0% 0% no-repeat padding-box",
      width: "30rem",
      borderColor: "#000"
    },
    "&:hover": {
      background: "#FFF 0% 0% no-repeat padding-box",
      borderColor: "#000"
    }
  },
  input: {
    textAlign: "left",
    font: "normal normal normal 16px/37px Poppins",
    letterSpacing: "0px",
    color: "#000",
    backgroundColor: '#FFF',
    '&:before': {
      backgroundColor: '#FFF'
    },
    '&:after': {
      backgroundColor: '#FFF'
    },
    "&:hover": {
      background: "#FFF 0% 0% no-repeat padding-box"
    }
  },
  button1: {
    background: 'rgba(8,103,239,0.5) 0% 0% no-repeat padding-box',
    boxShadow: '0px 6px 16px rgba(8,103,239,0.47)',
    borderRadius: '12px',
    opacity: 1,
    width: 'auto',
  },
  button2: {
    background: '#0A54C4 0% 0% no-repeat padding-box',
    boxShadow: '0px 6px 16px #0A54C473',
    borderRadius: '12px',
    opacity: 1,
    width: '11rem',
  }
}));


const Login = () => {

  const authTest = useRecoilValue(authState)

  const router = useRouter();
  const { login: { loading, request: login, error } } = useAuth();

  useEffect(() => {
    if (authTest?.isLoggedIn) {
      router.push("/")
    }
  }, [authTest])

  const schema = yup.object().shape({
    email: yup.string()
      .required("Please enter the email address")
      .email("Please enter a valid email address."),
    password: yup.string()
      .required("Please enter the password to regster.")
  })

  const classes = useStyles()

  const { handleSubmit, register, formState: { errors: formErrors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    login(data.email, data.password)
  };

  const errMessage = {
    'auth/user-not-found': 'The email does not exist',
    'auth/wrong-password': 'The email and password do not match'
  }

  return (
    <Layout auth={false}>
      <Box className={classes.box} alignItems="center" justifyContent="center" height='50rem'>
        <Paper classes={{ root: classes.paper }}>
          <Grid container direction='row' justifyContent='space-around' >
            <Box component='form' onSubmit={handleSubmit(onSubmit)} height='30rem' mt='12%'>
              <Grid container item direction='column' justifyContent='flexStart'>
                <Typography variant='h6' classes={{ h6: classes.login }}>Login</Typography>
                <Typography variant='body1' classes={{ body1: classes.details }} mt='10%'>Please fill with your details</Typography>
                <Grid item mt='12%'>
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    classes={{ root: classes.textField }}
                    {...register('email')}
                    error={error === 'auth/user-not-found' ? true : (formErrors.password ? true : false)}
                    helperText={error === 'auth/user-not-found' ? errMessage[error] : formErrors.email?.message}
                    InputProps={{ classes: classes }}
                    required={true}
                  />
                </Grid>
                <Grid item mt='8%'>
                  <TextField
                    label="Password"
                    variant="outlined"
                    classes={{ root: classes.textField }}
                    {...register('password')}
                    error={error === 'auth/wrong-password' ? true : (formErrors.password ? true : false)}
                    helperText={error === 'auth/wrong-password' ? errMessage[error] : formErrors.password?.message}
                    InputProps={{ classes: classes }}
                    required={true}
                    type="password"
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent='space-between' mt='12%' width='100%'>
                  <Grid item>
                    <Button variant='contained' classes={{ root: classes.button2 }} type='submit' disabled={loading}>
                      {loading && <CircularProgress size={24} />}
                      {!loading && "Login"}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Link href='/register' passHref>
                      <Button component={'a'} variant='contained' classes={{ root: classes.button1 }} type='submit' disabled={loading}>
                        New User? Register Here
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
            </Box>
          </Grid>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Login;
