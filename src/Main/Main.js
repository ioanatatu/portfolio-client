import React from "react";
import css from "./Main.module.css";

// Components
import Welcome from "./Welcome/Welcome";
import Projects from "../Projects/Projects";

const Main = () => {
    //#ed6d67
    //rgb(94, 157, 191)
    return (
        <div className={css.Main}>
            <Welcome />
            <Projects />
            <Projects bcg={"beige"} />
        </div>
    );
};

export default Main;
