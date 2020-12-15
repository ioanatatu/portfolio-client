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

const ProjectEntry = ({ project }) => {
    return (
        <div className={style.ProjectEntry}>
            <div className={style.ColMain}>
                <div>
                    <h1>Tasks</h1>
                    <ul className={style.Categories}>
                        <li>Nr.</li>
                        <li>Description</li>
                        <li style={{ textAlign: "center" }}>Duration</li>
                        <li style={{ textAlign: "center" }}>Image</li>
                    </ul>
                </div>

                <Tasks project={project} />

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
