import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Arrow = ({ size, fontSize, color, background, paddingTop }) => {
    const s = size || "20px";
    const fs = fontSize || "14px";
    const col = color || "white";
    const bcg = background || "grey";
    const pt = paddingTop || "2px";

    return (
        <div
            style={{
                width: `${s}`,
                height: `${s}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: `${fs}`,
                backgroundColor: `${bcg}`,
                paddingTop: `${pt}`,
                borderRadius: "50%",
                cursor: "pointer",
            }}
        >
            <FaChevronDown color={col} />
        </div>
    );
};

export default Arrow;
