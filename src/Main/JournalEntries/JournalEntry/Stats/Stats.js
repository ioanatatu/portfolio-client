// React
import React from "react";

// Components
import WorkingTime from "./WorkingTime";
import TechLabel from "./TechLabel";

const Stats = ({ tasks }) => {
    // console.log("tags", tasks[0].tags.length);
    // console.log("duration", tasks[0].duration);

    let totalWorkTime = {};
    if (tasks) totalWorkTime = calculateWorkingTime(tasks);
    const allTags = [];

    ////////////////////////////////////////////// to refactor /////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    // tasks.forEach((task) => {
    //     const time = task.tags.length
    //         ? (task.duration / task.tags.length).toFixed(2)
    //         : 0;

    //     if (!allTags.length) {
    //         task.tags.forEach((tag) => {
    //             allTags.push({ name: tag, time: time });
    //         });
    //     } else {
    //         allTags.forEach((tag) => {
    //             task.tags.forEach((t) => {
    //                 tag.name.toLowerCase() === t.toLowerCase
    //                     ? (tag.duration += time)
    //                     : allTags.push({ name: t, time: time });
    //             });
    //         });
    //     }
    // });

    return (
        <div>
            <div
                style={{
                    marginBottom: "auto",
                    padding: "7px",
                    border: "1.5px solid grey",
                    borderRadius: "7px",
                    boxShadow: "2.5px 2.5px #1869ff",
                }}
            >
                <WorkingTime workingTime={totalWorkTime} />
            </div>
            <div
                style={{
                    marginTop: "10px",
                    display: "grid",
                    gridTemplateColumns: "47% 47%",
                    gap: "6%",
                }}
            >
                {/*allTags.map((tag, i) => (
                    <TechLabel key={(i + 9000).toString()} tech={tag} />
                ))*/}
            </div>
        </div>
    );
};
export default Stats;
/*
 *
 *
 *
 *
 *
 * helper functions
 */
function calculateWorkingTime(tasks) {
    let sum = 0;

    tasks.forEach((task) => {
        sum += task.duration;
    });

    const duration = (sum / 60).toFixed(2);
    const hrs = parseInt(sum / 60);
    const mins = sum % 60;

    return { duration, hrs, mins };
}
