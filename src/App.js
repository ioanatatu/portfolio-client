// Style
import style from "./App.scss";

// React and React Router
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

// React Context
import { ViewportProvider } from "./CustomHooks/ViewportProvider";

// Axios
import axios from "axios";

// Data
import journal from "./journal";
//don't need it anymore because we are taking the info from the backend

// Components
import Menu from "./Menu/Menu";
import Main from "./Main/Main";
import PageNotFound from "./UI/PageNotFound";

const App = () => {
    const [journalData, setJournalData] = useState({});

    useEffect(() => {
        // (async () => {
        //     const data = await axios.get(
        //         "https://0ryd02k588.execute-api.eu-west-1.amazonaws.com/dev/journal"
        //     );
        //     setJournalData(data.data);
        // })();
    }, []);

    return (
        <ViewportProvider>
            <div className={style.App}>
                <Route
                    exact
                    path="/"
                    render={() => <Menu timeline={journal.timeline} />}
                />

                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Main
                                // projects={journal.projects}
                                timeline={journalData && journalData.timeline}
                            />
                        )}
                    />
                    <Route render={() => <PageNotFound />} />
                </Switch>
            </div>
        </ViewportProvider>
    );
};

export default App;
