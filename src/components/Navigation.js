import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { async_signoutuser } from "../store/Actions/userActions";

const Navigation = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.userReducer);

    return (
        <div>
            {!isAuthenticated ? (
                <>
                    <Link to="/">Home</Link> <br />
                    <Link to="/signin">Signin</Link> <br />
                    <Link to="/signup">Signup</Link> <br />
                    <Link to="/support">Support</Link> <br />
                </>
            ) : (
                <>
                    <Link to="/profile">Profile</Link> <br />
                    <Link to="/create-resume">Create Resume</Link> <br />
                    <Link to="/read-resume">Read Resume</Link> <br />
                    <Link to="/reset">Reset</Link> <br />
                    <button onClick={() => dispatch(async_signoutuser())}>
                        Signout
                    </button>
                </>
            )}
        </div>
    );
};

export default Navigation;
