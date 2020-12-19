// React
import React, { useState } from "react";

// React Router
import { Switch, Route } from "react-router-dom";

// Components
import Welcome from "./Welcome/Welcome";
import Projects from "./Projects/Projects";
import Timeline from "./Timeline/Timeline";
import DarkModeToggler from "../UI/DarkModeToggler";

const Main = ({ projects, timeline }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    };

    return (
        <div
            className="Main"
            style={{
                width: "100vw",
                position: "relative",
                backgroundColor: `${darkMode ? "#031b4e" : "#f7f9f9"}`,
            }}
        >
            <div
                style={{
                    width: "50px",
                    height: "5px",
                    backgroundColor: "#031b4e",
                    position: "fixed",
                    marginTop: "3%",
                    zIndex: 999,
                }}
            ></div>

            <div
                style={{
                    position: "fixed",
                    marginTop: "3%",
                    right: "16.1%",
                    zIndex: 999,
                }}
            >
                <DarkModeToggler
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />
            </div>

            <Welcome />

            <Projects projects={projects} />

            <Timeline timeline={timeline} />
        </div>
    );
};

export default Main;
