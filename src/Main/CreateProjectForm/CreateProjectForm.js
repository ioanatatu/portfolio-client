// Style
import style from "./CreateProjectForm.module.scss";

// React
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { BsCloudUpload } from "react-icons/bs";

// Axios
import axios from "axios";

const CreateProject = () => {
    const { register, handleSubmit } = useForm();
    const [logoPreview, setLogoPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        console.log("data", data);
        data.techStack = Object.entries(data.techStack)
            .map((item) => (item[1] ? item[0] : null))
            .filter((item) => item != null);

        try {
            const res = await axios.post(
                `${require("../../util/secrets")}/project`,
                data
            );
            console.log("RESULT FROM API", res);
        } catch (err) {
            console.log("RESULT FROM API", err);
        }
    };

    const createSelectedImagePreview = (e) => {
        setLogoPreview(null);

        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                setLoading(true);
                setLogoPreview(this.result);
            });

            reader.readAsDataURL(file);
        }

        if (logoPreview) {
            setLoading(false);
        }
    };

    return (
        <div className={style.FormContainer}>
            <h1>Create New Project</h1>
            <h4>
                As visitor, you can add a project to the frontend for demo
                purposes. React will update the state, but no request will be
                sent to the backend. When refreshing the page, the data you
                entered will be lost.
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.LabelAndInput}>
                    <label>
                        Project Name <span>must be unique</span>
                        <input type="text" name="title" ref={register} />
                        <div className={style.Error}>
                            Project name must be unique
                        </div>
                    </label>
                    <label>
                        Project Description
                        <textarea
                            type="text"
                            name="description"
                            ref={register}
                        />
                    </label>
                    <label>
                        URL
                        <input type="text" name="externalLink" ref={register} />
                        <div className={style.Error}>The URL is not valid</div>
                    </label>
                    <label>
                        GitHub Repo <span>you can add up to 3 repos</span>
                        <input type="text" name="githubLink" ref={register} />
                        <div className={style.Error}>
                            You need to add at least one GitHub repo for your
                            project
                        </div>
                        <button>
                            <span className={style.AddRepo}>+</span>add another
                            repo
                        </button>
                    </label>
                </div>
                <div className={style.LabelAndInput}>
                    <label>
                        Tech Stack
                        <ul>
                            {techStack.map((item) => (
                                <li>
                                    <input
                                        type="checkbox"
                                        name={item}
                                        id={item}
                                        ref={register}
                                    />
                                    <label for={item}>
                                        {item.split(".")[1]}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </label>

                    <label htmlFor="file">
                        Upload Logo
                        {logoPreview ? <span>image preview</span> : null}
                        {logoPreview ? (
                            <Fragment>
                                <div className={style.PreviewContainer}>
                                    {loading && !logoPreview ? (
                                        <div class={style.LoadingRing}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    ) : (
                                        <img
                                            src={logoPreview}
                                            alt="logo preview"
                                        />
                                    )}
                                </div>
                                <div className={style.UploadLogo}>
                                    {logoPreview
                                        ? "choose a different image"
                                        : "choose image to upload"}
                                </div>
                            </Fragment>
                        ) : (
                            <div className={style.UploadLogoInput}>
                                <BsCloudUpload size={30} color={"grey"} />
                                <div className={style.UploadLogo}>
                                    {logoPreview
                                        ? "choose a different image"
                                        : "choose image to upload"}
                                </div>
                            </div>
                        )}
                        <input
                            onChange={createSelectedImagePreview}
                            type="file"
                            name="file"
                            accept="image/*"
                            id="file"
                            hidden="hidden"
                        />
                        <div className={style.LogoPreview}></div>
                    </label>

                    <label>
                        Password
                        <input type="password" name="password" ref={register} />
                    </label>
                    <div className={style.CreateButton}>
                        <input type="submit" value="create" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateProject;

const techStack = [
    "techStack.vanilla JS",
    "techStack.typescript",
    "techStack.react",
    "techStack.redux",
    "techStack.jQuery",
    "techStack.css",
    "techStack.sass",
    "techStack.nodeJS",
    "techStack.express",
    "techStack.mongoDB",
    "techStack.DynamoDB",
    "techStack.AWS S3",
    "techStack.AWS SES",
    "techStack.serverless",
    "techStack.socketio",
    "techStack.GraphQL",
    "techStack.chartJS",
    "techStack.JSON schema",
];
