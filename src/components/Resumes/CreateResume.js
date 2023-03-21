import React from "react";
import MultiStep from "react-multistep";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Interests from "./Interests";
import Experience from "./Experience";
import { useDispatch } from "react-redux";
import { async_submitresume } from "../../store/Actions/userActions";

const CreateResume = () => {
    const dispatch = useDispatch();
    const steps = [
        { title: "Education", component: <Education /> },
        { title: "Skills", component: <Skills /> },
        { title: "Projects", component: <Projects /> },
        { title: "Experience", component: <Experience /> },
        { title: "Interests", component: <Interests /> },
    ];
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Create Resume</h1>
                <button
                    onClick={() => dispatch(async_submitresume())}
                    className="btn btn-success"
                >
                    Submit Resume
                </button>
            </div>
            <hr />
            <MultiStep steps={steps} />
        </div>
    );
};

export default CreateResume;
