// Style
import style from "./PasswordModalForm.module.scss";

// React
import React, { useState } from "react";

// Components
import Error from "../../../UI/Error";
import Checkmark from "../../../UI/Checkmark/Checkmark";
import LoadingSpinner from "../../../UI/LoadingSpinner";

// others
import API_URL from "../../../util/secrets";
import axios from "axios";

const PasswordModalForm = ({
    selectedProjectId,
    selectedProjectTitle,
    togglePasswordModal,
    removeProjectFromFrontend,
}) => {
    // state
    const [password, setPassword] = useState("");
    const [loadingData, setLoadingData] = useState(false);
    const [checkmark, setCheckmark] = useState(false);

    // errors
    const [invalidPasswordError, setInvalidPasswordError] = useState(false);

    const handleSubmit = async () => {
        setLoadingData(true);

        if (password.trim() === "") {
            removeProjectFromFrontend(selectedProjectId);

            setTimeout(() => {
                setTimeout(() => {
                    togglePasswordModal();
                }, 1000);
                setLoadingData(false);
                setCheckmark(true);
            }, 500);
        }
        /*  try {
            const res = await axios.delete(
                `${API_URL}/project/:${selectedProjectId}`,
                password,
                {
                    validateStatus: function (status) {
                        return status;
                    },
                }
            );
            if (res.status === 401) {
                setInvalidPasswordError(true);
            } else if (res.status === 200) {
                // remove project on frontend
                setTimeout(() => {
                    setTimeout(() => {
                        togglePasswordModal();
                    }, 1000);
                    // setLoadingData(false);
                    // setCheckmark(true);
                }, 500);
            }
        } catch (err) {
            console.log(err);
        } */
    };

    // const onChangeHandler = (e) => {
    //     setPassword(e.currentTarget.value);
    // };

    return (
        <div className={style.PasswordModal}>
            {loadingData && !checkmark ? (
                <div className={style.LoadingSpinnerContainer}>
                    <LoadingSpinner size={50} color={"#fc7284"} />
                </div>
            ) : !loadingData && checkmark ? (
                <div className={style.CheckmarkContainer}>
                    <Checkmark color={"#fc7284"} />
                    {/* TODO: useRef hook to get the previous value of the selected project title
                            <p>{selectedProjectTitle} has been deleted.</p>
                        
                        */}
                    <p>The project has been deleted.</p>
                </div>
            ) : null}
            <h1>Do you really want to delete {selectedProjectTitle}?</h1>
            <h2>
                If no password is entered, the project will be deleted on the client
                side only. An incorrect password will throw an error.
            </h2>
            <label htmlFor="password">
                Password
                {invalidPasswordError && <Error>Invalid password</Error>}
                <input
                    type="password"
                    name="password"
                    // onClick={setInvalidPasswordError(false)}
                    // onChange={() => onChangeHandler()}
                />
            </label>
            <button className={style.DeleteProject} onClick={handleSubmit}>
                delete project
            </button>
        </div>
    );
};

export default PasswordModalForm;
