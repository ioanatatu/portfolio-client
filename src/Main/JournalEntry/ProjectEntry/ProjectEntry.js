// Style
import style from "./ProjectEntry.module.scss";

//React
import React from "react";

// Components
import Tasks from "../Tasks/Tasks";
import Stats from "../Stats/Stats";
import ProjectGallery from "../Stats/ProjectGallery";
import ProjectRandomIdeas from "../Stats/ProjectRandomIdeas";
import Line from "../../../UI/Line";
import { BiAddToQueue } from "react-icons/bi";

const ProjectEntry = ({ project }) => {
    return (
        <div className={style.ProjectEntry}>
            <div className={style.ColMain}>
                <div>
                    <span style={{ display: "flex" }}>
                        <h1>Tasks</h1>
                        <button
                            style={{
                                marginLeft: "20px",
                                outline: "none",
                                background: "none",
                                border: "none",
                                marginTop: "-10px",
                                cursor: "pointer",
                            }}
                        >
                            <BiAddToQueue color={"grey"} size={"20px"} />
                        </button>
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
                    <Tasks project={project} />
                </div>

                <Line />
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
                >
                    <Stats tasks={project.tasks.done} />
                    <ProjectGallery />
                    <ProjectRandomIdeas
                        ideas={project.tasks.projectRandomIdeas}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectEntry;
