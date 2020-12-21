// Styles
import style from "./Welcome.module.scss";

// React
import React from "react";
import { Link } from "react-scroll";

// React Custom Hook
import { useViewport } from "../../CustomHooks/ViewportProvider";

// Components
import Card from "./Card/Card";
import Line from "../../UI/Line";
import Arrow from "../../UI/Arrow";

const Welcome = () => {
    const { width } = useViewport();
    const breakpoint = 699;

    let styleCardsContainer = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
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

    return (
        <div className={style.WelcomeWrapper} id="intro">
            <div className={style.Welcome}>
                {/* this should eventually be a separate component that renders either the Date or the Greeting, so it receives props*/}
                <h6 className={style.Greeting}>Hi there dear Visitor,</h6>

                <div
                    style={{
                        width: "70%",
                        height: "100%",
                        // backgroundColor: "yellowgreen",
                    }}
                >
                    <div className={style.Heading}>
                        <h1>I am Ioana</h1>
                        <h1>and this is my portfolio</h1>
                    </div>
                    <div className={style.Line}>
                        <Line />
                    </div>

                    <div style={styleCardsContainer}>
                        <Card title={"projects"}>
                            The buttons below are linked to the projects I am
                            currently developing.
                        </Card>
                        <Card title={"timeline"}>
                            The links on the right will take you to the entries
                            of my web development "journal", to give you an
                            overview of what I'm working on every day and how
                            each project is unfolding.\n It's worth mentioning
                            that, while the initial intention for this project
                            was to build a sort of a productivity tool, where I
                            could keep track of my daily tasks and give a
                            potential employer a feel for my skills, it is now
                            developing into a blog-like project, where I am also
                            adding links to other resources and basically
                            documenting what I am working on, reading, learning
                            and researching.
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
                    <Arrow size={40} fontSize={22} />
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
