// Style
import style from "./JournalEntry.module.scss";

// React
import React, { useState } from "react";

// Components
import ProjectsButtons from "./ProjectsButtons/ProjectsButtons";
import ProjectEntry from "./ProjectEntry/ProjectEntry";

const JournalEntry = ({ day }, props) => {
    const [project, setProject] = useState(0);

    // use this in the Date Component
    console.log("match", props.params);

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
