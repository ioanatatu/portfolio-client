import React from "react";

const Task = ({ task, index }) => {
    return (
        <div>
            <ul
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <li>{index + 1}</li>
                <li>{task.description}</li>
                <li>{task.duration}</li>
                <li style={{ width: "50px" }}>
                    <img
                        src={`../images/journal/2020-12-11/portfolio/${task.image}`}
                        alt="project"
                        style={{ width: "100%" }}
                    ></img>
                </li>
                <li>{task.tags}</li>
                <li>{task.status}</li>
            </ul>
        </div>
    );
};

export default Task;
