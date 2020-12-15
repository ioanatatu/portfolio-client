import React from "react";
import css from "./Projects.module.css";

const Projects = ({ projects }) => {
    console.log("projects", projects);
    return (
        <div className={css.Projects} id="projects">
            <a target="_blank" href="https://www.thenap.de" rel="noreferrer">
                <div className={css.Project}>nap</div>
            </a>
            <a
                target="_blank"
                href="https://github.com/iclogg/sinkplant"
                rel="noreferrer"
            >
                <div className={css.Project}>sinkplant</div>
            </a>
            <a
                target="_blank"
                href="https://ioanatatu.github.io/trasnochando/"
                rel="noreferrer"
            >
                <div className={css.Project}>trasnochando</div>
            </a>
            <a target="_blank" href="!#" rel="noreferrer">
                <div className={css.Project}>lifetracker</div>
            </a>
        </div>
    );
};

export default Projects;
