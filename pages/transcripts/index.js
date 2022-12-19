import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useRecoilValue } from 'recoil';
import { authState } from '../../libs/atoms/auth';

import { Grid, Box, CircularProgress } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { Layout } from '../../components';

import { useAuth } from '../../libs/hooks/auth';

import { fetchTranscripts } from '../../firebase/transcripts';
import { CardComponent, SideBar } from '../../components';


const useStyles = makeStyles(() => ({
    box: {
        backdropFilter: 'blur(5px)',
        background: 'linear-gradient(180deg, rgba(255,255,255,1) -20%, rgba(8,103,239,0.5) 100%)',
        height: '60rem'
    }
}));

const SavedTranscripts = () => {

    const authTest = useRecoilValue(authState)

    const router = useRouter();
    const classes = useStyles();
    const { logout: { loading: apiLoad, request: logout, error } } = useAuth()
    const [data, setData] = useState([])
    const [categories, setCategories] = useState(['All'])
    const [filterData, setFilterData] = useState([])
    const [loading, setLoading] = useState(false)

    const onDrawerSelect = (item) => {
        if (item === 'All') {
            setFilterData(data)
        } else {
            let filteredData = data.filter((doc) => doc.categories.includes(item))
            setFilterData(filteredData)
        }
    }

    useEffect(() => {
        if (!authTest?.isLoggedIn) {
            router.push("/login")
        }
    }, [authTest])

    useEffect(() => {

        if (authTest) {
            setLoading(true)
            fetchTranscripts(authTest?.uid).then((response) => {
                let categoryArr = []
                let finalData = response.map((doc) => {
                    let category = []
                    Object.keys(doc.categories).forEach((key) => {
                        if (!categoryArr.includes(key))
                            categoryArr.push(key)
                        category.push(key)
                    })
                    return {
                        title: doc.title,
                        transcript: doc.transcript,
                        categories: category,
                        id: doc.id,
                        uid: doc.uid
                    }
                })
                setCategories([...categories, ...categoryArr])
                setLoading(false)
                setData(finalData)
                setFilterData(finalData)
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })
        }
    }, [authTest])


    return (
        <Layout auth={authTest?.isLoggedIn} logout={logout}>
        <Box display='flex' flexDirection='row' >
            {!loading && <SideBar data={categories} onDrawerSelect={onDrawerSelect}/>}
            {
                !loading ? (
                    filterData.length > 0 ? (
                        <Grid container classes={{ root: classes.box }} paddingTop='4rem'>
                            {
                                filterData?.map((item) => (
                                    <Grid item>
                                        <CardComponent data={item} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    ):
                    (
                        <Grid container classes={{ root: classes.box }} justifyContent='center' alignItems='center'>
                            <h1>No Saved Transcripts</h1>
                        </Grid>
                    )
                ) 
                    : 
                    (<Box classes={{root: classes.box}}>
                        <CircularProgress size={24}/>
                    </Box>
                    )
            }
        </Box>
        </Layout>
    )

}


export default SavedTranscripts