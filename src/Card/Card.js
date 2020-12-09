import React from "react";
import css from "./Card.module.css";

const Card = (props) => {
    return (
        <div className={css.CardWrapper} style={{ backgroundColor: props.bcg }}>
            <div className={css.Card}>
                <h4>{props.title}</h4>
                <div className={css.Line}></div>
                <p>{props.children}</p>
            </div>
        </div>
    );
};

export default Card;
