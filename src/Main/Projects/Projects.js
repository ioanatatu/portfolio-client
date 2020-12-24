// Style
import css from "./Projects.module.css";

// React
import React, { useEffect, useState } from "react";

// others
import { API_URL } from "../../util/secrets";

const Projects = () => {
    const [projects, setProjects] = useState({});

    useEffect(() => {
        fetch(`${API_URL}/projects`)
            .then((res) => res.json())
            .then((data) => {
                console.log("data from Projects", data);
            })
            .catch(console.log);
    }, []);

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
