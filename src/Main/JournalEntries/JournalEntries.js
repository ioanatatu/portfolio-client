// temporary, for testing purposes
import journal from "../../_journal";

// React
import React, { Fragment } from "react";
// import { Switch, Route } from "react-router-dom";

// Components
import JournalEntry from "./JournalEntry/JournalEntry";

const JournalEntries = ({ projects }) => {
    return (
        <Fragment>
            {journal && journal.timeline && (
                <div className="JournalEntries" id="journal">
                    <JournalEntry day={journal.timeline[1]} projects={projects} />
                </div>
            )}
        </Fragment>
    );
};

export default JournalEntries;
