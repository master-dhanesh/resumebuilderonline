import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { async_signupuser } from "../store/Actions/userActions";

const Signup = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        isAuthenticated && navigate("/profile");
    }, []);

    const signuphandler = async () => {
        const user = {
            name: "sheryians coding school",
            email: "sheryians.community@gmail.com",
            password: "123456",
            contact: "1234567890",
            links: {
                github: "http://github.com/master-dhanesh",
                linkedin: "http://linkedin.com/master.dhanesh",
            },
        };
        dispatch(async_signupuser(user));
    };

    return (
        <div>
            {/* form to signup user */}
            <button onClick={signuphandler}>Signup</button>
        </div>
    );
};

export default Signup;
