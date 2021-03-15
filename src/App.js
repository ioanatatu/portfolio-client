// Style
import style from "./App.scss";

// React and React Router
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

// React Context
import { ViewportProvider } from "./CustomHooks/ViewportProvider";

// Axios
import API_URL from "./util/secrets";
import axios from "axios";

// Components
import Menu from "./Menu/Menu";
import Main from "./Main/Main";
import PageNotFound from "./UI/PageNotFound";

// Packages
import AppConfig from "./App.config";
import ReactGA from "react-ga";

const App = () => {
    const [latestProject, setLatestProject] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [cookieModal, setCookieModal] = useState(false);

    useEffect(() => {
        if (!!document.cookie.split("=").indexOf("_ga")) {
            setCookieModal(true);

            ReactGA.initialize(AppConfig.GOOGLE.GA_MEASUREMENT_ID, { debug: true });
            ReactGA.ga("set", "anonymizeIp", true);
        }
    }, []);

    useEffect(() => {}, [cookieModal]);

    useEffect(() => {
        (async () => {
            // get all journal entry dates to map them on the timeline in <Menu/> component
            const data = await axios.get(`${API_URL}/journal-entries`);

            const timeline = data.data.map((day) => day.date);
            timeline.sort((a, b) => b - a);

            setLatestProject(timeline[0]);
            setTimeline(timeline);
        })();
    }, []);

    const liftDarkModeToApp = (arg) => {
        setDarkMode(arg);
    };

    // TODO: refactor and use redux or react context for this
    const liftSelectedJournalDateToApp = (arg) => {
        setLatestProject(arg);
    };

    return (
        <ViewportProvider>
            <div className={style.App}>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Menu
                            timeline={timeline}
                            darkMode={darkMode}
                            liftSelectedJournalDateToApp={
                                liftSelectedJournalDateToApp
                            }
                        />
                    )}
                />

                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Main
                                latestProject={latestProject}
                                liftDarkModeToApp={liftDarkModeToApp}
                                cookieModal={cookieModal}
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
