import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { async_sendmail, async_verifyotp } from "../store/Actions/userActions";

const Forget = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const SendMailHandler = () => {
        const data = {
            email: "sheryians.community@gmail.com",
        };
        dispatch(async_sendmail(data));
    };

    const OTPVerifyHandler = () => {
        const data = {
            email: "sheryians.community@gmail.com",
            otp: "5531",
            password: "654321",
        };
        dispatch(async_verifyotp(data));
        navigate("/signin");
    };

    return (
        <div>
            <h3>Forget</h3>
            <button onClick={SendMailHandler}>Send Mail</button>
            <hr className="w-25" />
            <button onClick={OTPVerifyHandler}>Verify OTP</button>
        </div>
    );
};

export default Forget;
