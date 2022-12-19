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
    width: "30rem",
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


const Register = () => {

  const authTest = useRecoilValue(authState)

  const router = useRouter();

  useEffect(() => {
    if (authTest?.isLoggedIn) {
        router.push("/")
    }
  },[authTest])

  const schema = yup.object().shape({
    email: yup.string()
      .required("Please enter the email address")
      .email("Please enter a valid email address."),
    password: yup.string()
      .required("Please enter the password to login."),
    username: yup.string()
      .required("Please enter the username to regster.")
  })

  const classes = useStyles()
  const { signup: {loading, request: signup, error} } = useAuth();

  const { handleSubmit, register, formState: { errors: formErrors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    signup(data.email, data.password, {...data})
  };

  const errMessage = {
    'auth/email-already-in-use': 'The user with provided info still exists',
    'auth/invalid-email': 'The email is invalid',
    'auth/weak-password': 'The password is too weak'
  }


  return (
    <Layout auth={false}>
      <Box className={classes.box} alignItems="center" justifyContent="center" height='50rem'>
        <Paper classes={{ root: classes.paper }}>
          <Grid container direction='row' justifyContent='space-around' height='fit-content' mt='8%'>
            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
              <Grid container item direction='column' justifyContent='flexStart' justifySelf='center'>
                <Typography variant='h6' classes={{ h6: classes.login }}>Register</Typography>
                <Typography variant='body1' classes={{ body1: classes.details }} mt='10%'>Please fill with your details</Typography>
                <Grid item mt='12%'>
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    classes={{ root: classes.textField }}
                    {...register('email')}
                    error={error === 'auth/invalid-email' || error === 'auth/email-already-in-use' ? true : (formErrors.password ? true : false)}
                    helperText={error === 'auth/invalid-email' || error === 'auth/email-already-in-use' ? errMessage[error] : formErrors.email?.message}
                    InputProps={{ classes: classes }}
                    required={true}
                    type="email"
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
                <Grid item mt='8%'>
                  <TextField
                    label="Username"
                    variant="outlined"
                    classes={{ root: classes.textField }}
                    {...register('username')}
                    error={formErrors.password ? true : false}
                    helperText={formErrors.password?.message}
                    InputProps={{ classes: classes }}
                    required={true}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent='space-between' mt='12%' width='30rem' mb='10%'>
                  <Grid item>
                    <Button variant='contained' classes={{ root: classes.button2 }} type='submit' disabled={loading}>
                      {loading && <CircularProgress size={24} />}
                      {!loading && "Register"}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Link href='/login' passHref>
                      <Button component={'a'} variant='contained' classes={{ root: classes.button1 }} type='submit' disabled={loading}>
                        Exisiting User? Login Here
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


export default Register;
