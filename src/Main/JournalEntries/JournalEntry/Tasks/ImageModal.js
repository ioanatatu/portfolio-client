// Style
import style from "./ImageModal.module.scss";

import React from "react";

const ImageModal = ({ imageLink }) => {
    return (
        <div className={style.ImageModalWrapper}>
            <div className={style.TaskImageContainer}>{imageLink && <img src={imageLink} alt="task"></img>}</div>
        </div>
    );
};

export default ImageModal;
