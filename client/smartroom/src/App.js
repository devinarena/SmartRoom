import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import CommandExecutor from './components/CommandExecutor';
import MachineInfo from './components/MachineInfo';
import WebcamView from './components/WebcamView';
import ConnectDialog from './ConnectDialog';

const App = () => {

  const [socketIO, setSocketIO] = useState();
  const [host, setHost] = useState("");

  /**
   * Connects the SmartRoom server on the given IP and port.
   * 
   * @param {String} ip the ip to connect to
   * @param {Integer} port the port to use
   */
  const connect = (ip, port) => {
    setHost(`http://${ip}:${port}`);
  }

  useEffect(() => {
    if (host.length === 0 || socketIO)
      return;

    const socket = io(host);

    setSocketIO(socket);
  }, [host, socketIO]);

  /**
   * If the user is not currently connected, display a connection dialog.
   */
  if (!socketIO) {
    return (
      <div className="App">
        <ConnectDialog connect={connect} />
      </div>
    );
  }

  /**
   * Otherwise show the standard control panel.
   */
  return (
    <div className="App">
      <div className="section MachineInfoSection">
        <MachineInfo socket={socketIO} />
        <CommandExecutor socket={socketIO} />
      </div>
      <div className="section">
        <WebcamView socket={socketIO} />
      </div>
      <div className="section">
      </div>
    </div>
  );
}

export default App;