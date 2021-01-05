// React
import React, { Fragment, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

// Components
import JournalEntry from "./JournalEntry/JournalEntry";

// Axios
import API_URL from "../../util/secrets";
import axios from "axios";

const JournalEntries = ({ projects, latestProject }) => {
    const [journalEntry, setJournalEntry] = useState();

    useEffect(() => {
        (async () => {
            const data = await axios.get(`${API_URL}/journal-entry/${latestProject}`);

            setJournalEntry(data.data[0]);
        })();
    }, [latestProject]);

    return (
        <Fragment>
            {journalEntry && (
                <div className="JournalEntries" id="journal">
                    <JournalEntry journalEntry={journalEntry} projects={projects} />
                </div>
            )}
        </Fragment>
    );
};

export default JournalEntries;
