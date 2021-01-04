import style from "./Card.module.scss";
import React from "react";

// React Custom Hook
import { useViewport } from "../../../CustomHooks/ViewportProvider";

const Card = (props) => {
    const { width } = useViewport();
    const breakpoint = 699;

    const textAlign = width > breakpoint ? "left" : "center";
    const direction = width > breakpoint ? "row" : "column";
    const fontSizeTitle = width > breakpoint ? "14px" : "10px";
    const fontSizeParagraph = width > breakpoint ? "15px" : "13px";

    return (
        <div
            className={`${style.CardWrapper} ${props.darkMode ? style.DarkMode : ""}`}
            style={{ flexFLow: `${direction}` }}
        >
            <div className={style.Card} style={{ textAlign: `${textAlign}` }}>
                <h4 style={{ fontSize: `${fontSizeTitle}` }}>{props.title}</h4>
                <div className={style.L}></div>
                <div style={{ fontSize: `${fontSizeParagraph}` }}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Card;
