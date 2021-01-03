// Style
import style from "./PasswordModalForm.module.scss";

// React
import React, { useState } from "react";

// Components
import Error from "../../../UI/Error";

// others
import API_URL from "../../../util/secrets";
import axios from "axios";

const PasswordModalForm = ({ selectedProjectId, togglePasswordModal }) => {
    const [invalidPasswordError, setInvalidPasswordError] = useState(false);
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
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
                        console.log("\n\n______CLOSE MODAL____\n");
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
                    onClick={setInvalidPasswordError(false)}
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
