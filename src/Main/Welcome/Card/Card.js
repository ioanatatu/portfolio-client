import React from "react";
import style from "./Card.module.scss";

// React Custom Hook
import { useViewport } from "../../../CustomHooks/ViewportProvider";

const Card = (props) => {
    const { width } = useViewport();
    const breakpoint = 699;

    const textAlign = width > breakpoint ? "left" : "center";
    const direction = width > breakpoint ? "row" : "column";
    console.log("direction ", direction);
    const fontSizeTitle = width > breakpoint ? "12px" : "10px";
    const fontSizeParagraph = width > breakpoint ? "15px" : "13px";

    return (
        <div
            className={style.CardWrapper}
            style={{ display: "flex", flexFLow: `${direction}` }}
        >
            <div className={style.Card} style={{ textAlign: `${textAlign}` }}>
                <h4 style={{ fontSize: `${fontSizeTitle}` }}>{props.title}</h4>
                <div className={style.L}></div>
                <p style={{ fontSize: `${fontSizeParagraph}` }}>
                    {props.children}
                </p>
            </div>
        </div>
    );
};

export default Card;
