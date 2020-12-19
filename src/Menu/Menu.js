// Styles
import style from "./Menu.module.scss";

// React
import React from "react";
import { Link } from "react-scroll";

// Components
import TimelineLinks from "./TimelineLinks";
import Count from "./Count";

const Menu = ({ timeline }) => {
    // for this function add a button
    /* const scrollToTop = () => {
        scroll.scrollToTop();
    }; */

    return (
        <div className={style.Menu}>
            <div>
                <Link
                    activeClass="active"
                    to="intro"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    // onClick={scrollToTop}
                >
                    welcome
                </Link>
            </div>

            <div>
                <Link
                    activeClass="active"
                    to="projects"
                    spy={true}
                    smooth={true}
                    offset={2}
                    duration={500}
                >
                    projects
                </Link>
            </div>
            <div>
                <Link
                    activeClass="active"
                    to="timeline"
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                >
                    timeline
                </Link>
            </div>

            <div>
                <TimelineLinks timeline={timeline} />
            </div>

            <div className={style.Count}>
                <Count days={timeline.length} />
            </div>
        </div>
    );
};

export default Menu;
