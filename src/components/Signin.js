import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { async_signinuser } from "../store/Actions/userActions";

const Signin = () => {
    const dispatch = useDispatch();
    const signinhandler = async () => {
        const user = {
            email: "sheryians.community@gmail.com",
            password: "123456",
        };
        dispatch(async_signinuser(user));
    };
    return (
        <div>
            {/* form to signin */}
            <button onClick={signinhandler}>Signin</button> <br />
            <Link to="/forget">Forget Password</Link>
        </div>
    );
};

export default Signin;
