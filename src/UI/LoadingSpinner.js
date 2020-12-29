import style from "./LoadingSpinner.module.scss";

const LoadingSpinner = ({ size, color, border }) => {
    const c = color || "#1cb6ee";
    const b = border || 4;

    return (
        <div
            className={style.LoadingRing}
            style={{
                width: `${size}px` || "80px",
                height: `${size}px` || "80px",
            }}
        >
            <div
                style={{
                    width: `${size}px` || "55px",
                    height: `${size}px` || "55px",
                    border: `${b}px solid #1cb6ee`,
                    borderColor: `${c} transparent transparent transparent`,
                }}
            ></div>
            <div
                style={{
                    width: `${size}px` || "55px",
                    height: `${size}px` || "55px",
                    border: `${b}px solid #1cb6ee`,
                    borderColor: `${c} transparent transparent transparent`,
                }}
            ></div>
            <div
                style={{
                    width: `${size}px` || "55px",
                    height: `${size}px` || "55px",
                    border: `${b}px solid #1cb6ee`,
                    borderColor: `${c} transparent transparent transparent`,
                }}
            ></div>
            <div
                style={{
                    width: `${size}px` || "55px",
                    height: `${size}px` || "55px",
                    border: `${b}px solid #1cb6ee`,
                    borderColor: `${c} transparent transparent transparent`,
                }}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
