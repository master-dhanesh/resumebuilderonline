import React from "react";
import { useDispatch } from "react-redux";
import { async_signupuser } from "../store/Actions/userActions";

const Signup = () => {
    const dispatch = useDispatch();
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
