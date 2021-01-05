// Style
import style from "./JournalEntry.module.scss";

// React
import React, { useState, useEffect } from "react";

// Font Icons
import { AiOutlineFolderAdd } from "react-icons/ai";

// Components
import CreateJournalEntryForm from "../../FORMS/CreateJournalEntryForm/CreateJournalEntryForm";
import ProjectsButtons from "./ProjectsButtons/ProjectsButtons";
import ProjectEntry from "./ProjectEntry/ProjectEntry";

const JournalEntry = ({ projects, journalEntry }, props) => {
    // state
    const [project, setProject] = useState(0);
    const [journalEntryFormIsVisible, setJournalEntryFormIsVisible] = useState(false);
    const [journalEntryDate, setJournalEntryDate] = useState("");

    // use this in the Date Component
    // console.log("match", props.params);

    const handleSwitchProject = (arg) => {
        setProject(arg);
    };
    const toggleJournalEntryFormIsVisible = () => {
        setJournalEntryFormIsVisible((prev) => !prev);
    };
    const passNewJournalEntryToJournalEntryComponent = (newJournalEntry) => {
        // console.log("newJournalEntry ", newJournalEntry);
    };
    useEffect(() => {
        if (journalEntry) {
            setJournalEntryDate(formatDate(journalEntry.date));
        }
    }, [journalEntry]);

    return (
        <div className={style.JournalEntryWrapper}>
            <div
                style={{
                    position: "fixed",
                    top: "5%",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    zIndex: "999",
                }}
            >
                {journalEntryFormIsVisible && (
                    <CreateJournalEntryForm
                        toggleJournalEntryFormIsVisible={
                            toggleJournalEntryFormIsVisible
                        }
                        passNewJournalEntryToJournalEntryComponent={
                            passNewJournalEntryToJournalEntryComponent
                        }
                        projects={projects}
                    />
                )}
            </div>
            <div className={style.JournalEntry}>
                <h6 className={style.Greeting}>{journalEntryDate}</h6>
                <div className={style.ProjectsNavbar}>
                    <ProjectsButtons
                        projects={journalEntry.projects}
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

                {journalEntry && (
                    <ProjectEntry project={journalEntry.projects[project]} />
                )}
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
function formatDate(d) {
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
    const date = new Date(d).toISOString();
    const newDate = date.split("T")[0];
    const arr = newDate.split("-");
    const dateString = `${month[new Date(date).getMonth()]} ${arr[2]}, ${arr[0]}`;
    return dateString;
}
