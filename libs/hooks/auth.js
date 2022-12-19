import { useSetRecoilState, useRecoilState } from "recoil";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";

import { authState } from "../atoms/auth"
import { useState } from "react";
import { userInfo } from "os";
import { useRouter } from "next/router";

import { createFirebaseApp } from "../../firebase/clientApp";
import { getFirestore } from "firebase/firestore";

import { addUser } from "../../firebase/users";

import useSWR from 'swr';

import axios from 'axios';
const firebase = createFirebaseApp()
const auth = getAuth();
const firestore = getFirestore();

// const fetcher = (url, data) => axios.post(url, {
//     method: 'POST', body: JSON.stringify(data), headers: {
//         "Content-Type": "application/json",
//     },
// }).then(r => r.json())

export const useAuth = () => {

    const setAuth = useSetRecoilState(authState)
    // const firebase = createFirebaseApp()

    const router = useRouter();
    const auth = getAuth();

    const [loginLoading, setLoginLoading] = useState(false)
    const [logoutLoading, setLogoutLoading] = useState(false)
    const [signupLoading, setSignupLoading] = useState(false)

    const [loginError, setLoginError] = useState(null)
    const [logoutError, setLogoutError] = useState(null)
    const [signupError, setSignupError] = useState(false)

    const config = {
        headers: { 
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        }
    }

    const onSignUp = async (info) => {
        addUser(info)
    }

    const signUp = (email, password, userInfo) => {
        setSignupLoading(true)
        let result;
        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log(response, 'response')
                result = response;
                return auth.currentUser.getIdTokenResult()
            })
            .then((user) => {
                console.log(user, 'userInformation', userInfo)
                setSignupLoading(false)
                if (Object.keys(userInfo).length > 0) {
                    const reqObj = {
                        uid: user.claims.user_id,
                        username: userInfo.username,
                        email: email
                    }
                    // const { data, error } = useSWR(['/api/addUser', reqObj], fetcher)
                    onSignUp(reqObj)
                }
                // router.push('/')
                setAuth({
                    isLoggedIn: true,
                    refreshToken: result._tokenResponse.refreshToken,
                    user: JSON.parse(JSON.stringify(result.user)),
                    uid: user.claims.user_id
                })
                localStorage.setItem('auth', JSON.stringify({
                    isLoggedIn: true,
                    refreshToken: result._tokenResponse.refreshToken,
                    user: result.user,
                    uid: user.claims.user_id
                }))
                // const id = firebase.firestore().collection(user.claims.user_id).doc().id;
            }).catch((error) => {
                setSignupLoading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                setSignupError(errorCode)
                console.log(errorCode)
                console.log(errorMessage)
            });
    }

    const login = (email, password) => {
        setLoginLoading(true)
        let result;
        signInWithEmailAndPassword(auth, email, password).then((response) => {
            result = response;
            return auth.currentUser.getIdTokenResult()
        }).then((user) => {
            console.log(user, 'userInformation')
            setLoginLoading(false)
            setAuth({
                isLoggedIn: true,
                authToken: result._tokenResponse.accessToken,
                refreshToken: result._tokenResponse.refreshToken,
                user: JSON.parse(JSON.stringify(result.user)),
            })
            localStorage.setItem('auth', JSON.stringify({
                isLoggedIn: true,
                authToken: result._tokenResponse.accessToken,
                refreshToken: result._tokenResponse.refreshToken,
                user: result.user,
                // businessId: user.claims.businessId,
                // uid : user.claims.user_id
            }))
        }).catch((error) => {
            setLoginLoading(false)
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginError(errorCode)
            console.log(errorCode)
            console.log(errorMessage)
        });
    }

    const logout = () => {
        setLogoutLoading(true)
        signOut(auth).then(() => {
            setLogoutLoading(false)
            console.log("Logout Successful...")
            setAuth({ isLoggedIn: false, authToken: null, refreshToken: null, user: null, businessId: null, uid: null })
            localStorage.removeItem('auth')
            router.push('/login');
        }).catch((error) => {
            setLogoutLoading(false)
            console.log(error);
        })
    }

    return {
        login: {
            loading: loginLoading,
            request: login,
            error: loginError
        },
        logout: {
            loading: logoutLoading,
            request: logout,
            error: logoutError
        },
        signup: {
            loading: signupLoading,
            request: signUp,
            error: signupError
        }
    }
}
