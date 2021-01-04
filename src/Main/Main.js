// Style
import style from "./Main.module.scss";

// React
import React, { useState, useEffect } from "react";

// Components
import Welcome from "./Welcome/Welcome";
import Projects from "./Projects/Projects";
import JournalEntries from "./JournalEntries/JournalEntries";
import CreateProjectForm from "./FORMS/CreateProjectForm/CreateProjectForm";
import DarkModeToggler from "../UI/DarkModeToggler";
import Line from "../UI/Line";

const Main = ({ journalEntries, liftDarkModeToApp }) => {
    // state
    const [projectFormIsVisible, setProjectFormIsVisible] = useState(false);
    const [newProject, setNewProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [darkMode, setDarkMode] = useState(null);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };
    const passProjectToState = (arg) => {
        setNewProject(arg);
    };
    const toggleProjectFormIsVisible = () => {
        setProjectFormIsVisible((prev) => !prev);
    };
    const liftProjectsStateToMain = (projectsFromProjectsComponent) => {
        setProjects(projectsFromProjectsComponent);
    };

    // check if there is a darkMode variable in the local storage when component mounts
    useEffect(() => {
        localStorage.getItem("darkMode") === "false"
            ? setDarkMode(false)
            : setDarkMode(true);
    }, []);

    // after darkMode state has been changed by toggling, set it in the local storage
    useEffect(() => {
        if (darkMode !== null) {
            localStorage.setItem("darkMode", JSON.stringify(darkMode));
        }
        liftDarkModeToApp(darkMode);
    }, [darkMode, liftDarkModeToApp]);

    useEffect(() => {}, [newProject, projects]);

    return (
        <div className={`${style.MainWrapper} ${darkMode ? style.DarkMode : ""}`}>
            <div className={style.ProjectFormContainer}>
                {projectFormIsVisible && (
                    <CreateProjectForm
                        passProjectToState={(arg) => passProjectToState(arg)}
                        toggleProjectFormIsVisible={toggleProjectFormIsVisible}
                    />
                )}
            </div>
            <div
                style={{
                    position: "fixed",
                    marginTop: "3%",
                    zIndex: 999,
                }}
            >
                <Line
                    color={darkMode ? "#dae0e8" : "#031b4e"}
                    height={"5px"}
                    width={"50px"}
                />
            </div>

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

            <Welcome
                toggleProjectFormIsVisible={toggleProjectFormIsVisible}
                darkMode={darkMode}
            />

            <Projects
                newProject={newProject}
                toggleProjectFormIsVisible={toggleProjectFormIsVisible}
                liftProjectsStateToMain={liftProjectsStateToMain}
                darkMode={darkMode}
            />

            <JournalEntries projects={projects} darkMode={darkMode} />
        </div>
    );
};

export default Main;
