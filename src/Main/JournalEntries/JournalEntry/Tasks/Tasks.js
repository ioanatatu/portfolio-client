// Style
import style from "./Tasks.module.scss";

// React
import React from "react";

// Components
import Task from "./Task";

const Tasks = (props) => {
    return (
        <div className={style.Tasks}>
            {props.project.tasks.done.map((task, index) => (
                <Task task={task} index={index} key={index.toString()} />
            ))}
        </div>
    );
};

export default Tasks;
