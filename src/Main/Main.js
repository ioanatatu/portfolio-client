// React
import React, { useState } from "react";

// Components
import Welcome from "./Welcome/Welcome";
import Projects from "./Projects/Projects";
import JournalEntry from "./JournalEntry/JournalEntry";
import Form from "./Form/Form";
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

            <div className="JournalEntries">
                {timeline.map((day) => (
                    <JournalEntry day={day} />
                ))}
            </div>

            <Form />
        </div>
    );
};

export default Main;
