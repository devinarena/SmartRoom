import { useState } from 'react';
import './ConnectDialog.css'

/**
 * User must enter an IP and port to connect to for their smart room.
 * 
 * @returns JSX for the connect dialog
 */
const ConnectDialog = (props) => {

  const [ip, setIP] = useState("127.0.0.1");
  const [port, setPort] = useState(5000);

  /**
   * Attempts to connect to the entered IP and port using socketio.
   * 
   * @param e the event to prevent the form from submitting
   */
  const connect = (e) => {
    e.preventDefault();

    props.connect(ip, port);
  }

  return (
    <div className="ConnectDialog">
      <form onSubmit={connect}>
        <label>IP Address:&nbsp;
          <input type="text" value={ip} onChange={e => setIP(e.target.value)}></input>
        </label>
        <label>Port:&nbsp;
          <input type="number" value={port} onChange={e => setPort(e.target.value)}></input>
        </label>
        <button type="submit">Connect</button>
      </form>
    </div>
  );
}

export default ConnectDialog;