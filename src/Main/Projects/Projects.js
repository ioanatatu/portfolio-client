// Style
import style from "./Projects.module.scss";
import "./horScroll.css";

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
    const [selectedProject, setSelectedProject] = useState(0);

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
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    useEffect(() => {
        if (newProject) {
            setNoProjectsMessage(false);
            setProjects((prev) => [newProject, ...prev]);
        }
        console.log("___newProject ", newProject);
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
                                            className={
                                                !projects[selectedProject]
                                                    .horizontalLogo
                                                    ? style.LogoContainer
                                                    : style.LogoContainerHorizontal
                                            }
                                        >
                                            <img
                                                src={projects[selectedProject].logo}
                                                alt="logo"
                                            ></img>
                                        </div>
                                    )}
                                </div>
                                {projects && projects[selectedProject] && (
                                    <div className={style.Description}>
                                        {splitSentencesInArray(
                                            projects[selectedProject].description
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
const lg =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAADUCAYAAABqDdEIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU4RDFDNDVGNDlGRjExRUI4MkFDQkIzNzE5REQ0NTQzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU4RDFDNDYwNDlGRjExRUI4MkFDQkIzNzE5REQ0NTQzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NThEMUM0NUQ0OUZGMTFFQjgyQUNCQjM3MTlERDQ1NDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NThEMUM0NUU0OUZGMTFFQjgyQUNCQjM3MTlERDQ1NDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz467iZyAAA0J0lEQVR42uyd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";
