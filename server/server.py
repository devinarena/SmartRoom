from time import time
from flask import Flask
from flask_socketio import SocketIO
import threading
import time_manager
import webcam_manager
import subprocess

app = Flask(__name__)
app.config["SECRET_KEY"] = "dkfnen4568asd1ot56urew3pqnc712"

sio = SocketIO(app, async_mode="threading", cors_allowed_origins="*", )

HOST = "0.0.0.0"

def main() -> None:
    app.host = HOST

    time_mgr = time_manager.TimeManager(sio)
    sio.start_background_task(target=time_mgr.update_times)

    webcam_mgr = webcam_manager.WebcamManager(sio)
    sio.start_background_task(target=webcam_mgr.update_webcam)

    sio.run(app, host=HOST, port=5000)

@sio.on("executeCommand")
def on_command(cmd):
    result = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE)
    sio.emit("commandOutput", result.stdout.decode("utf-8"))

if __name__ == "__main__":
    main()
