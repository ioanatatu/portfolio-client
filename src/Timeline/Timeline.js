import React from "react";
import css from "./Timeline.module.css";

const Timeline = () => {
    return (
        <div className={css.TimelineWrapper}>
            <div className={css.Timeline}>
                <h3 style={{ marginTop: 20 }}>Intro</h3>
                <h3>Projects</h3>
                <h3 style={{ marginBottom: 20 }}>Timeline</h3>
                <ul>
                    <li>
                        <div className={css.Bullet}></div>09/12/2020
                    </li>
                    <li>
                        <div className={css.Bullet}></div>09/12/2020
                    </li>
                    <li>
                        <div className={css.Bullet}></div>08/12/2020
                    </li>
                    <li>
                        <div className={css.Bullet}></div>07/12/2020
                    </li>
                    <li>
                        <div className={css.Bullet}></div>06/12/2020
                    </li>
                </ul>
            </div>

            <div className={css.Count}>
                x days of coding since this portfolio was published
            </div>
        </div>
    );
};

export default Timeline;
