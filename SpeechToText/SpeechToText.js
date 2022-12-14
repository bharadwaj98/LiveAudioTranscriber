import React, { useState, useCallback } from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { Box, Grid, Typography, TextareaAutosize, Button, Stack } from '@mui/material';

import { SaveDialog } from './SaveDialog'

// import useSWR from 'swr'
// import axios from 'axios'

// const fetcher = (url) => axios({url: url, method: 'GET'}).then(res => res.json())

import { authState } from '../libs/atoms/auth';
import { useRecoilValue } from 'recoil';
import { getUserInfo } from '../firebase/users';

export const SpeechToText = ({username}) => {

  const [message, setMessage] = useState('')
  const [categories, setCategories] = useState({})

  const [open, setOpen] = React.useState(false);

  const auth = useRecoilValue(authState)


  const handleSpeech = (category, extractedWord, message) => {
    setMessage(message)
    if (categories[category]?.length > 0) {
      Object.keys(categories).map((item) => {
        if (item.category === category) {
          setCategories({
            ...categories,
            [category]: [...categories[category], extractedWord]
          })
        }
      })
    } else
      setCategories({...categories, [category]: [extractedWord || []]})
  }

  const commands = [
    {
      command: 'I would like to order *',
      callback: (food) => handleSpeech('food', food, `Your order is for: ${food}`)
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => handleSpeech('weather', condition, `Today, the weather is ${condition}`)
    },
    {
      command: 'My favourite sport is *',
      callback: (sport1) => handleSpeech('sports', sport1, `I love ${sport1} too!`),
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi ${username ? username : 'there'}! You said: "${command}"`), //username ? username :
      matchInterim: true
    },
    // {
    //   command: 'Beijing',
    //   callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
    //   // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.2
    // },
    // {
    //   command: ['eat', 'sleep', 'leave'],
    //   callback: (command) => setMessage(`Best matching command: ${command}`),
    //   isFuzzyMatch: true,
    //   fuzzyMatchingThreshold: 0.2,
    //   bestMatchOnly: true
    // },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ]
  

  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening
  } = useSpeechRecognition({ commands });


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>The access to the microphone is disabled.</span>;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onListen = () => {
    if (browserSupportsContinuousListening)
      SpeechRecognition.startListening({ continuous: true });
    else
      SpeechRecognition.startListening();
  }

  return (
    <Grid container flexDirection='column' justifyContent='center' width='100%' justifySelf='center' alignItems='center'>
      <Typography variant='h5' mt='10%' justifyContent='center' justifySelf='center' >Speech to Text Converter</Typography>
      <Grid item mt='5%' justifyContent='center' justifySelf='center'>
        <TextareaAutosize aria-label="minimum height"
          minRows={10}
          placeholder="You will see the transcript here"
          style={{ width: '50rem', border: '1px solid #ccc' }}
          value={transcript}
        />
      </Grid>
      <Grid item>
        {transcript &&
          (
              <Button variant="outlined" onClick={() => handleClickOpen()}>Save your transcript</Button>
          )
        }
        {open && transcript && <SaveDialog open={open} setOpen={setOpen} transcript={transcript} categories={categories} uid={auth?.uid || ''}/>}
      </Grid>
      <Grid container item direction='column' justifyContent='center' justifySelf='center' alingItems='center' mt='5%'>
        <Typography justifyContent='center' justifySelf='center' alignSelf='center'>{message}</Typography>
        <Typography justifyContent='center' justifySelf='center' alignSelf='center'>Microphone: {listening ? 'on' : 'off'}</Typography>
        <Stack direction='row' justifyContent='center' justifySelf='center'>
          <Button onClick={!listening ? onListen : SpeechRecognition.stopListening}>{!listening ? 'Start' : 'Stop'}</Button>
          <Button onClick={resetTranscript}>Reset</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};