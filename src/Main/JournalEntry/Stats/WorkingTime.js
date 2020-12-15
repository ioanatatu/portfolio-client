const WorkingTime = ({ workingTime: { duration, hrs, mins } }) => {
    return (
        <div
            style={{
                fontFamily: "GT Walsheim Pro",
                fontWeight: "600",
                padding: "0 20px",
            }}
        >
            <span
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                }}
            >
                <div
                    style={{
                        fontSize: "14px",
                    }}
                >
                    Total
                    <br />
                    working time
                </div>
                <div>
                    <div>
                        <span
                            style={{
                                fontSize: "26px",
                                fontFamily: "GT Walsheim Pro",
                                fontWeight: "600",
                                paddingTop: "-5px",
                            }}
                        >
                            {duration}
                        </span>
                        hrs
                    </div>
                </div>
            </span>

            <div
                style={{
                    fontSize: "11px",
                    color: "grey",
                    textAlign: "right",
                    fontWeight: "500",
                }}
            >
                {hrs} hours, {mins} minutes
            </div>
        </div>
    );
};

export default WorkingTime;
