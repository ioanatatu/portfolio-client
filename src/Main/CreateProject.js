import React from "react";

const CreateProject = () => {
    return (
        <div
            style={{
                width: "800px",
                backgroundColor: "#e4eaeb",
                padding: "60px 80px",
                borderRadius: "8px",
            }}
        >
            <h1 style={{ margin: 0, padding: 0 }}>Create New Project</h1>
            <h4
                style={{
                    backgroundColor: "snow",
                    padding: "15px 25px",
                    margin: "10px 0",
                    borderRadius: "3px",
                }}
            >
                As visitor, you can add a project to the frontend for demo
                purposes. React will update the state, but no request will be
                sent to the backend. When refreshing the page, the data you
                entered will be lost.
            </h4>
            <form
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "60px",
                }}
            >
                <div>
                    <label>
                        Project Name
                        <input type="text" name="name" />
                        <div>Project name must be unique</div>
                    </label>
                    <label>
                        Project Description
                        <textarea
                            type="text"
                            name="name"
                            style={{ height: "120px", width: "100%" }}
                        />
                    </label>
                    <label>
                        URL
                        <input type="text" name="name" />
                        <div>not a valid url</div>
                    </label>
                    <label>
                        GitHub Repo
                        <input type="text" name="name" />
                        <div>
                            you need to add at least one GitHub repo for your
                            project
                        </div>
                        <button>add another repo</button>
                    </label>
                </div>
                <div>
                    <label>
                        Tech Stack
                        <input type="text" name="name" />
                    </label>
                    <label>
                        Upload Logo
                        <input type="text" name="name" />
                    </label>
                    <label>
                        Password
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="create" />
                </div>
            </form>
        </div>
    );
};

export default CreateProject;
