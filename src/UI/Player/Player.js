// Style
import style from "./Player.module.scss";

// React
import React, { useState, useEffect, useRef } from "react";

// Font Icons
import { MdVolumeUp } from "react-icons/md";

const Player = ({ src, darkMode }) => {
    const [play, setPlay] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef && audioRef.current) {
            if (play) audioRef.current.play();
            else audioRef.current.pause();
        }
    }, [play]);

    const togglePlay = () => setPlay((prev) => !prev);
    const setPlayFalse = () => setPlay(false);

    return (
        <div
            className={`${style.PlayerWrapper} ${darkMode ? style.DarkMode : ""} ${
                play ? style.Playing : ""
            }`}
        >
            <audio
                className={style.Audio}
                src={src}
                ref={audioRef}
                onEnded={setPlayFalse}
            ></audio>
            <div onClick={togglePlay}>
                <MdVolumeUp />
            </div>
        </div>
    );
};

export default Player;
