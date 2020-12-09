import React from "react";
import css from "./App.module.css";

// Components
import Timeline from "./Timeline/Timeline";
import Main from "./Main/Main";

const App = () => {
    return (
        <div className={css.App}>
            <div className={css.Logo}>it.</div>

            <Main />
            <Timeline />
        </div>
    );
};

export default App;

/* <div className="Spin-outer">
                <div className="dot"></div>
            </div>
            <div className="Spin-inner">
                <div className="dot"></div>
            </div> */
