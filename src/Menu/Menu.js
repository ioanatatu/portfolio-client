// Styles
import style from "./Menu.module.scss";

// React
import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";

// Components
import Timeline from "./Timeline";
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
                    offset={0}
                    duration={500}
                >
                    projects
                </Link>
            </div>

            <div>timeline</div>

            <div>
                <Timeline timeline={timeline} />
            </div>

            <div className={style.Count}>
                <Count days={timeline.length} />
            </div>
        </div>
    );
};

export default Menu;
