// Style
import style from "./JournalEntry.module.scss";

// React
import React, { useState } from "react";

// Font Icons
import { AiOutlineFolderAdd } from "react-icons/ai";

// Components
import CreateJournalEntryForm from "../CreateJournalEntryForm/CreateJournalEntryForm";
import ProjectsButtons from "./ProjectsButtons/ProjectsButtons";
import ProjectEntry from "./ProjectEntry/ProjectEntry";

const JournalEntry = ({ day }, props) => {
    const [project, setProject] = useState(0);
    const [journalEntryFormIsVisible, setJournalEntryFormIsVisible] = useState(true);

    // use this in the Date Component
    console.log("match", props.params);

    const handleSwitchProject = (arg) => {
        setProject(arg);
    };

    const toggleJournalEntryFormIsVisible = () => {
        setJournalEntryFormIsVisible((prev) => !prev);
    };

    return (
        <div className={style.JournalEntryWrapper} id={day.date}>
            {journalEntryFormIsVisible && <CreateJournalEntryForm />}
            <div className={style.JournalEntry}>
                <h6 className={style.Greeting}>{formatDate(new Date(day.date))}</h6>
                <div className={style.ProjectsNavbar}>
                    <ProjectsButtons
                        projects={day.projects}
                        click={handleSwitchProject}
                    />
                    <span>
                        <button
                            className={style.StandardButton}
                            onClick={toggleJournalEntryFormIsVisible}
                        >
                            <span>
                                <AiOutlineFolderAdd />
                                new journal entry
                            </span>
                        </button>
                    </span>
                </div>

                <ProjectEntry project={day.projects[project]} />
            </div>
        </div>
    );
};

export default JournalEntry;
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
function formatDate() {
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
    const date = new Date().toISOString();
    const newDate = date.split("T")[0];
    const arr = newDate.split("-");
    const dateString = `${month[new Date(date).getMonth()]} ${arr[2]}, ${arr[0]}`;
    return dateString;
}
