// Style
import style from "./Menu.module.scss";

// React
import React, { useEffect } from "react";

// Packages
import { v4 as uuid } from "uuid";
import { Link } from "react-scroll";

const Timeline = ({ timeline, liftSelectedJournalDateToApp }) => {
    useEffect(() => {}, [timeline]);

    const selectJournalEntryDate = (arg) => {
        console.log("arg", arg);
        liftSelectedJournalDateToApp(arg);
    };

    return (
        <div className={style.Timeline}>
            <ul>
                {timeline && mapDatesToTimeline(timeline, selectJournalEntryDate)}
            </ul>
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

function mapDatesToTimeline(a, selectJournalEntryDate) {
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
                                    key={uuid()}
                                >
                                    {month[parseInt(m) - 1]
                                        .toLowerCase()
                                        .substring(0, 3)}
                                    {result[y][m]
                                        .sort((a, b) => b - a)
                                        .map((d) => (
                                            <Link
                                                key={uuid()}
                                                to="journal"
                                                spy={true}
                                                smooth={true}
                                                offset={2}
                                                duration={500}
                                                activeclass={style.Active}
                                                onClick={() =>
                                                    selectJournalEntryDate(
                                                        `${y}-${m}-${d}`
                                                    )
                                                }
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
