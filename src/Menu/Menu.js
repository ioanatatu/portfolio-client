// Styles
import style from "./Menu.module.scss";

// React
import React from "react";
import { Link } from "react-scroll";

// Components
import TimelineLinks from "./TimelineLinks";
import Count from "./Count";
import Line from "../UI/Line";

const Menu = ({ timeline, darkMode }) => {
    // for this function add a button
    /* const scrollToTop = () => {
        scroll.scrollToTop();
    }; */

    const handleSetActive = () => {};

    return (
        <div className={style.MenuWrapper}>
            <div className={`${style.Menu} ${darkMode ? style.DarkMode : ""}`}>
                <div className={style.VerticalLine}>
                    <Line
                        width={darkMode ? "1px" : "1.5px"}
                        height={"100%"}
                        color={darkMode ? "#6c767c" : "#d7d8d8"}
                    />
                </div>

                <div className={style.TimelineLink} id={style.FirstLink}>
                    <Link
                        activeClass={style.Active}
                        to="intro"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={500}
                        onSetActive={handleSetActive}
                        // onClick={scrollToTop}
                    >
                        welcome
                    </Link>
                </div>

                <div className={style.TimelineLink}>
                    <Link
                        activeClass={style.Active}
                        to="projects"
                        spy={true}
                        smooth={true}
                        offset={1}
                        duration={500}
                        onSetActive={handleSetActive}
                    >
                        projects
                    </Link>
                </div>
                <div className={style.TimelineLink}>
                    <Link
                        activeClass={style.Active}
                        to="journal"
                        spy={true}
                        smooth={true}
                        offset={2}
                        duration={500}
                        onSetActive={handleSetActive}
                    >
                        timeline
                    </Link>
                </div>

                <div className={style.Timeline}>
                    <TimelineLinks timeline={timeline} />
                </div>

                <div className={style.Count}>
                    <Count days={timeline.length} />
                </div>
            </div>
        </div>
    );
};

export default Menu;
