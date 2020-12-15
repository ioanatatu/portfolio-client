// Style
import style from "./DarkModeToggler.module.css";

// React
import React from "react";

const DarkModeToggler = ({ darkMode, toggleDarkMode }) => {
    return (
        <div
            className={
                darkMode
                    ? `${style.Normal} + " " + ${style.DarkMode}`
                    : `${style.Normal} + " " + ${style.LightMode}`
            }
            onClick={toggleDarkMode}
        >
            <input type="checkbox" />
            <label></label>
        </div>
    );
};

export default DarkModeToggler;
