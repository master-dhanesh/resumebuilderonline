import React, { useState } from "react";

const Skills = () => {
    const template = {
        name: "",
    };
    const [skills, setskills] = useState(
        JSON.parse(localStorage.getItem("skills")) || [template]
    );

    const ChangeHandler = (e, index) => {
        const updatedskills = skills.map((edu, i) =>
            index == i ? { ...edu, [e.target.name]: e.target.value } : edu
        );
        setskills(updatedskills);
    };

    const AddFieldsHandler = () => {
        setskills([...skills, template]);
    };

    const DeleteFieldsHandler = (index) => {
        const copyskills = [...skills];
        copyskills.splice(index, 1);
        setskills(copyskills);
    };

    const SaveHandler = () => {
        localStorage.setItem("skills", JSON.stringify(skills));
    };

    return (
        <div>
            {skills.length === 0 ? (
                <p className="text-center text-danger fs-4">
                    No skills Present Yet.
                </p>
            ) : (
                ""
            )}
            {skills.map((edu, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Skill Name"
                        name="name"
                        onChange={(e) => ChangeHandler(e, index)}
                        value={edu.name}
                    />

                    <button
                        onClick={() => DeleteFieldsHandler(index)}
                        type="button"
                    >
                        ❌
                    </button>
                </div>
            ))}
            <button onClick={SaveHandler}>Save Changes</button>
            <hr />
            <button onClick={AddFieldsHandler}>Add More Fields</button>
        </div>
    );
};
export default Skills;
