// Style
import style from "./ImageModal.module.scss";

import React from "react";

import CloseButton from "../../../../UI/CloseButton/CloseButton";

const ImageModal = ({ imageLink, toggleImageModal, imageName, date }) => {
    return (
        <div className={style.WithBackdrop}>
            <div className={style.ImageModalWrapper}>
                <div>
                    <p className={style.ImageName}>
                        {imageName ? imageName : "This image has no title"}
                    </p>
                    {date && <p className={style.ImageDate}>{date}</p>}
                    <span className={style.CloseButton}>
                        <CloseButton click={toggleImageModal} />
                    </span>
                </div>
                <div className={style.TaskImageContainer}>
                    {imageLink && <img src={imageLink} alt="task"></img>}
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
