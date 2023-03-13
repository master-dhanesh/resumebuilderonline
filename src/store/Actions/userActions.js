import axios from "../../helpers/axiosconfig";
import { apperror, loaduser } from "../Reducers/userSlice";

export const async_loaduserAction = () => async (dispatch, getStore) => {
    try {
        const res = await axios.post("/me");
        console.log(res);
    } catch (error) {
        dispatch(apperror(error.response.data.message));
    }
};
