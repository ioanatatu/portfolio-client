// Style
import style from "./ProjectEntry.module.scss";

//React
import React from "react";

// Packages
import ReactTooltip from "react-tooltip";

// Components
import Tasks from "../Tasks/Tasks";
import Stats from "../Stats/Stats";
import ProjectGallery from "../Stats/ProjectGallery";
import ProjectRandomIdeas from "../Stats/ProjectRandomIdeas";
import Line from "../../../../UI/Line";
import { BiAddToQueue } from "react-icons/bi";

const ProjectEntry = ({ project, date }) => {
    return (
        <div className={style.ProjectEntry}>
            <div className={style.ColMain}>
                <div>
                    <span style={{ display: "flex" }}>
                        <h1>Tasks</h1>
                        <button
                            className={style.NewTaskButton}
                            data-tip="this button is work in progress"
                        >
                            <BiAddToQueue size={"20px"} />
                        </button>
                        <ReactTooltip effect="solid" />
                    </span>
                    <ul className={style.Categories}>
                        <li>Nr.</li>
                        <li>Description</li>
                        <li style={{ textAlign: "left" }}>Duration</li>
                        <li style={{ textAlign: "left", paddingRight: "10px" }}>
                            Image
                        </li>
                    </ul>
                </div>

                <div className={style.TasksContainer}>
                    <Tasks project={project} date={date} />
                </div>

                <Line height={"1.6px"} color={"silver"} />
            </div>

            <div className={style.ColSecondary}>
                <h1>Stats</h1>
                <div
                    style={{
                        height: "calc(100% - 40px)",
                        display: "grid",
                        gridTemplateRows: "35% 23% 36%",
                        gap: "3%",
                    }}
                    data-tip="coming soon"
                    data-for="stats"
                >
                    <Stats tasks={project && project.tasks && project.tasks.done} />
                    <ProjectGallery />
                    <ProjectRandomIdeas
                        ideas={
                            project &&
                            project.tasks &&
                            project.tasks.projectRandomIdeas
                        }
                    />
                    <ReactTooltip id="stats" />
                </div>
            </div>
        </div>
    );
};

export default ProjectEntry;
