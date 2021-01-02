import style from "./Menu.module.scss";

// React Router
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Timeline = ({ timeline }) => {
    const [timelineReversed, setTimelineReversed] = useState();

    useEffect(() => {
        if (timeline) {
            let tln = timeline;
            tln.reverse();
            setTimelineReversed(tln);
        }
    }, [timeline]);

    return (
        <div className={style.Timeline}>
            <ul>{timelineReversed && mapDatesToTimeline(timelineReversed)}</ul>
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

    return array.map((day, i) => {
        const year = day.split("-")[0];
        return (
            <li key={day.toString()}>
                <Link
                    to={`/timeline/:${day.date}`}
                    // activeClass="active"
                    // to={day.date}
                    // spy={true}
                    // smooth={true}
                    // offset={0}
                    // duration={500}
                >
                    {day}
                </Link>
            </li>
        );
    });
}
