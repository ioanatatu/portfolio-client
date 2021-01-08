// Style
import style from "./CreateJournalEntryForm.module.scss";
import "./react-datepicker.css";

// React
import React, { Fragment, useState } from "react";

// Packages
import DatePicker from "react-datepicker";
import ReactTooltip from "react-tooltip";

// Components
import Error from "../../../UI/Error";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import Checkmark from "../../../UI/Checkmark/Checkmark";
import CloseButton from "../../../UI/CloseButton/CloseButton";

// Axios
import axios from "axios";

const CreateJournalEntry = ({
    passNewJournalEntryToJournalEntryComponent,
    toggleJournalEntryFormIsVisible,
    projects,
}) => {
    // state
    const [startDate, setStartDate] = useState(new Date());
    const [selectedProject, setSelectedProject] = useState(null);
    const [password, setPassword] = useState("");
    const [checkmark, setCheckmark] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    // errors
    const [generalError, setGeneralError] = useState(false);
    const [projectExistsError, setProjectExistsError] = useState(false);
    const [noProjectSelectedError, setNoProjectSelectedError] = useState(false);
    const [invalidPasswordError, setInvalidPasswordError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingData(true);

        if (!selectedProject) {
            setLoadingData(false);
            return setNoProjectSelectedError(true);
        }

        if (password !== "") {
            const data = {
                date: new Date(startDate).toISOString(),
                project: selectedProject,
                password,
            };
            try {
                const res = await axios.post(
                    "https://0ryd02k588.execute-api.eu-west-1.amazonaws.com/dev/journal-entry",
                    data,
                    {
                        validateStatus: function (status) {
                            return status;
                        },
                    }
                );
                if (res.status === 401) {
                    setLoadingData(false);
                    setInvalidPasswordError(true);
                } else if (res.status === 409) {
                    setLoadingData(false);
                    setProjectExistsError(true);
                } else if (res.status === 200) {
                    passNewJournalEntryToJournalEntryComponent(res.data);
                    setTimeout(() => {
                        setTimeout(() => {
                            toggleJournalEntryFormIsVisible();
                        }, 2000);
                        setLoadingData(false);
                        setCheckmark(true);
                    }, 800);
                } else {
                    setGeneralError(true);
                }
            } catch (err) {
                console.log(JSON.stringify(err));
            }
        } else {
            setTimeout(() => {
                ///// TODO: here update state only on client-side, just like createProjectForm
                setLoadingData(false);
                toggleJournalEntryFormIsVisible();
            }, 500);
        }
    };
    const selectProject = (e) => {
        setSelectedProject(e.currentTarget.id);
    };
    const handleChange = (e) => {
        setPassword(e.target.value);
        setInvalidPasswordError(false);
    };

    return (
        <div
            className={style.FormContainer}
            data-tip="backend functionality working, need to work on updating state on frontend"
            data-for="fe"
        >
            <ReactTooltip id="fe" />

            {checkmark ? (
                <div className={style.CheckmarkContainer}>
                    <Checkmark />
                    <p>Your project has been created</p>
                </div>
            ) : (
                <Fragment>
                    <span className={style.CloseButton}>
                        <CloseButton click={toggleJournalEntryFormIsVisible} />
                    </span>

                    <h1>Create New Journal Entry</h1>

                    {generalError && (
                        <Error fontSize={"12px"} marginLeft={3}>
                            Oops, something went wrong. Try again later.
                        </Error>
                    )}
                    {projectExistsError && (
                        <Error fontSize={"12px"} marginLeft={3}>
                            Project already exists in this journal entry.
                            <br /> Choose a different project or go to the journal
                            entry of {formatDate(startDate)} and add tasks.
                        </Error>
                    )}
                    <h4>
                        The idea from Create Project Form applies here as well:
                        without entering a password, the state will be updated only on
                        the client-side, but lost upon page refresh.
                    </h4>
                    {loadingData && (
                        <div className={style.LoadingSpinnerContainer}>
                            <LoadingSpinner size={80} />
                        </div>
                    )}
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className={style.ProjectDateWrapper}>
                            <div>
                                <h3 style={{ marginBottom: "10px" }}>
                                    For which day?
                                </h3>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                        setProjectExistsError(false);
                                    }}
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
                                    {noProjectSelectedError && (
                                        <Error>You have to select a project</Error>
                                    )}
                                    {projects && projects.length !== 0 ? (
                                        <ul>
                                            {projects.map((project) => (
                                                <li key={project.ID}>
                                                    <input
                                                        type="radio"
                                                        name={project.title}
                                                        id={project.title}
                                                        onClick={(e) => {
                                                            selectProject(e);
                                                            setNoProjectSelectedError(
                                                                false
                                                            );
                                                            setProjectExistsError(
                                                                false
                                                            );
                                                        }}
                                                        checked={
                                                            selectedProject ===
                                                            project.title
                                                        }
                                                        className={
                                                            style.SelectProject
                                                        }
                                                    />
                                                    <label htmlFor={project.title}>
                                                        {project.title}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div
                                            style={{
                                                textAlign: "center",
                                                marginTop: "50px",
                                            }}
                                        >
                                            <LoadingSpinner size={50} />
                                        </div>
                                    )}
                                </span>
                                <span>
                                    <label htmlFor="password">
                                        Password
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                        />
                                        {invalidPasswordError && (
                                            <Error>Invalid password</Error>
                                        )}
                                    </label>
                                    <div className={style.CreateButton}>
                                        <input type="submit" value="create" />
                                    </div>
                                </span>
                            </div>
                        </div>
                    </form>
                </Fragment>
            )}
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
 * helper functions
 *
 */
function formatDate(input) {
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const date = new Date(input).toISOString();
    const newDate = date.split("T")[0];
    const arr = newDate.split("-");
    const dateString = `${month[new Date(date).getMonth()]} ${arr[2]}, ${arr[0]}`;
    return dateString;
}
