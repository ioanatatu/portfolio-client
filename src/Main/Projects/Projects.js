// Style
import style from "./Projects.module.scss";

// React
import React, { Fragment, useEffect, useState } from "react";

// Packages
// import ScrollMenu from "react-horizontal-scrolling-menu";
import { v4 as uuid } from "uuid";

// React Custom Hook
import { useViewport } from "../../CustomHooks/ViewportProvider";

// Components
import Arrow from "../../UI/Arrow";
import Line from "../../UI/Line";
import LoadingSpinner from "../../UI/LoadingSpinner";

// Font Icons
import {
    IoLogoJavascript,
    IoLogoReact,
    IoLogoSass,
    IoLogoCss3,
} from "react-icons/io5";
import { IoLogoNodejs } from "react-icons/io";
import {
    SiPostgresql,
    SiJquery,
    SiRedux,
    SiGraphql,
    SiMongodb,
    SiFirebase,
    SiServerless,
    SiAmazonaws,
    SiSocketDotIo,
    SiTypescript,
    SiGithub,
} from "react-icons/si";
import { VscJson } from "react-icons/vsc";
import { MdExplicit } from "react-icons/md";

// others
import API_URL from "../../util/secrets";
import axios from "axios";

const Projects = ({ newProject, toggleProjectFormIsVisible }) => {
    console.log("___newProject ", newProject);

    const [projects, setProjects] = useState([]);
    const [noProjectsMessage, setNoProjectsMessage] = useState(false);
    const { width } = useViewport();
    const breakpoint = 699;

    let styleCardsContainer = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1.7fr 1fr",
        gap: "110px",
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
                const res = await axios.get(`${API_URL}/projects`);
                const fetchedProjects = res.data;
                console.log("res from fetch data ", fetchedProjects);
                console.log("res from fetch data ", Array.isArray(fetchedProjects));

                !fetchedProjects.length
                    ? setNoProjectsMessage(true)
                    : setProjects([...fetchedProjects]);
            } catch (err) {
                console.log(err);
            }
        })();

        if (newProject) {
            setNoProjectsMessage(false);
            setProjects((prev) => [...prev, newProject]);
        }
        console.log("___newProject ", newProject);
    }, [newProject]);

    return (
        <div className={style.ProjectsWrapper} id="projects">
            <div className={style.Projects}>
                <h6 className={style.Greeting}>
                    {noProjectsMessage
                        ? "Looks like there are no projects at the moment..."
                        : "These are the projects I'm currently developing"}
                </h6>
                {noProjectsMessage ? (
                    <div className={style.NoProjectsMessage}>...</div>
                ) : (
                    <div
                        style={{
                            width: "74%",
                            height: "100%",
                        }}
                    >
                        <div className={style.Heading}>
                            <div className={style.ChevIcon}>
                                <Arrow size={30} fontSize={20} />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    // overflowX: "scroll",
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
                                            <div className={style.Project}>
                                                sinkplant
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
                        <div
                            style={styleCardsContainer}
                            className={style.ProjectDetails}
                        >
                            <div>
                                <h4 style={{ height: "80px" }}>
                                    <div className={style.LogoContainer}>
                                        {projects && projects[0] && (
                                            <img
                                                src={projects[0].logo}
                                                alt="logo"
                                            ></img>
                                        )}
                                    </div>
                                </h4>
                                {projects && projects[0] && (
                                    <div className={style.Description}>
                                        {splitSentencesInArray(
                                            projects[0].description
                                        ).map((sentence) => (
                                            <p
                                                key={uuid()}
                                                style={{ marginBottom: "18px" }}
                                            >
                                                {sentence}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p style={{ height: "80px" }}></p>
                                <div className={style.LastUpdated}>
                                    <span>last updated</span>
                                    <span>December 17, 2020</span>
                                </div>
                                <Line color={"black"} height={"1.1px"} />
                                <h6>Built with:</h6>
                                {projects && projects[0] ? (
                                    <div className={style.IconsWrapper}>
                                        {projects[0].techStack.map((tech, i) => (
                                            <span key={uuid()}>
                                                {techStackFonticons[tech]}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            textAlign: "center",
                                            minHeight: "270px",
                                        }}
                                    >
                                        <LoadingSpinner size={50} />
                                    </div>
                                )}
                                <div className={style.ProjectButtons}>
                                    <button className={style.StandardButton}>
                                        <span>
                                            got to GitHub
                                            <SiGithub />
                                        </span>
                                    </button>
                                    <button className={style.StandardButton}>
                                        go to webpage
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
/*
 *
 *
 *
 *
 *
 *
 * helper functions & data
 *
 */
function splitSentencesInArray(text) {
    const sentences = text.split(".");
    sentences[0] = sentences[0] + ".";
    return sentences;
}

const techStackFonticons = {
    "vanilla JS": <IoLogoJavascript />,
    typescript: <SiTypescript />,
    react: <IoLogoReact />,
    redux: <SiRedux />,
    jQuery: <SiJquery />,
    css: <IoLogoCss3 />,
    sass: <IoLogoSass />,
    nodeJS: <IoLogoNodejs />,
    express: <MdExplicit />,
    mongoDB: <SiMongodb />,
    postgreSQL: <SiPostgresql />,
    DynamoDB: <SiAmazonaws />,
    "AWS S3": <SiAmazonaws />,
    "AWS SES": <SiAmazonaws />,
    serverless: <SiServerless />,
    socketio: <SiSocketDotIo />,
    GraphQL: <SiGraphql />,
    chartJS: "chartJS",
    "JSON schema": <VscJson />,
    firebase: <SiFirebase />,
};
