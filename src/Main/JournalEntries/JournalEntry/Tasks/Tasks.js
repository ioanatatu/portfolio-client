// Style
import style from "./Tasks.module.scss";

// React
import React from "react";

// Packages
import { v4 as uuid } from "uuid";

// Components
import Task from "./Task";

const Tasks = ({ project }) => {
    return (
        <div className={style.Tasks}>
            {project &&
                project.tasks &&
                project.tasks.done.map((task, index) => (
                    <Task task={task} index={index} key={uuid()} />
                ))}
        </div>
    );
};

export default Tasks;
