const Error = ({
    marginTop,
    marginLeft,
    fontSize,
    color,
    fontWeight,
    fontFamily,
    children,
}) => {
    const style = {
        marginTop: marginTop || 0,
        marginLeft: marginLeft || 0,
        fontSize: fontSize || "11px",
        color: color || "orangered",
        fontWeight: fontWeight || "400",
        fontFamily: fontFamily || "DM Sans",
    };
    return <div style={style}>{children}</div>;
};

export default Error;
