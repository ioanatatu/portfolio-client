// React
import React, { useState } from "react";

// Components
import Welcome from "./Welcome/Welcome";
import Projects from "./Projects/Projects";
import Timeline from "./Timeline/Timeline";
import DarkModeToggler from "../UI/DarkModeToggler";
import CreateProjectForm from "./CreateProjectForm/CreateProjectForm";

const Main = ({ timeline }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [projectFormIsVisible, setProjectFormIsVisible] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    };
    const passProjectToState = (arg) => {
        console.log("ARG from Main", arg);
    };
    const toggleProjectFormIsVisible = () => {
        setProjectFormIsVisible((prev) => !prev);
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
                    position: "fixed",
                    top: "5%",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    zIndex: "999",
                }}
            >
                {projectFormIsVisible && (
                    <CreateProjectForm
                        passProjectToState={(arg) => passProjectToState(arg)}
                        toggleProjectFormIsVisible={toggleProjectFormIsVisible}
                    />
                )}
            </div>
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

            <Welcome toggleProjectFormIsVisible={toggleProjectFormIsVisible} />

            <Projects />

            <Timeline timeline={timeline} />
        </div>
    );
};

export default Main;
