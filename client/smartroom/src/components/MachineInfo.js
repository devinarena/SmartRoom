import { useState } from 'react';
import './MachineInfo.css';

/**
 * File   : MachineInfo.js
 * Author : Devin Arena
 * Purpose: Displays information about the machine delivered by the socket.
 * Date   : 11/16/2021
 */

/**
 * MachineInfo widget, displays info about host machine.
 * 
 * @param {Object[]} props should contain the socket for retrieving machine data. 
 */
const MachineInfo = (props) => {

    const [time, setTime] = useState("");
    const [serverUptime, setServerUptime] = useState("");
    const [machineUptime, setMachineUptime] = useState("");

    /**
     * Update times when we receive a time change from the server.
     */
    props.socket.on("timechange", timeData => {
        setTime(timeData["machine_time"]);
        setServerUptime(timeData["server_uptime"]);
        setMachineUptime(timeData["machine_uptime"]);
    });

    return (
        <div className="MachineInfo">
            <h1>Machine Information</h1>
            <div className="MachineInfoItem">
                <span style={{ "fontWeight": "bold" }}>
                    <p>Host Time: </p>
                </span>
                <p>{time.split(".")[0]}</p>
            </div>
            <div className="MachineInfoItem">
                <span style={{ "fontWeight": "bold" }}>
                    <p>Uptime (server): </p>
                </span>
                <p>{serverUptime}</p>
            </div>
            <div className="MachineInfoItem">
                <span style={{ "fontWeight": "bold" }}>
                    <p>Uptime (machine): </p>
                </span>
                <p>{machineUptime}</p>
            </div>
        </div>
    );
}

export default MachineInfo;