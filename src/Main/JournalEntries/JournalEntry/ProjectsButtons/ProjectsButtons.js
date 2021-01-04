// Style
import style from "./ProjectButton.module.scss";

// React
import React, { useState } from "react";

// Packages
import { v4 as uuid } from "uuid";

const ProjectButtons = (props) => {
    const [activeButton, setActiveButton] = useState(0);

    return (
        <div style={{ borderBottom: "2px solid silver" }}>
            {props.projects.map((project, index) => (
                <button
                    key={uuid()}
                    className={`${style.ProjectButton} + " " + ${
                        activeButton === index ? style.Active : null
                    }`}
                    style={{
                        outline: "none",
                        background: "none",
                    }}
                    onClick={() => {
                        props.click(index);
                        setActiveButton(index);
                    }}
                >
                    {project.name}
                </button>
            ))}
        </div>
    );
};

export default ProjectButtons;
