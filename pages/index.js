import React,{ useEffect } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {useRecoilValue, useSetRecoilState} from 'recoil';
import { authState } from '../libs/atoms/auth';
import { SpeechToText } from '../SpeechToText/SpeechToText'
import {firebase, auth} from '../firebase/clientApp';

import { Box, Typography, Paper, Grid, Stack, TextField, Button, CircularProgress } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import {Layout} from '../components';

import {useAuth} from '../libs/hooks/auth';

import { getUserInfo } from '../firebase/users';


const useStyles = makeStyles(() => ({
  box: {
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, rgba(255,255,255,1) -20%, rgba(8,103,239,0.5) 100%)'
  }
}));

export const Home = () =>{

  const authTest = useRecoilValue(authState)
  console.log(authTest,  'authState')

  const router = useRouter();
  const classes = useStyles();
  const { logout: { loading, request: logout, error } } = useAuth()

  const [username, setUsername] = React.useState('')


  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(()=>{
  
    if (!authTest?.isLoggedIn) {
        router.push("/login")
    }
  },[authTest])


  if(authTest){
    getUserInfo(authTest.uid).then((data) => {
      console.log(data)
      setUsername(data.username)
    })
  }

  return (
    <Layout auth={authTest?.isLoggedIn} logout={logout}>
      <Box classes={{root: classes.box}}>
        <SpeechToText username={username}/>
      </Box>
    </Layout>
  )
}

// export default () => {
//   const firebaseData = useRecoilValueLoadable(firebaseState)
//   switch (firebaseData.state) {
//       case 'hasValue':
//         return <Home firebase= {firebaseData.contents.firebase} auth={firebaseData.contents.auth} />;
//       case 'loading':
//         return <loading />
//       case 'hasError':
//         return <div>Error</div>
//   }
// }

export default Home;
