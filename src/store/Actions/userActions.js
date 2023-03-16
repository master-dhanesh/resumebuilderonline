import axios from "../../helpers/axiosconfig";
import { loaduser, _error, loading, removeuser } from "../Reducers/userSlice";

export const async_loaduserAction = () => async (dispatch, getStore) => {
    try {
        const { data } = await axios.post("/me");
        console.log(data);
        dispatch(loaduser(data.user));
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_signupuser = (user) => async (dispatch, getStore) => {
    try {
        const res = await axios.post("/signup", user);
        console.log(res);
        dispatch(async_loaduserAction());
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_signinuser = (user) => async (dispatch, getStore) => {
    try {
        const res = await axios.post("/signin", user);
        console.log(res);
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
