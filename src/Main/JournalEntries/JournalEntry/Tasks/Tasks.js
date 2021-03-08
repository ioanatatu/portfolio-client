// Style
import style from "./Tasks.module.scss";

// React
import React from "react";

// Packages
import { v4 as uuid } from "uuid";

// Components
import Task from "./Task";

const Tasks = ({ project, date, imageName }) => {
    if (project) {
        console.log("\n\n___P", project);
    }

    return (
        <div className={style.Tasks}>
            {project &&
                project.tasks &&
                project.tasks.done.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        key={uuid()}
                        date={date}
                        imageName={imageName}
                    />
                ))}
        </div>
    );
};

export default Tasks;
