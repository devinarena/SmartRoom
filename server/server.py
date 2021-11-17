from time import time
from flask import Flask
from flask_socketio import SocketIO
import threading
import time_manager
import os
import subprocess

app = Flask(__name__)
app.config["SECRET_KEY"] = "awdasd4w564as56d4w564"

sio = SocketIO(app, async_mode="threading", cors_allowed_origins="*")

HOST = "0.0.0.0"

def main() -> None:
    app.debug = True
    app.host = HOST

    time_mgr = time_manager.TimeManager(sio)    

    time_thread = threading.Thread(target=time_mgr.update_times)
    time_thread.daemon = True
    time_thread.start()

    sio.run(app, host=HOST, port=5000)


@sio.on("executeCommand")
def on_command(cmd):
    result = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE)
    sio.emit("commandOutput", result.stdout.decode("utf-8"))

if __name__ == "__main__":
    main()
