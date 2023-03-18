import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { async_signinuser } from "../store/Actions/userActions";

const Signin = () => {
    const { isAuthenticated } = useSelector((state) => state.userReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signinhandler = async () => {
        const user = {
            email: "sheryians.community@gmail.com",
            password: "654321",
        };
        dispatch(async_signinuser(user));
        navigate("/profile");
    };

    useEffect(() => {
        isAuthenticated && navigate("/profile");
    }, []);
    return (
        <div>
            {/* form to signin */}
            <button onClick={signinhandler}>Signin</button> <br />
            <Link to="/forget">Forget Password</Link>
        </div>
    );
};

export default Signin;
