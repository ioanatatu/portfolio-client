// Styles
import style from "./Welcome.module.scss";

// React
import React, { useState, useEffect } from "react";

// Packages
import { Link } from "react-scroll";
import ReactTooltip from "react-tooltip";

// React Custom Hook
import { useViewport } from "../../CustomHooks/ViewportProvider";

// Components
import Card from "./Card/Card";
import Line from "../../UI/Line";
import Arrow from "../../UI/Arrow";
import Player from "../../UI/Player/Player";

// Font Icons
import { FaFolderOpen } from "react-icons/fa";

const Welcome = ({ toggleProjectFormIsVisible, darkMode, cookieModal }) => {
    const [cookieModalIsVisible, setCookieModalIsVisible] = useState(cookieModal);

    useEffect(() => {
        if (cookieModal) {
            setTimeout(() => {
                setCookieModalIsVisible(true);
            }, 800);
            // disable scrolling when modal is open
            document.body.style.overflow = "hidden";
        }
    }, [cookieModal]);

    const { width } = useViewport();
    const breakpoint = 699;

    let styleCardsContainer = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr",
        gap: "55px",
    };

    if (width < breakpoint) {
        styleCardsContainer = {
            width: "100%",
            display: "flex",
            flexDirection: "column",
        };
    }

    return (
        <div
            className={`${style.WelcomeWrapper} ${darkMode ? style.DarkMode : ""}`}
            id="intro"
        >
            {cookieModalIsVisible && (
                <div className={style.CookieModalWrapper}>
                    <div className={style.CookieModal}>
                        <div>
                            This website uses{" "}
                            <span className={style.Underline}>cookies</span>
                        </div>
                        <div className={style.Text}>
                            But don't be alarmed! According to{" "}
                            <a
                                href="https://www.datadrivenu.com/gdpr-ip-addresses-google-analytics/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                this
                            </a>
                            , because I am not tracking your IP address, using Google
                            Analytics to monitor traffic on my web page is GDPR
                            compliant.
                        </div>
                        <button
                            onClick={() => {
                                setCookieModalIsVisible(false);
                            }}
                            className={style.AddProject}
                        >
                            Alright, got it!
                        </button>
                    </div>
                </div>
            )}

            <div className={style.Welcome}>
                {/* this should eventually be a separate component that renders either the Date or the Greeting, so it receives props*/}
                <h6 className={style.Greeting}>Hi there dear Visitor,</h6>
                <div
                    style={{
                        width: "74%",
                        height: "100%",
                    }}
                >
                    <div className={style.Heading} style={styleCardsContainer}>
                        <div className={style.WelcomeMessage}>
                            <h1>
                                i'm{" "}
                                <span
                                    className={style.MyName}
                                    data-tip
                                    data-for="pronounciation"
                                >
                                    ioana
                                </span>
                                <ReactTooltip
                                    id="pronounciation"
                                    effect="solid"
                                    delayHide={500}
                                    className={style.TooltipVisibleWhenHover}
                                    type="light"
                                    backgroundColor={"#bbdcfa"}
                                >
                                    <div className={style.TooltipContent}>
                                        <Player src={"../../../name.ogg"} />
                                        <p>Listen to how my name is pronounced</p>
                                    </div>
                                </ReactTooltip>
                            </h1>
                            <h1>
                                and this is my...
                                <br />
                                portfolio/
                                <br />
                                dev journal/
                                <br />
                                learning board
                            </h1>
                            <h4>work in progress...</h4>
                        </div>
                        <div className={style.ProfilePic}>
                            <img
                                src="../../../IoanaTatu_profilePic_small.jpg"
                                alt="profilePic"
                            />
                        </div>
                    </div>

                    <div className={style.Line}>
                        <Line height={"1px"} color={darkMode ? "#6c767c" : null} />
                    </div>

                    <div style={styleCardsContainer} className={style.CardsContainer}>
                        <span>
                            <Card title={"my projects"} darkMode={darkMode}>
                                <p>
                                    Check out the projects I am currently working on,
                                    by sliding to the next page. To add new projects,
                                    I am using a form which stores data in an aws
                                    DynamoDB table.
                                </p>
                                <p className={style.Instructions}>
                                    Go ahead and add a project (only to the frontend),
                                    by clicking the button below.
                                </p>
                            </Card>
                            <Link
                                to="projects"
                                spy={true}
                                smooth={true}
                                offset={2}
                                duration={500}
                            >
                                <button
                                    onClick={() => {
                                        setTimeout(() => {
                                            toggleProjectFormIsVisible();
                                        }, 500);
                                    }}
                                    className={style.AddProject}
                                >
                                    <span>
                                        <FaFolderOpen />
                                        add new project
                                    </span>
                                </button>
                            </Link>
                        </span>
                        <Card title={"dev journal"} darkMode={darkMode}>
                            <p>I developed this project with three things in mind:</p>
                            <p>
                                <span>#1</span> to learn - new tools, skills,
                                technologies, ways of doing things, you name it - and
                                to deepen the knowledge I already have;
                            </p>
                            <p>
                                <span>#2</span> to track - I'm a big fan of
                                "journaling" as both a way to keep track of one's
                                progress, and a way of storing ideas and resources
                                that could be reused later;
                            </p>
                            <p>
                                <span>#3</span> to give you - a potential employer -
                                an idea about my skills and work routine.
                            </p>
                        </Card>
                    </div>
                </div>
            </div>

            <div className={style.ChevIcon}>
                <Link
                    to="projects"
                    spy={true}
                    smooth={true}
                    offset={2}
                    duration={500}
                >
                    <Arrow
                        size={30}
                        fontSize={20}
                        color={darkMode ? "#bbc2c7" : "#031b4e"}
                    />
                </Link>
            </div>
        </div>
    );
};

export default Welcome;

/*<iframe
    title="myUniqueTitle"
    frameborder="0"
    width="400"
    height="200"
    src="https://drive.google.com/file/d/1NKEtpCsO-qQEmNiXkeK2nzoXGCRcdG_V/preview"
></iframe>*/
