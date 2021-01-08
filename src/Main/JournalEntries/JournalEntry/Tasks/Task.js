// Style
import style from "./Task.module.scss";

// React
import React, { Fragment, useState, useEffect } from "react";

// Components
import { FaRegEdit } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";
import Line from "../../../../UI/Line";
import ImageModal from "./ImageModal";

// Packages
import { v4 as uuid } from "uuid";
import ReactTooltip from "react-tooltip";

const Task = ({ task, index }) => {
    const [imageModalIsVisible, setImageModalIsVisible] = useState(false);
    const [imageLink, setImageLink] = useState(null);

    console.log("task.image", task.image);

    ///////////////////////////////// MAJOR REFACTOR NEEDED //////////////////////////
    const GREY = "#e7eaf0b3";
    //////////////////////////////////////////////////////////////////////////////////

    const toggleImageModal = (image) => {
        setImageLink(image);
        setImageModalIsVisible((prev) => !prev);
    };

    useEffect(() => {
        if (task && task.image) setImageLink(task.image);
    }, [task]);

    return (
        <Fragment>
            {imageModalIsVisible && (
                <ImageModal
                    imageLink={imageLink}
                    toggleImageModal={toggleImageModal}
                />
            )}
            <div
                style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "0.9fr 16.1fr 2fr 2fr",
                    marginBottom: "5px",
                    fontFamily: "GT Walsheim Pro",
                    minHeight: "0",
                }}
            >
                <div
                    style={{
                        height: "26px",
                        width: "26px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "100%",
                        backgroundColor: "#e7eaf0",
                        borderRadius: "3.5px",
                        fontFamily: "DM Sans",
                        fontWeight: "600",
                        fontSize: "12.5px",
                    }}
                >
                    {index + 1}.
                </div>
                <div
                    style={{
                        backgroundColor: GREY,
                        borderTopLeftRadius: "4px",
                        borderBottomLeftRadius: "4px",
                        padding: "8px 10px 9px 13px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            height: "16px",
                            marginBottom: "9px",
                        }}
                    >
                        <div
                            style={{
                                marginBottom: "10px",
                                display: "flex",
                            }}
                        >
                            {task &&
                                task.tags.map((tag, i) => (
                                    <Fragment key={uuid()}>
                                        <div
                                            key={uuid()}
                                            style={{
                                                color: "#1869ff",
                                                textTransform: "capitalize",
                                                fontSize: "12.5px",
                                                fontWeight: "600",
                                                marginRight: "5px",
                                            }}
                                        >
                                            {tag}
                                        </div>
                                        <span
                                            style={{
                                                marginRight: "8px",
                                                marginLeft: "3px",
                                                marginTop: "1px",
                                            }}
                                        >
                                            {i !== task.tags.length - 1 && (
                                                <Line
                                                    height={"14px"}
                                                    width={"1.5px"}
                                                    color={"silver"}
                                                />
                                            )}
                                        </span>
                                    </Fragment>
                                ))}
                        </div>
                        <div
                            style={{
                                fontSize: "12px",
                                width: "33px",
                                display: "flex",
                                justifyContent: "space-between",
                                cursor: "pointer",
                            }}
                            data-tip="these buttons are work in progress"
                        >
                            <FaRegEdit color={"grey"} />
                            <BiTrashAlt
                                color={"grey"}
                                style={{
                                    fontSize: "13.5px",
                                    paddingBottom: "1px",
                                }}
                            />
                            <ReactTooltip effect="solid" />
                        </div>
                    </div>

                    <div
                        style={{
                            fontSize: "14.5px",
                            marginTop: "10px",
                        }}
                    >
                        {task.description}
                    </div>
                    <div
                        style={{
                            fontSize: "11px",
                            marginTop: "10px",
                            fontFamily: "GT Walsheim Pro",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <span
                            style={{
                                position: "relative",
                            }}
                        >
                            Status
                            <div
                                style={{
                                    position: "absolute",
                                    fontSize: "30px",
                                    top: "-19px",
                                    right: "-12px",
                                }}
                            >
                                .
                            </div>
                        </span>
                        <div
                            style={{
                                borderRadius: "3px",
                                backgroundColor: "LightSeaGreen",
                                marginLeft: "17px",
                                padding: "1px 6px 2px 5px",
                                color: "white",
                                fontWeight: "500",
                                letterSpacing: ".7px",
                            }}
                        >
                            {task.status}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: GREY,
                        textAlign: "center",
                        paddingTop: "44%",
                    }}
                >
                    {task.duration}
                </div>

                <div
                    style={{
                        backgroundColor: GREY,
                        borderTopRightRadius: "4px",
                        borderBottomRightRadius: "4px",
                        marginRight: "10px",
                        paddingTop: "23%",
                    }}
                >
                    <div
                        className={`${style.ImageAndBorderContainer} ${
                            imageLink ? style.HoverImage : ""
                        }`}
                        onClick={() => {
                            if (imageLink) toggleImageModal(task.image);
                        }}
                    >
                        <div className={style.ImageContainer}>
                            {imageLink ? (
                                <img
                                    src={task.image}
                                    alt=""
                                    style={{ width: "100%" }}
                                    id={style.HoverImage}
                                ></img>
                            ) : (
                                <p>
                                    no image for this
                                    <br /> task
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Task;
