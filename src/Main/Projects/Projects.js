// Style
import style from "./Projects.module.scss";

// React
import React, { Fragment, useEffect, useState } from "react";

// Packages
import { v4 as uuid } from "uuid";
import { ExternalLink } from "react-external-link";

// React Custom Hook
import { useViewport } from "../../CustomHooks/ViewportProvider";

// Components
import Arrow from "../../UI/Arrow";
import Line from "../../UI/Line";
import LoadingSpinner from "../../UI/LoadingSpinner";
import PasswordModalForm from "../FORMS/PasswordModalForm/PasswordModalForm";

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
import { FaRegEdit } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";

// others
import API_URL from "../../util/secrets";
import axios from "axios";

const Projects = ({
    newProject,
    toggleProjectFormIsVisible,
    liftProjectsStateToMain,
    darkMode,
}) => {
    const [projects, setProjects] = useState([]);
    const [noProjectsMessage, setNoProjectsMessage] = useState(false);
    const [selectedProject, setSelectedProject] = useState(0);
    const [passwordModalIsVisible, setPasswordModalIsVisible] = useState(false);

    // custom hook
    const { width } = useViewport();
    const breakpoint = 699;

    let styleCardsContainer = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1.65fr 1fr",
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

                !fetchedProjects.length
                    ? setNoProjectsMessage(true)
                    : setProjects([...fetchedProjects]);
                liftProjectsStateToMain(fetchedProjects);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    useEffect(() => {
        if (newProject) {
            setNoProjectsMessage(false);
            liftProjectsStateToMain([newProject, ...projects]);
            setProjects((prev) => [newProject, ...prev]);
        }
    }, [newProject]);

    useEffect(() => {
        ///////////////////////////// TO FIND A SOLUTION ///////////////////////////
        //////////// how to do this before image is being loaded ?!?!?!  ///////////
        if (projects) {
            projects.forEach((project) => {
                const img = new Image();
                img.onload = function () {
                    project.horizontalLogo = this.width > 400;
                    console.log(this.width > 400);
                };
                img.src = `${project.logo}`;
            });
        }
    }, [projects]);

    const handleClickedProject = (index) => {
        setSelectedProject(index);
        console.log("index ", index);
    };
    const togglePasswordModal = () => {
        setPasswordModalIsVisible((prev) => !prev);
    };

    return (
        <div
            className={`${style.ProjectsWrapper} ${darkMode ? style.DarkMode : ""}`}
            id="projects"
        >
            <div className={style.Projects}>
                <h6 className={style.Greeting}>
                    {noProjectsMessage
                        ? "Looks like there are no projects at the moment..."
                        : "These are the projects I'm currently developing:"}
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
                            <div className={style.ChevIcon} id={style.Left}>
                                <Arrow size={30} fontSize={12} />
                            </div>

                            <div
                                className={style.CirclesWrapper}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    // overflowX: "scroll",
                                }}
                            >
                                {projects &&
                                    projects.map((project, index) => {
                                        return (
                                            <div
                                                className={style.ProjectCircle}
                                                key={project.title}
                                                onClick={() => {
                                                    handleClickedProject(index);
                                                }}
                                            >
                                                <img
                                                    src={project.logo}
                                                    alt="logo"
                                                ></img>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className={style.ChevIcon} id={style.Right}>
                                <Arrow size={30} fontSize={12} />
                            </div>
                        </div>

                        <div
                            style={styleCardsContainer}
                            className={style.ProjectDetails}
                        >
                            <div>
                                <div className={style.ProjectTitle}>
                                    {projects && projects[selectedProject] && (
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "flex-end",
                                            }}
                                        >
                                            <div
                                                className={
                                                    !projects[selectedProject]
                                                        .horizontalLogo
                                                        ? style.LogoContainer
                                                        : style.LogoContainerHorizontal
                                                }
                                            >
                                                <img
                                                    src={
                                                        projects[selectedProject].logo
                                                    }
                                                    alt="logo"
                                                ></img>
                                            </div>
                                            <div className={style.EditDeleteProject}>
                                                {passwordModalIsVisible && (
                                                    <div
                                                        className={
                                                            style.PasswordModalContainer
                                                        }
                                                    >
                                                        <PasswordModalForm
                                                        // selectedProjectId={
                                                        //     projects[
                                                        //         selectedProject
                                                        //     ].ID
                                                        // }
                                                        // togglePasswordModal={
                                                        //     togglePasswordModal
                                                        // }
                                                        />
                                                    </div>
                                                )}
                                                {/*<FaRegEdit />*/}
                                                <span onClick={togglePasswordModal}>
                                                    <BiTrashAlt />
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {projects && projects[selectedProject] && (
                                    <div className={style.Description}>
                                        {projects[selectedProject].description
                                            .length === "" ? (
                                            <div></div>
                                        ) : (
                                            <Fragment>
                                                {splitSentencesInArray(
                                                    projects[selectedProject]
                                                        .description
                                                ).map((sentence) => (
                                                    <p
                                                        key={uuid()}
                                                        style={{
                                                            marginBottom: "18px",
                                                        }}
                                                    >
                                                        {sentence}
                                                    </p>
                                                ))}
                                            </Fragment>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <p style={{ height: "120px" }}></p>
                                <div className={style.LastUpdated}>
                                    <span>last updated</span>
                                    <span>December 17, 2020</span>
                                </div>
                                <Line color={"black"} height={"1.1px"} />
                                <h6>Built with:</h6>
                                {projects && projects[selectedProject] ? (
                                    <div className={style.IconsWrapper}>
                                        {projects[selectedProject].techStack.map(
                                            (tech, i) => (
                                                <span key={uuid()}>
                                                    {techStackFonticons[tech]}
                                                </span>
                                            )
                                        )}
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
                                {projects &&
                                    projects[selectedProject] &&
                                    projects[selectedProject].githubLinks && (
                                        <div className={style.ProjectButtons}>
                                            <ExternalLink
                                                href={
                                                    projects[selectedProject]
                                                        .githubLinks[0]
                                                }
                                            >
                                                <button
                                                    className={style.StandardButton}
                                                >
                                                    <span>
                                                        got to GitHub
                                                        <SiGithub />
                                                    </span>
                                                </button>
                                            </ExternalLink>
                                            <ExternalLink
                                                href={
                                                    projects[selectedProject]
                                                        .externalLink
                                                }
                                            >
                                                <button
                                                    className={style.StandardButton}
                                                    disabled={
                                                        !!!projects[selectedProject]
                                                            .externalLink.length
                                                    }
                                                >
                                                    go to webpage
                                                </button>
                                            </ExternalLink>
                                        </div>
                                    )}
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
    sentences.forEach((s, i) => {
        if (s === "") {
            sentences.splice(i, 1);
        }
    });
    return sentences.map((sentence) => sentence.trim() + ".");
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
    DynamoDB: (
        <span style={{ display: "flex" }}>
            <SiAmazonaws />
            <span style={{ fontSize: "10px", fontWeight: "700" }}>DynamoDB</span>
        </span>
    ),
    "AWS S3": (
        <span style={{ display: "flex" }}>
            <SiAmazonaws />
            <span style={{ fontSize: "10px", fontWeight: "700" }}>S3</span>
        </span>
    ),
    "AWS SES": (
        <span style={{ display: "flex" }}>
            <SiAmazonaws />
            <span style={{ fontSize: "10px", fontWeight: "700" }}>SES</span>
        </span>
    ),
    serverless: <SiServerless />,
    socketio: <SiSocketDotIo />,
    GraphQL: <SiGraphql />,
    chartJS: "chartJS",
    "JSON schema": <VscJson />,
    firebase: <SiFirebase />,
};
let list = [
    {
        name: "thenap",
        link:
            "https://portfolio-images-bucket-hsjgh346.s3-eu-west-1.amazonaws.com/projects-logos/2020-12-30T113917.png",
    },
    { name: "sinkplant" },
    { name: "item3" },
    { name: "item4" },
    { name: "item5" },
    { name: "item6" },
    { name: "item7" },
];
