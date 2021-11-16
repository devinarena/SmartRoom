import { useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import ConnectDialog from './ConnectDialog';

const App = () => {

  const [socketIO, setSocketIO] = useState();
  const [time, setTime] = useState("");

  const connect = (ip, port) => {
    const socket = io(`http://${ip}:${port}`);

    setSocketIO(socket);
    socket.on("timechange", data => {
      setTime(data);
    });
  }

  return (
    <div className="App">
      {!socketIO && <ConnectDialog connect={connect} /> }
      {socketIO && <h1 style={{color: "#fff"}}>Machine Time: {time.split(".")[0]}</h1>}
    </div>
  );
}

export default App;