const mongoose = require("mongoose");

const resumeModel = new mongoose.Schema(
    {
        personalinfo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        education: {
            type: Array,
            required: [true, "Education is required"],
        },
        skill: {
            type: Array,
            required: [true, "Skill is required"],
        },
        project: [],
        experience: [],
        interest: [],
    },
    { timestamps: true }
);

const Resume = mongoose.model("resume", resumeModel);

module.exports = Resume;

/*
*UserSchema[name, contact,email, profile pic, links, ResumeSchema] 
*ResumeSchema [ 
    Personal Info(UserSchema), 
    Education(Institute Name, Degree, Board, Year, Grades), 
    Skills(a,b,c,d,Certificate), 
    Projects(Name, Technology Used, Description, Deployed/share link), 
    Experience(Company Name, Designation, From-To), 
    Interests&Hobbies(a,b,c,d, certificate)
    ]
*/
