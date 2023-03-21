import React from "react";
import { useSelector } from "react-redux";

const ReadResume = () => {
    const { user } = useSelector((state) => state.userReducer);
    return (
        <div className="container mt-5">
            <h1 className="f-1 fw-lighter">Show Resume Templates</h1>
            <hr />
            {JSON.stringify(user.resumes)}
        </div>
    );
};

export default ReadResume;
