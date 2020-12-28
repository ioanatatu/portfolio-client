import style from "./LoadingSpinner.module.scss";

const LoadingSpinner = ({ size, color }) => {
    return (
        <div
            className={style.LoadingRing}
            style={{
                width: size || "80px",
                height: size || "80px",
            }}
        >
            <div
                style={{
                    borderColor: `${color} || "#1cb6ee"} transparent transparent transparent`,
                }}
            ></div>
            <div
                style={{
                    borderColor: `${color} || "#1cb6ee"} transparent transparent transparent`,
                }}
            ></div>
            <div
                style={{
                    borderColor: `${color} || "#1cb6ee"} transparent transparent transparent`,
                }}
            ></div>
            <div
                style={{
                    borderColor: `${color} || "#1cb6ee"} transparent transparent transparent`,
                }}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
