// Style
import style from "./Menu.module.scss";

// Packages
import { v4 as uuid } from "uuid";

// React Router
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Timeline = ({ timeline }) => {
    useEffect(() => {}, [timeline]);

    return (
        <div className={style.Timeline}>
            <ul>{timeline && mapDatesToTimeline(timeline)}</ul>
        </div>
    );
};

export default Timeline;
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
const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function mapDatesToTimeline(a) {
    const b = a.map((el) => el.split("-"));
    let result = {};

    b.forEach((item) => {
        let year = item[0];
        let month = item[1];
        let day = item[2];

        if (!result[year]) {
            result[year] = {};
        }
        if (!result[year][month]) {
            result[year][month] = [];
        }
        result[year][month].push(day);
    });

    return Object.keys(result)
        .reverse()
        .map((y) => {
            return (
                <li key={uuid()}>
                    <div>
                        {y}
                        {Object.keys(result[y]).map((m) => {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    {month[parseInt(m) - 1]
                                        .toLowerCase()
                                        .substring(0, 3)}
                                    {result[y][m].sort().map((d) => (
                                        <Link
                                            to={`/timeline/:${y}-${m}-${d}`}
                                            activeClass={style.Active}
                                        >
                                            {d}
                                        </Link>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </li>
            );
        });
}
/* return (
    <li key={uuid()}>
        <Link
            to={`/timeline/:${k.date}`}
            // to={day.date}
            // spy={true}
            // smooth={true}
            // offset={0}
            // duration={500}
        >
            {k}
        </Link>
    </li>
); */
