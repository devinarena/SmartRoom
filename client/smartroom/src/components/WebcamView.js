import './WebcamView.css';

/**
 * File   : WebcamView.js
 * Author : Devin Arena
 * Purpose: Receives image data from the host webcam and displays it.
 * Date   : 11/17/2021
 */

import React, { useEffect, useState } from "react";

/**
 * WebcamView widget, receives image data from the host webcam and displays it.
 * 
 * @param {Object[]} props should contain the socket for getting webcam data.
 */
const WebcamView = (props) => {

    const [webcamData, setWebcamData] = useState("");

    /**
     * When a frame is sent from server, update the webcam datastring (base64)
     * image tag automatically updates when the new base64 string is received.
     */
    useEffect(() => {
        props.socket.on("webcamUpdate", data => {
            setWebcamData(Buffer.from(data, "base64").toString())
        });
    }, [props.socket]);

    return (
        <div className="WebcamView">
            <h1>Live Feed</h1>
            <img src={"data:image/jpg;base64," + webcamData} alt="Webcam not found" />
        </div>
    );
}

export default WebcamView;