// Style
import style from "./App.scss";

// React and React Router
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

// React Context
import { ViewportProvider } from "./CustomHooks/ViewportProvider";

// Axios
import axios from "axios";

// Components
import Menu from "./Menu/Menu";
import Main from "./Main/Main";
import PageNotFound from "./UI/PageNotFound";

const App = () => {
    const [journalData, setJournalData] = useState({});
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await axios.get(
                "https://0ryd02k588.execute-api.eu-west-1.amazonaws.com/dev/journal-entries"
            );
            console.log("FROM DB..... ", data.data);
            setJournalData(data.data);

            const timeline = data.data.map((day) => day.ID);
            setTimeline(timeline);
        })();
    }, []);

    return (
        <ViewportProvider>
            <div className={style.App}>
                <Route exact path="/" render={() => <Menu timeline={timeline} />} />

                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Main journalEntries={journalData} />}
                    />
                    <Route render={() => <PageNotFound />} />
                </Switch>
            </div>
        </ViewportProvider>
    );
};

export default App;
