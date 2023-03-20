import React from "react";
import MultiStep from "react-multistep";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Interests from "./Interests";
import Experience from "./Experience";

const CreateResume = () => {
    const steps = [
        { title: "Education", component: <Education /> },
        { title: "Skills", component: <Skills /> },
        { title: "Projects", component: <Projects /> },
        { title: "Experience", component: <Experience /> },
        { title: "Interests", component: <Interests /> },
    ];
    return (
        <div className="container mt-5">
            <h1>Create Resume</h1>
            <hr />
            <MultiStep steps={steps} />
        </div>
    );
};

export default CreateResume;
