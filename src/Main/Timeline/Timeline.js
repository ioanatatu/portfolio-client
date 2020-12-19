// React
import React, { Fragment } from "react";
// import { Switch, Route } from "react-router-dom";

// Components
import JournalEntry from "../JournalEntry/JournalEntry";

const Timeline = ({ timeline }) => {
    return (
        <Fragment>
            {timeline && (
                <div className="JournalEntries" id="timeline">
                    <JournalEntry day={timeline[0]} />
                </div>
            )}
        </Fragment>
    );
};

export default Timeline;
