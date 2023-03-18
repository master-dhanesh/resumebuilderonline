import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { async_resetpassword } from "../store/Actions/userActions";

const Reset = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ResetHandler = () => {
        const passwords = {
            oldpassword: "123456",
            newpassword: "654321",
        };
        dispatch(async_resetpassword(passwords));
        navigate("/profile");
    };
    return (
        <div>
            <h3>Reset</h3>
            <button onClick={ResetHandler} className="btn btn-danger">
                Reset Password
            </button>
        </div>
    );
};

export default Reset;
