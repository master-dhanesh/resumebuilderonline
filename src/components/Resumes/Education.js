import { useState } from "react";

const Education = () => {
    const template = {
        institute: "",
        degree: "",
        board: "",
        year: "",
        grade: "",
    };
    const [education, setEducation] = useState(
        JSON.parse(localStorage.getItem("education")) || [template]
    );

    const ChangeHandler = (e, index) => {
        const updatedEducation = education.map((edu, i) =>
            index == i ? { ...edu, [e.target.name]: e.target.value } : edu
        );
        setEducation(updatedEducation);
    };

    const AddFieldsHandler = () => {
        setEducation([...education, template]);
    };

    const DeleteFieldsHandler = (index) => {
        const copyEducation = [...education];
        copyEducation.splice(index, 1);
        setEducation(copyEducation);
    };

    const SaveHandler = () => {
        localStorage.setItem("education", JSON.stringify(education));
    };

    return (
        <div>
            {education.length === 0 ? (
                <p className="text-center text-danger fs-4">
                    No Education Present Yet.
                </p>
            ) : (
                ""
            )}
            {education.map((edu, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Institute Name"
                        name="institute"
                        onChange={(e) => ChangeHandler(e, index)}
                        value={edu.institute}
                    />
                    <input
                        type="text"
                        placeholder="Degree Name"
                        name="degree"
                        onChange={(e) => ChangeHandler(e, index)}
                        value={edu.degree}
                    />
                    <input
                        type="text"
                        placeholder="Board Name"
                        name="board"
                        onChange={(e) => ChangeHandler(e, index)}
                        value={edu.board}
                    />
                    <input
                        type="text"
                        placeholder="Completing Year"
                        name="year"
                        onChange={(e) => ChangeHandler(e, index)}
                        value={edu.year}
                    />
                    <input
                        type="text"
                        placeholder="grade"
                        name="grade"
                        onChange={(e) => ChangeHandler(e, index)}
                        value={edu.grade}
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

export default Education;
