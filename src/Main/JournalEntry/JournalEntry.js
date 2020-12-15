// Style
import style from "./JournalEntry.module.scss";
import React, { useState } from "react";

// Components
import ProjectsButtons from "./ProjectsButtons/ProjectsButtons";
import ProjectEntry from "./ProjectEntry/ProjectEntry";

const JournalEntry = ({ day }) => {
    const [project, setProject] = useState(0);

    const handleSwitchProject = (arg) => {
        setProject(arg);
    };

    return (
        <div className={style.JournalEntryWrapper} id={day.date}>
            <div className={style.JournalEntry}>
                <div className={style.ProjectsNavbar}>
                    <ProjectsButtons
                        projects={day.projects}
                        click={handleSwitchProject}
                    />
                </div>

                <ProjectEntry project={day.projects[project]} />
            </div>
        </div>
    );
};

export default JournalEntry;
