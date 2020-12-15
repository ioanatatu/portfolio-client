import React from "react";

const ProjectButtons = (props) => {
    return (
        <div>
            {props.projects.map((project, index) => (
                <button
                    style={{
                        outline: "none",
                        padding: 0,
                        margin: 0,
                        background: "none",
                        border: "none",
                    }}
                    onClick={() => props.click(index)}
                >
                    {project.name}
                </button>
            ))}
        </div>
    );
};

export default ProjectButtons;
