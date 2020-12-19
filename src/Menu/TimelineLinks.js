import style from "./Menu.module.scss";

// React Router
import React from "react";
import { Link } from "react-router-dom";

const Timeline = (props) => {
    return (
        <div className={style.Timeline}>
            <ul>
                {props.timeline.map((day, index) => {
                    return (
                        <li key={index.toString()}>
                            <Link
                                to={`/timeline/:${day.date}`}
                                // activeClass="active"
                                // to={day.date}
                                // spy={true}
                                // smooth={true}
                                // offset={0}
                                // duration={500}
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
