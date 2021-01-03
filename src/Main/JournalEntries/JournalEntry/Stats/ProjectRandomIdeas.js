import React, { Fragment } from "react";
import Line from "../../../../UI/Line";

const ProjectRandomIdeas = ({ ideas }) => {
    console.log("ideas", ideas);
    return (
        <div
            style={{
                borderRadius: "5px",
                border: "1px solid silver",
                padding: "10px 15px",
                paddingBottom: "0",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "DM Sans",
                    fontWeight: "600",
                    fontSize: 12,
                    height: 20,
                    marginBottom: "5px",
                }}
            >
                <h3
                    style={{
                        textAlign: "start",
                    }}
                >
                    Project Random Ideas
                </h3>
                <h3
                    style={{
                        textAlign: "start",
                    }}
                >
                    Status
                </h3>
            </div>
            <Line height={"1px"} />
            <div style={{ maxHeight: "80%", overflowY: "scroll" }}>
                {ideas.map((idea, index) => (
                    <Fragment>
                        <div
                            key={index.toString()}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "80% 15%",
                                gap: "5%",
                                fontSize: "12px",
                                padding: "5px 0",
                                fontFamily: "GT Walsheim Pro",
                            }}
                        >
                            <p style={{}}>{idea.idea}</p>
                            <p style={{ textAlign: "right" }}>
                                {idea.check ? "solved" : "open"}
                            </p>
                        </div>
                        <Line height={"0.5px"} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default ProjectRandomIdeas;
