import { atom } from "recoil";

let auth = 'null';

if (typeof window != "undefined") {
    auth = localStorage.getItem('auth')
}

let initialState = {
    isLoggedIn: false,
    user: null,
    refreshToken: null,
    uid: null,
    username: null
}

if (auth) {
    try {
        initialState = JSON.parse(auth);
    } catch(err) {
    }
}

export const authState = atom({
    key: "authState",
    default: initialState
})
