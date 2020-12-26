// Style
import style from "./CreateProjectForm.module.scss";

// React
import React, { Fragment, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

// Components
import { BsCloudUpload } from "react-icons/bs";
import { BiTrashAlt } from "react-icons/bi";

// Axios
import axios from "axios";

const CreateProject = () => {
    const { register, handleSubmit } = useForm();
    const [logoPreview, setLogoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState(false);
    const [titleExistsError, setTitleExistsError] = useState(false);
    const [urlNotValidError, setUrlNotValidError] = useState(false);
    const [noGithubLinkError, setNoGithubLinkError] = useState(false);
    const [maxGithubLinkError, setMaxGithubLinkError] = useState(false);
    const [githubLinks, setGithubLinks] = useState(["githubLink"]);
    const i = useRef(null);

    const onSubmit = async (data) => {
        console.log("data", data);

        // url validation and https formatting --> externalLink
        if (data.externalLink) {
            if (checkValidURL(data.externalLink)) {
                data.externalLink = prependHTTP(data.externalLink);
            } else {
                setUrlNotValidError(true);
            }
        }
        // url validation and https formatting --> githubLinks
        if (data.githubLink) {
            if (checkValidURL(data.githubLink)) {
                data.externalLink = prependHTTP(data.externalLink);
            }
        } else {
            setNoGithubLinkError(true);
        }

        const newData = validateAndFilterData(data);

        try {
            const res = await axios.post(
                `${require("../../util/secrets")}/project`,
                newData,
                {
                    validateStatus: function (status) {
                        return status;
                    },
                }
            );

            res.status === 409
                ? setTitleExistsError(true)
                : setGeneralError(true);
        } catch (err) {
            console.log(JSON.stringify(err));
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

    const appendGithubInputField = () => {
        if (githubLinks.length < 3) {
            const newLinks = [...githubLinks, "githubLink"];
            setGithubLinks(newLinks);
        } else {
            setMaxGithubLinkError(true);
        }
    };
    const removeGithubInputField = (e) => {
        e.preventDefault();
        const index = parseInt(e.currentTarget.attributes.index.value);
        const newLinks = githubLinks.filter((_, i) => i !== index);

        setGithubLinks(newLinks);
    };

    useEffect(() => {}, [githubLinks]);

    return (
        <div className={style.FormContainer}>
            <h1>Create New Project</h1>
            {generalError && (
                <div
                    style={{
                        fontSize: "12px",
                        color: "orangered",
                        marginTop: 5,
                        marginLeft: 3,
                    }}
                >
                    Oops, something went wrong. Try again later.
                </div>
            )}
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
                        <input
                            type="text"
                            name="title"
                            ref={register}
                            onClick={() => setTitleExistsError(false)}
                        />
                        {titleExistsError && (
                            <div className={style.Error}>
                                Project name must be unique
                            </div>
                        )}
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
                        <input
                            type="text"
                            name="externalLink"
                            ref={register}
                            onClick={() => setUrlNotValidError(false)}
                        />
                        {urlNotValidError && (
                            <div className={style.Error}>
                                The URL is not valid
                            </div>
                        )}
                    </label>

                    {/*---------------------------------------- githubLink --- */}
                    <label>
                        GitHub Repo <span>you can add up to 3 repos</span>
                        {githubLinks.map((link, index) => (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <input
                                    type="text"
                                    name={link}
                                    ref={register}
                                    key={index.toString}
                                    onClick={() => {
                                        setNoGithubLinkError(false);
                                        setUrlNotValidError(false);
                                    }}
                                    // style={{ marginRight: 3 }}
                                />
                                {index > 0 && (
                                    <button
                                        onClick={removeGithubInputField}
                                        index={index}
                                        style={{ cursor: "pointer" }}
                                        ref={i}
                                    >
                                        <BiTrashAlt color={"grey"} />
                                    </button>
                                )}
                            </div>
                        ))}
                        {/*
                        
                        
                        
                        
                        
                        
                        */}
                        {noGithubLinkError && (
                            <div className={style.Error}>
                                You need to add at least one GitHub repo for
                                your project
                            </div>
                        )}
                        {urlNotValidError && (
                            <div className={style.Error}>
                                The URL is not valid
                            </div>
                        )}
                        {maxGithubLinkError && (
                            <div className={style.Error}>
                                You have reached the limit of 3 repos
                            </div>
                        )}
                        <div
                            onClick={appendGithubInputField}
                            className={style.AddRepoButton}
                        >
                            <span className={style.AddRepo}>+</span>add another
                            repo
                        </div>
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

function filterTrueTechStackLabels(obj) {
    return (obj.techStack = Object.entries(obj.techStack)
        .map((item) => (item[1] ? item[0] : null))
        .filter((item) => item != null));
}
function checkValidURL(url) {
    const regEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return url && url !== "" ? (regEx.test(url) ? true : false) : false;
}
function prependHTTP(url) {
    const fullURL =
        url.startsWith("http") || url.startsWith("http")
            ? url
            : "https://" + url;
    return fullURL;
}
function validateAndFilterData() {}
