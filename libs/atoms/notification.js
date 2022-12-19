import { atom } from "recoil";

export const notificationState = atom({
    key: "notificationState",
    default: {
        open: false,
        type: "success",
        message: ""
    }
})
