from flask import Flask
from flask_socketio import SocketIO
import threading
import time
import datetime

app = Flask(__name__)
app.config["SECRET_KEY"] = "awdasd4w564as56d4w564"

sio = SocketIO(app, async_mode="threading", cors_allowed_origins="*")

HOST = "0.0.0.0"

def main() -> None:
    app.debug = True
    app.host = HOST

    thread = threading.Thread(target=update_time)
    thread.daemon = True
    thread.start()

    sio.run(app, host=HOST, port=5000)

@sio.event
def connect(sid) -> None:
    sio.emit("connected", "boogiewoogie")

def update_time():
    while True:
        sio.emit("timechange", str(datetime.datetime.now()))
        time.sleep(1)

if __name__ == "__main__":
    main()
