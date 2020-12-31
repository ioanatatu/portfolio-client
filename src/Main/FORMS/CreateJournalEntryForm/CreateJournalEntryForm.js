// Style
import style from "./CreateJournalEntryForm.module.scss";
import "./react-datepicker.css";

// React
import React, { useState } from "react";

// Packages
import DatePicker from "react-datepicker";

// Components
import Error from "../../../UI/Error";
import { MdClear } from "react-icons/md";

// Axios
import axios from "axios";

const CreateJournalEntry = ({
    passProjectToState,
    toggleJournalEntryFormIsVisible,
    projects,
}) => {
    console.log("PROJECTS from CreateJournalEntry", projects);
    // state
    const [startDate, setStartDate] = useState(new Date());
    const [selectedProject, setSelectedProject] = useState(null);
    const [password, setPassword] = useState(null);

    // errors
    const [generalError, setGeneralError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("DATE__", new Date(startDate).toISOString());
        console.log("PROJECT__", selectedProject);
        console.log("PASS__", password);
        /* 
        try {
            const res = await axios.post(
                "https://0ryd02k588.execute-api.eu-west-1.amazonaws.com/dev/project",
                data,
                {
                    validateStatus: function (status) {
                        return status;
                    },
                }
            );
        } catch (err) {
            console.log(JSON.stringify(err));
        }
        */
    };
    const selectProject = (e) => {
        setSelectedProject(e.currentTarget.id);
    };
    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={style.FormContainer}>
            <span className={style.CloseButton}>
                <MdClear onClick={toggleJournalEntryFormIsVisible} />
            </span>

            <h1>Create New Journal Entry</h1>

            {generalError && (
                <Error fontSize={"12px"} marginLeft={3}>
                    Oops, something went wrong. Try again later.
                </Error>
            )}
            <h4>
                The idea from Create Project Form applies here as well: without
                entering a password, the state will be updated only on the
                client-side, but lost upon page refresh.
            </h4>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className={style.ProjectDateWrapper}>
                    <div>
                        <h3>For which day?</h3>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="MMMM d, yyyy"
                            inline
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>
                            <h3>For which project?</h3>
                            <ul>
                                {projects &&
                                    projects.map((project) => (
                                        <li key={project.ID}>
                                            <input
                                                type="radio"
                                                name={project.title}
                                                id={project.title}
                                                onClick={selectProject}
                                                defaultChecked={
                                                    selectedProject === project.title
                                                }
                                                className={style.SelectProject}
                                            />
                                            <label htmlFor={project.title}>
                                                {project.title}
                                            </label>
                                        </li>
                                    ))}
                            </ul>
                        </span>
                        <span>
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    // onClick={() => setInvalidPasswordError(false)}
                                />
                                {/*invalidPasswordError && (
                                <div className={style.Error}>Invalid password</div>
                            )*/}
                            </label>
                            <div className={style.CreateButton}>
                                <input type="submit" value="create" />
                            </div>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateJournalEntry;
/*
 *
 *
 *
 *
 *
 *
 * helper functions & data
 *
 */
