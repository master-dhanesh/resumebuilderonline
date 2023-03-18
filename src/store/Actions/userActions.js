import axios from "../../helpers/axiosconfig";
import { loaduser, _error, removeuser } from "../Reducers/userSlice";
export * from "../Reducers/userSlice";

export const async_loaduserAction = () => async (dispatch, getStore) => {
    try {
        const { data } = await axios.post("/me");
        dispatch(loaduser(data.user));
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_signupuser = (user) => async (dispatch, getStore) => {
    try {
        const res = await axios.post("/signup", user);
        dispatch(async_loaduserAction());
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_signinuser = (user) => async (dispatch, getStore) => {
    try {
        const res = await axios.post("/signin", user);
        dispatch(async_loaduserAction());
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_signoutuser = () => async (dispatch, getStore) => {
    try {
        const res = await axios.post("/signout");
        console.log(res);
        dispatch(removeuser());
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_uploadavatar = (formdata) => async (dispatch, getStore) => {
    try {
        const id = getStore().userReducer.user._id;
        const { data } = await axios.post("/avatar/" + id, formdata);
        console.log(data);
        dispatch(async_loaduserAction());
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_resetpassword =
    (passwords) => async (dispatch, getStore) => {
        try {
            const id = getStore().userReducer.user._id;
            const res = await axios.post("/reset/" + id, passwords);
            dispatch(async_loaduserAction());
        } catch (error) {
            dispatch(_error(error.response.data.message));
        }
    };

export const async_sendmail = (mail) => async (dispatch, getStore) => {
    try {
        const res = await axios.post("/send-mail/", mail);
        console.log(res.data);
        dispatch(async_loaduserAction());
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_verifyotp = (data) => async (dispatch, getStore) => {
    try {
        const res = await axios.post("/forget/", data);
        console.log(res.data);
        dispatch(async_loaduserAction());
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};
