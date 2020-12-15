import React from "react";
import WorkingTime from "./WorkingTime";

const Stats = ({ tasks }) => {
    console.log("day", tasks);
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
                <WorkingTime workingTime={calculateWorkingTime(tasks)} />
            </div>
            <div>tech labels</div>
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
