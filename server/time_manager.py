
# File   : time_manager.py
# Author : Devin Arena
# Purpose: Handles time management, updates server uptime, calculates machine uptime, etc.
# Date   : 11/16/2021

import time
import datetime
import ctypes

class TimeManager:

    def __init__(self, socketio) -> None:
        self.socketio = socketio
        self.start = time.time()

        self.lib = ctypes.windll.kernel32

    ##
    # Sends updated times over socketio to the client.
    #
    def update_times(self) -> None:
        while True:
            self.socketio.emit("timechange", {
                "machine_time": str(datetime.datetime.now()),
                "server_uptime": self.get_server_uptime(),
                "machine_uptime": self.get_host_uptime()
            })
            self.socketio.sleep(1)

    ##
    # Gets the server uptime, time since server began running.
    # 
    # returns - the server uptime as a string in the format Hh Mm Ss
    #
    def get_server_uptime(self) -> str:
        elapsed = int(time.time() - self.start)
        minutes, seconds = divmod(elapsed, 60)
        hours, minutes = divmod(minutes, 60)

        return f"{hours}h {minutes}m {seconds}s"

    ##
    # Gets the host uptime, time since host machine began running.
    # 
    # returns - the host machine uptime as a string in the format Hh Mm Ss
    #
    def get_host_uptime(self) -> str:
        elapsed = int(self.lib.GetTickCount64() // 1000)
        minutes, seconds = divmod(elapsed, 60)
        hours, minutes = divmod(minutes, 60)

        return f"{hours}h {minutes}m {seconds}s"