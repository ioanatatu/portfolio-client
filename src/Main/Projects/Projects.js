// Style
import style from "./Projects.module.scss";

// React
import React, { useEffect, useState } from "react";

// React Custom Hook
import { useViewport } from "../../CustomHooks/ViewportProvider";

// Components
import Arrow from "../../UI/Arrow";

// others
import API_URL from "../../util/secrets";
import axios from "axios";

const Projects = () => {
    // const [projects, setProjects] = useState([]);
    const { width } = useViewport();
    const breakpoint = 699;

    let styleCardsContainer = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "55px",
        marginTop: "60px",
    };
    if (width < breakpoint) {
        styleCardsContainer = {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginTop: "60px",
        };
    }

    useEffect(() => {
        (async () => {
            try {
                let res = await axios.get(`${API_URL}/projects`);
                console.log("res from fetch data ", res.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <div className={style.ProjectsWrapper} id="projects">
            <div className={style.Projects}>
                <h6 className={style.Greeting}>
                    These are the projects I'm currently developing
                </h6>
                <div
                    style={{
                        width: "74%",
                        height: "100%",
                    }}
                >
                    <div className={style.Heading}>
                        <div style={{ position: "absolute" }}>
                            <Arrow />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                                overflowX: "scroll",
                            }}
                        >
                            <span
                                style={{
                                    display: "flex",
                                }}
                            >
                                <div className={style.ProjectCircle}>
                                    <a
                                        target="_blank"
                                        href="https://www.thenap.de"
                                        rel="noreferrer"
                                    >
                                        <div className={style.Project}>nap</div>
                                    </a>
                                </div>
                                <div className={style.ProjectCircle}>
                                    <a
                                        target="_blank"
                                        href="https://github.com/iclogg/sinkplant"
                                        rel="noreferrer"
                                    >
                                        <div className={style.Project}>sinkplant</div>
                                    </a>
                                </div>
                                <div className={style.ProjectCircle}>
                                    <a
                                        target="_blank"
                                        href="https://ioanatatu.github.io/trasnochando/"
                                        rel="noreferrer"
                                    >
                                        <div className={style.Project}>
                                            trasnochando
                                        </div>
                                    </a>
                                </div>
                                <div className={style.ProjectCircle}>
                                    <a
                                        target="_blank"
                                        href="https://ioanatatu.github.io/trasnochando/"
                                        rel="noreferrer"
                                    >
                                        <div className={style.Project}>
                                            trasnochando
                                        </div>
                                    </a>
                                </div>
                                <div className={style.ProjectCircle}>
                                    <a target="_blank" href="!#" rel="noreferrer">
                                        <div className={style.Project}>
                                            lifetracker
                                        </div>
                                    </a>
                                </div>
                            </span>
                        </div>
                        <div style={{ position: "absolute" }}>
                            <Arrow />
                        </div>
                    </div>
                    <div style={styleCardsContainer}>
                        <div>
                            <h4>
                                <img src="" alt=""></img>
                            </h4>
                            <p>project description</p>
                        </div>
                        <div>
                            <div>last uploaded</div>
                            <div>built with</div>
                            <div>
                                <button>got to GitHub</button>
                                <button>go to webpage</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
