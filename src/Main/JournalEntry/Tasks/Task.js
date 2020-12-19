import React, { Fragment } from "react";

// Components
import { FaRegEdit } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";
import Line from "../../../UI/Line";

const Task = ({ task, index }) => {
    return (
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
                    backgroundColor: "#ddd",
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
                    backgroundColor: "#eee",
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
                        // backgroundColor: "yellowgreen",
                    }}
                >
                    <div
                        style={{
                            marginBottom: "10px",
                            display: "flex",
                        }}
                    >
                        {task.tags.map((tag, i) => (
                            <Fragment>
                                <div
                                    key={(i + 1001).toString()}
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
                    >
                        <FaRegEdit color={"grey"} />
                        <BiTrashAlt
                            color={"grey"}
                            style={{
                                fontSize: "13.5px",
                                paddingBottom: "1px",
                            }}
                        />
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
                    backgroundColor: "#eee",
                    textAlign: "center",
                    paddingTop: "44%",
                }}
            >
                {task.duration}
            </div>

            <div
                style={{
                    backgroundColor: "#eee",
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                    marginRight: "10px",
                    paddingTop: "23%",
                }}
            >
                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={`../images/journal/2020-12-11/portfolio/${task.image}`}
                        alt=""
                        style={{ width: "100%" }}
                    ></img>
                </div>
            </div>
        </div>
    );
};

export default Task;

//  <div
//                 style={{
//                     padding: "2px 10px 4px 10px",
//                     // height: "auto",
//                     backgroundColor: "#eee",
//                     borderRadius: "4px",
//                     marginRight: "10px",
//                     width: "100%",
//                 }}
//             ></div>
