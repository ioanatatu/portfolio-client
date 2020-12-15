import React from "react";
import style from "./App.scss";

// Data
import journal from "./journal";

// Components
import Menu from "./Menu/Menu";
import Main from "./Main/Main";

// React Context
import { ViewportProvider } from "./CustomHooks/ViewportProvider";

const App = () => {
    return (
        <ViewportProvider>
            <div className={style.App}>
                <Main projects={journal.projects} timeline={journal.timeline} />
                <Menu timeline={journal.timeline} />
            </div>
        </ViewportProvider>
    );
};

export default App;

/* <div className="Spin-outer">
                <div className="dot"></div>
            </div>
            <div className="Spin-inner">
                <div className="dot"></div>
            </div> */
