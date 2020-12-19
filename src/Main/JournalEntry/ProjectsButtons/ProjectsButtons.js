// Style
import style from "./ProjectButton.module.scss";

// React
import React, { useState } from "react";

const ProjectButtons = (props) => {
    const [activeButton, setActiveButton] = useState(0);

    console.log("activeButton", activeButton);

    return (
        <div style={{ borderBottom: "2px solid silver" }}>
            {props.projects.map((project, index) => (
                <button
                    className={`${style.ProjectButton} + " " + ${
                        activeButton === index ? style.Active : null
                    }`}
                    style={{
                        outline: "none",
                        background: "none",
                    }}
                    onClick={() => {
                        props.click(index);
                        console.log("index", index);
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
