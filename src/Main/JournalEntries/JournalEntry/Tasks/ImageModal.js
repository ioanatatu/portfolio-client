// Style
import style from "./ImageModal.module.scss";

import React from "react";

import CloseButton from "../../../../UI/CloseButton/CloseButton";

const ImageModal = ({ imageLink, toggleImageModal }) => {
    return (
        <div className={style.WithBackdrop}>
            <div className={style.ImageModalWrapper}>
                <span className={style.CloseButton}>
                    <CloseButton click={toggleImageModal} />
                </span>
                <div className={style.TaskImageContainer}>
                    {imageLink && <img src={imageLink} alt="task"></img>}
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
