// Style
import style from "./CreateProjectForm.module.scss";

// React
import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Components
import Error from "../../UI/Error";
import Checkmark from "../../UI/Checkmark/Checkmark";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { BsCloudUpload } from "react-icons/bs";
import { BiTrashAlt } from "react-icons/bi";
import { MdClear } from "react-icons/md";

// Axios
import axios from "axios";

const CreateProject = ({ passProjectToState, toggleProjectFormIsVisible }) => {
    // state
    const { register, handleSubmit } = useForm();
    const [logoPreview, setLogoPreview] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const [loadingLogo, setLoadingLogo] = useState(false);
    const [githubLinks, setGithubLinks] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [checkmark, setCheckmark] = useState(false);
    let canSubmit = true;

    // errors
    const [generalError, setGeneralError] = useState(false);
    const [noTitleError, setNoTitleError] = useState(false);
    const [titleExistsError, setTitleExistsError] = useState(false);
    const [invalidExternalLinkError, setInvalidExternalLinkError] = useState(false);
    const [noGithubLinkError, setNoGithubLinkError] = useState(false);
    const [invalidGithubLinkErrors, setInvalidGithubLinkErrors] = useState(new Set());
    const [invalidPasswordError, setInvalidPasswordError] = useState(false);
    const [maxGithubLinkError, setMaxGithubLinkError] = useState(false);
    const [noImageError, setNoImageError] = useState(false);

    useEffect(() => {}, [invalidGithubLinkErrors, githubLinks, loadingLogo]);

    const onSubmit = async (data) => {
        // console.log("DATA__", data);
        // 1. check if title exists
        if (data.title.length === 0) {
            return setNoTitleError(true);
        }

        // 2. if externalLink was entered, check if externalLink is valid
        if (data.externalLink.trim().length !== 0) {
            if (!checkValidURL(data.externalLink)) {
                return setInvalidExternalLinkError(true);
            } else {
                data.externalLink = prependHTTP(data.externalLink);
            }
        }

        // 3. check if githubLink was entered and if yes, check if it is valid
        Object.entries(data.githubLinks).forEach((githubLink, index) => {
            if (parseInt(index) === 0) {
                // check if the first githubLink exists
                if (githubLink[1].trim().length === 0) {
                    canSubmit = false;
                    return setNoGithubLinkError(true);
                } else {
                    if (!checkValidURL(githubLink[1])) {
                        canSubmit = false;
                        return setInvalidGithubLinkErrors(
                            (prev) => new Set(prev.add(index))
                        );
                    }
                }
            } else {
                if (githubLink[1].trim().length === 0) {
                    const remainingLinks = githubLinks.filter(
                        (_, i) => i !== parseInt(index) - 1
                    );
                    setGithubLinks(remainingLinks);
                } else {
                    if (!checkValidURL(githubLink[1])) {
                        canSubmit = false;
                        setInvalidGithubLinkErrors(
                            (prev) => new Set(prev.add(index))
                        );
                    }
                }
            }
        });

        // 4. process githubLinks to have array format
        data.githubLinks = Object.values(data.githubLinks);

        // 5. map techStack into array
        data.techStack = filterTrueTechStackLabels(data.techStack);

        // 6. check for uploaded image
        if (!logoPreview) {
            setNoImageError(true);
            canSubmit = false;
        }

        if (!canSubmit) {
            return;
        }

        setLoadingData(true);

        // 7. do the next steps if user has entered a password
        if (data.password.length !== 0) {
            // 7.1. check if image is valid
            if (logoPreview) {
                const img = logoPreview.split(";")[1];
                const mime = logoPreview.split(";")[0].split(":")[1];

                try {
                    const res = await axios.post(
                        "https://0ryd02k588.execute-api.eu-west-1.amazonaws.com/dev/image",
                        { img, mime }
                    );
                    if (!res.data.imageURL) {
                        setGeneralError(true);
                    } else {
                        data.logo = res.data.imageURL;
                        console.log("data.logo", data.logo);
                    }
                } catch (err) {
                    console.log("error from upload image", err);
                    setGeneralError(true);
                }
            }
            // 7.2. if link came back, make a request to save all data to db
            if (data.logo.length !== 0) {
                try {
                    const res = await axios.post(
                        "https://0ryd02k588.execute-api.eu-west-1.amazonaws.com/dev/project",
                        data,
                        {
                            validateStatus: function (status) {
                                return status;
                            },
                        }
                    );
                    if (res.status === 401) {
                        setInvalidPasswordError(true);
                        setLoadingData(false);
                    } else if (res.status === 409) {
                        setTitleExistsError(true);
                        setLoadingData(false);
                    } else if (res.status === 200) {
                        console.log("___DATA FROM API", res.data);
                        passProjectToState(res.data);
                        setTimeout(() => {
                            setTimeout(() => {
                                console.log("\n\n______CLOSE MODAL____\n");
                            }, 2000);
                            setLoadingData(false);
                            setCheckmark(true);
                        }, 800);
                    } else {
                        setGeneralError(true);
                        setLoadingData(false);
                    }
                } catch (err) {
                    console.log(JSON.stringify(err));
                }
            }
        } else {
            // 8. if no password was entered, print data and update general state
            data.logo = logoPreview;
            passProjectToState(data);
            setTimeout(() => {
                setTimeout(() => {
                    toggleProjectFormIsVisible();
                }, 2000);
                setLoadingData(false);
                setCheckmark(true);
            }, 800);
        }
    };
    /*
     *
     *
     * handlers
     *
     */
    const appendGithubInputField = (e) => {
        e.preventDefault();

        if (githubLinks.length < 2) {
            setGithubLinks((current) => [...current, "githubLink"]);
        } else {
            setMaxGithubLinkError(true);
            setTimeout(() => {
                setMaxGithubLinkError(false);
            }, 1500);
        }
    };
    const removeGithubInputField = (e) => {
        e.preventDefault();

        const index = parseInt(e.currentTarget.attributes.index.value);
        const newLinks = githubLinks.filter((_, i) => i !== index);

        setGithubLinks(newLinks);

        setInvalidGithubLinkErrors(
            (prev) => new Set([...prev].filter((err) => err !== index + 1))
        );
    };
    const resetGithubErrors = (e) => {
        setInvalidGithubLinkErrors(
            (prev) =>
                new Set(
                    [...prev].filter((err) => parseInt(e.target.id) !== parseInt(err))
                )
        );
    };
    const disableAddRepoButton = (e) => {
        e.target.value.length < 8
            ? setButtonDisabled(true)
            : setButtonDisabled(false);
    };
    const createPreviewSelectedImage = (e) => {
        e.preventDefault();
        setLogoPreview(null);

        const file = e.target.files[0];

        if (file) {
            setLoadingLogo(true);
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                setLogoPreview(this.result);
            });
            reader.readAsDataURL(file);
        }

        setTimeout(() => setLoadingLogo(false), 500);
        // console.log(file);
    };

    return (
        <div className={style.FormContainer}>
            {checkmark ? (
                <div className={style.CheckmarkContainer}>
                    <Checkmark />
                    <p>Your project has been created</p>
                </div>
            ) : (
                <Fragment>
                    {loadingData && (
                        <div className={style.SpinnerContainerLarge}>
                            <LoadingSpinner size={110} border={8} />
                        </div>
                    )}
                    <span className={style.CloseButton}>
                        <MdClear onClick={toggleProjectFormIsVisible} />
                    </span>

                    <h1>Create New Project</h1>

                    {generalError && (
                        <Error fontSize={"12px"} marginLeft={3}>
                            Oops, something went wrong. Try again later.
                        </Error>
                    )}
                    <h4>
                        As visitor, you can add a project to the frontend for demo
                        purposes. React will update the state, but no request will be
                        sent to the backend. When refreshing the page, the data you
                        entered will be lost. Entering an incorrect password will
                        throw an error.
                    </h4>

                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div id="first column">
                            <label htmlFor="title">
                                Project Name <span>must be unique</span>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    ref={register}
                                    onClick={() => {
                                        setTitleExistsError(false);
                                        setNoTitleError(false);
                                    }}
                                />
                                {noTitleError ? (
                                    <Error>You have to enter a project name</Error>
                                ) : titleExistsError ? (
                                    <Error>Project name must be unique</Error>
                                ) : null}
                            </label>

                            <label htmlFor="description">
                                Project Description
                                <textarea
                                    type="text"
                                    name="description"
                                    id="description"
                                    ref={register}
                                />
                            </label>

                            <label htmlFor="externalLink">
                                URL
                                <input
                                    type="text"
                                    name="externalLink"
                                    id="externalLink"
                                    ref={register}
                                    onClick={() => setInvalidExternalLinkError(false)}
                                />
                                {invalidExternalLinkError && (
                                    <Error>The URL is not valid</Error>
                                )}
                            </label>

                            <label htmlFor="githubLinks">
                                GitHub Repo <span>you can add up to 3 repos</span>
                                <input
                                    type="text"
                                    name={`githubLinks.githubLink${0}`}
                                    ref={register}
                                    onChange={(e) => {
                                        setNoGithubLinkError(false);
                                        resetGithubErrors(e);
                                        disableAddRepoButton(e);
                                    }}
                                    id="0"
                                />
                                {noGithubLinkError ? (
                                    <Error>
                                        You need to add at least one GitHub repo to
                                        your project
                                    </Error>
                                ) : invalidGithubLinkErrors.has(0) ? (
                                    <Error>Invalid github link</Error>
                                ) : null}
                                {githubLinks.map((link, index) => (
                                    <Fragment>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "baseline",
                                            }}
                                            key={(index + 1001).toString()}
                                        >
                                            <input
                                                type="text"
                                                name={`githubLinks.${link}${
                                                    index + 1
                                                }`}
                                                ref={register}
                                                onChange={(e) => {
                                                    setNoGithubLinkError(false);
                                                    resetGithubErrors(e);
                                                }}
                                                id={index + 1}
                                                style={{ marginRight: 3 }}
                                            />

                                            <button
                                                onClick={removeGithubInputField}
                                                index={index}
                                                style={{
                                                    cursor: "pointer",
                                                    marginTop: 2,
                                                }}
                                                className={
                                                    style.RemoveGithubInputFieldButton
                                                }
                                            >
                                                <BiTrashAlt />
                                            </button>
                                        </div>
                                        {invalidGithubLinkErrors.has(index + 1) ? (
                                            <Error>Invalid github link</Error>
                                        ) : null}
                                    </Fragment>
                                ))}
                                <button
                                    onClick={appendGithubInputField}
                                    className={style.AddRepoButton}
                                    disabled={buttonDisabled}
                                >
                                    <span className={style.AddRepo}>+</span>
                                    add another repo
                                </button>
                                {maxGithubLinkError && (
                                    <Error>You already added 3 fields</Error>
                                )}
                            </label>
                        </div>

                        <div id="second column">
                            <label htmlFor="techStack">
                                Tech Stack
                                <ul>
                                    {techStack.map((item, index) => (
                                        <li key={index.toString()}>
                                            <input
                                                type="checkbox"
                                                name={item}
                                                id={item}
                                                ref={register}
                                            />
                                            <label htmlFor={item}>
                                                {item.split(".")[1]}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </label>

                            <label htmlFor="file">
                                <div style={{ height: "190px" }}>
                                    Upload Logo
                                    {!logoPreview ? (
                                        <div className={style.UploadLogoInput}>
                                            <BsCloudUpload size={30} color={"grey"} />
                                            <div
                                                className={style.UploadLogo}
                                                onClick={() => {
                                                    setGeneralError(false);
                                                    setNoImageError(false);
                                                }}
                                            >
                                                choose image to upload
                                            </div>
                                        </div>
                                    ) : loadingLogo ? (
                                        <div className={style.SpinnerContainer}>
                                            <LoadingSpinner size={55} />
                                        </div>
                                    ) : (
                                        <Fragment>
                                            <div className={style.PreviewContainer}>
                                                <img
                                                    src={logoPreview}
                                                    alt="logo preview"
                                                />
                                            </div>
                                            <div
                                                className={style.UploadLogo}
                                                onClick={() => {
                                                    setGeneralError(false);
                                                    setNoImageError(false);
                                                }}
                                            >
                                                choose a different image
                                            </div>
                                        </Fragment>
                                    )}
                                    <input
                                        onChange={createPreviewSelectedImage}
                                        type="file"
                                        name="file"
                                        accept="image/*"
                                        id="file"
                                        hidden="hidden"
                                    />
                                    <div className={style.LogoPreview}></div>
                                </div>
                                {noImageError ? (
                                    <Error>
                                        You have to upload an image for the project
                                    </Error>
                                ) : null}
                            </label>

                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    ref={register}
                                    onClick={() => setInvalidPasswordError(false)}
                                />
                                {invalidPasswordError && (
                                    <div className={style.Error}>
                                        Invalid password
                                    </div>
                                )}
                            </label>

                            <div className={style.CreateButton}>
                                <input type="submit" value="create" />
                            </div>
                        </div>
                    </form>
                </Fragment>
            )}
        </div>
    );
};

export default CreateProject;
/*
 *
 *
 *
 *
 *
 *
 * helper functions & data
 *
 */
function filterTrueTechStackLabels(obj) {
    return Object.entries(obj)
        .map((item) => (item[1] ? item[0] : null))
        .filter((item) => item != null);
}
function checkValidURL(url) {
    const regEx = /(^http[s]?:\/{2})|(^www)|(^\/{1,2})/;
    return url && url !== "" ? (regEx.test(url) ? true : false) : false;
}
function prependHTTP(url) {
    const fullURL =
        url.startsWith("http") || url.startsWith("http") ? url : "https://" + url;
    return fullURL;
}
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
    "techStack.postgreSQL",
    "techStack.DynamoDB",
    "techStack.AWS S3",
    "techStack.AWS SES",
    "techStack.serverless",
    "techStack.socketio",
    "techStack.GraphQL",
    "techStack.chartJS",
    "techStack.JSON schema",
];
