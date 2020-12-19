import React from "react";
import { Circle } from "rc-progress";

// Components
import Line from "../../../UI/Line";

const TechLabel = ({ tech }) => {
    console.log("tech", tech);
    return (
        <div
            style={{
                width: "100%",
                height: "57px",
                border: "2px solid #d9dce4",
                borderRadius: "12px",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#1869ff",
            }}
        >
            <h6
                style={{
                    fontSize: "13px",
                    fontFamily: "GT Walsheim Pro",
                    fontWeight: "300",
                    width: "45%",
                }}
            >
                {tech.name}
            </h6>
            <Line height={"40px"} width={"1.5px"} />
            <div
                style={{
                    height: "40px",
                    width: "40px",
                    position: "relative",
                }}
            >
                <Circle
                    percent="26"
                    strokeWidth="11"
                    trailWidth="10"
                    strokeColor="orangered"
                    strokeLinecap="butt"
                    trailColor="#d9dce4"
                />
                <div
                    style={{
                        position: "absolute",
                        top: "12px",
                        left: "50%",
                        transform: "translateX(-51%)",
                        color: "MidnightBlue",
                        fontFamily: "GT Walsheim Pro",
                        fontSize: "12px",
                        fontWeight: "600",
                    }}
                >
                    20%
                </div>
            </div>
        </div>
    );
};

export default TechLabel;
