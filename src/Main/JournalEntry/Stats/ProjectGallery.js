import React from "react";
import Arrow from "../../../UI/Arrow";

const ProjectGallery = (props) => {
    return (
        <div className="ProjectGallery" style={{ backgroundColor: "none" }}>
            <h3
                style={{
                    fontFamily: "DM Sans",
                    fontWeight: "600",
                    paddingLeft: "20px",
                    fontSize: 14,
                    height: 20,
                    textAlign: "start",
                }}
            >
                Project Gallery
            </h3>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "calc(100% - 20px)",
                }}
            >
                <span style={{ transform: "rotate(90deg)" }}>
                    <Arrow fontSize={"12px"} />
                </span>
                <ul
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0 3px",
                    }}
                >
                    <li style={{ width: "24%" }}>picOne</li>
                    <li style={{ width: "24%" }}>picTwo</li>
                    <li style={{ width: "24%" }}>picThree</li>
                    <li style={{ width: "24%" }}>picFour</li>
                </ul>
                <span style={{ transform: "rotate(-90deg)" }}>
                    <Arrow fontSize={"12px"} />
                </span>
            </div>
        </div>
    );
};

export default ProjectGallery;
