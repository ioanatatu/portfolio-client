// temporary, for testing purposes
import journal from "../../journal";

// React
import React, { Fragment } from "react";
// import { Switch, Route } from "react-router-dom";

// Components
import JournalEntry from "./JournalEntry/JournalEntry";

const JournalEntries = ({ projects }) => {
    console.log("JOURNAL", journal);
    return (
        <Fragment>
            {journal && journal.timeline && (
                <div className="JournalEntries" id="timeline">
                    <JournalEntry day={journal.timeline[3]} projects={projects} />
                </div>
            )}
        </Fragment>
    );
};

export default JournalEntries;