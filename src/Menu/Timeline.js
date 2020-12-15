import style from "./Menu.module.scss";

// React
import React from "react";
import { Link } from "react-scroll";

const Timeline = (props) => {
    return (
        <div className={style.Timeline}>
            <ul>
                {props.timeline.map((day, index) => {
                    return (
                        <li key={index.toString()}>
                            <Link
                                activeClass="active"
                                to={day.date}
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}
                            >
                                {day.date}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Timeline;
