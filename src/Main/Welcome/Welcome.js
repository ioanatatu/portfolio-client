import React, { Fragment } from "react";
import Card from "../../Card/Card";
import { FaChevronDown } from "react-icons/fa";

import css from "./Welcome.module.css";

const Welcome = () => {
    return (
        <div className={css.WelcomeWrapper}>
            <div className={css.Welcome}>
                <span style={{ zIndex: 10 }}>
                    <h1>Dear Visitor,</h1>
                    <h2>I am Ioana and this is my portfolio</h2>
                </span>
                <span className={css.Letter}>Hi</span>
                <div className={css.Line}></div>
            </div>

            <div className={css.Cards}>
                <Card title={"projects"} bcg={""}>
                    The buttons below take you to the projects I am currently
                    developing.
                </Card>
                <Card title={"timeline"} bcg={""}>
                    The links on the right will take you to the entries of my
                    development journal, to give you an overview of what I'm
                    working on every day and how each project unfolds.
                </Card>
            </div>

            <div className={css.ChevIcon}>
                <FaChevronDown />
            </div>
        </div>
    );
};

export default Welcome;
