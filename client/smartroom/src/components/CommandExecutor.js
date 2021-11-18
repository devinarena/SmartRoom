
import { useEffect, useState } from 'react'
import './CommandExecutor.css'

/**
 * File   : CommandExecutor.js
 * Author : Devin Arena
 * Purpose: User can enter commands to be run on the host machine.
 * Date   : 11/17/2021
 */

/**
 * CommandExecutor widget, allows user to enter commands.
 * 
 * @param {Object[]} props should contain the socket for sending commands. 
 */
const CommandExecutor = (props) => {

    const [commandHistory, setCommandHistory] = useState("");
    const [command, setCommand] = useState("");

    /**
     * When send button is pressed, send the entered command through the socket.
     */
    const sendCommand = e => {
        e.preventDefault();
        
        props.socket.emit("executeCommand", command);
        setCommandHistory(commandHistory + command + " >> ");
    }

    /**
     * On command output, append the result to the command history.
     */
    useEffect(() => {
        props.socket.on("commandOutput", output => {
            setCommandHistory(commandHistory + output + "\n");
        });
    }, [props.socket, commandHistory]);

    return (
        <div className="CommandExecutor">
            <h1>Command Executor</h1>
            <form onSubmit={sendCommand}>
                <textarea readOnly={true} rows={10} placeholder="Command History" value={commandHistory} />
                <div className="send-row">
                    <input type="text" value={command}
                        placeholder="Enter a command here" onChange={e => setCommand(e.target.value)} />
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
}

export default CommandExecutor;