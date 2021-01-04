import style from "./Checkmark.module.scss";
import React, { Fragment } from "react";

const Checkmark = ({ color }) => {
    const c = color || "#4cb0ee";

    return (
        <Fragment>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 130.2 130.2"
            >
                <circle
                    className={`${style.path} ${style.circle}`}
                    fill="none"
                    stroke={c}
                    strokeWidth="7"
                    strokeMiterlimit="10"
                    cx="65.1"
                    cy="65.1"
                    r="60"
                />
                <polyline
                    className={`${style.path} ${style.check}`}
                    fill="none"
                    stroke={c}
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    points="100.2,40.2 51.5,88.8 29.8,67.5 "
                />
            </svg>
        </Fragment>
    );
};

export default Checkmark;
