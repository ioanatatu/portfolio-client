const Line = ({ width, height, color }) => {
    const col = color || "#dae0e8";
    const w = width || "100%";
    const h = height || "2.5px";

    return (
        <div
            style={{
                width: `${w}`,
                height: `${h}`,
                backgroundColor: `${col}`,
            }}
        ></div>
    );
};

export default Line;
