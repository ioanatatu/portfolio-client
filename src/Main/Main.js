// Style
import style from "./Main.module.scss";

// React and React Router
import React, { useState, useEffect } from "react";

// Components
import Welcome from "./Welcome/Welcome";
import Projects from "./Projects/Projects";
import JournalEntries from "./JournalEntries/JournalEntries";
import CreateProjectForm from "./FORMS/CreateProjectForm/CreateProjectForm";
import DarkModeToggler from "../UI/DarkModeToggler";
import Line from "../UI/Line";

const Main = ({ liftDarkModeToApp, latestProject, cookieModal }) => {
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

    useEffect(() => {
        // check if there is a darkMode variable in local storage when component mounts
        localStorage.getItem("darkMode") === null
            ? setDarkMode(false)
            : localStorage.getItem("darkMode") === "true"
            ? setDarkMode(true)
            : setDarkMode(false);
    }, []);

    useEffect(() => {
        // after darkMode state has been changed by toggling, set it in local storage
        if (darkMode !== null)
            localStorage.setItem("darkMode", JSON.stringify(darkMode));

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

            <div className={style.LineContainer}>
                <Line
                    color={darkMode ? "#dae0e8" : "#031b4e"}
                    height={"5px"}
                    width={"50px"}
                />
            </div>

            <div className={style.DarkModeButtonWrapper}>
                <DarkModeToggler
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />
            </div>

            <Welcome
                toggleProjectFormIsVisible={toggleProjectFormIsVisible}
                darkMode={darkMode}
                cookieModal={cookieModal}
            />

            <Projects
                newProject={newProject}
                toggleProjectFormIsVisible={toggleProjectFormIsVisible}
                liftProjectsStateToMain={liftProjectsStateToMain}
                darkMode={darkMode}
            />

            <JournalEntries
                projects={projects}
                darkMode={darkMode}
                latestProject={latestProject}
            />
        </div>
    );
};

export default Main;
