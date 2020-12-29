import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Arrow = ({ size, fontSize, color, background, paddingTop }) => {
    const s = size || "20";
    const fs = fontSize || "14";
    const col = color || "white";
    // const bcg = background || "none";
    const pt = paddingTop || "2";

    return (
        <div
            style={{
                width: `${s}px`,
                height: `${s}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: `${fs}px`,
                // backgroundColor: `${bcg}`,
                paddingTop: `${pt}px`,
                borderRadius: "50%",
                cursor: "pointer",
            }}
        >
            <FaChevronDown color={col} />
        </div>
    );
};

export default Arrow;
