
# File   : webcam_manager.py
# Author : Devin Arena
# Purpose: Sends data involving the webcam through socket to the client.
# Date   : 11/17/2021

import cv2
import time
import base64

class WebcamManager:

    def __init__(self, socket) -> None:
        self.socket = socket
    
    def update_webcam(self) -> None:
        while True:
            vc = cv2.VideoCapture(0, cv2.CAP_DSHOW)

            if vc.isOpened():
                rval, frame = vc.read()
            else:
                rval = False

            while rval:
                rval, frame = vc.read()
                res, frame = cv2.imencode(".jpg", frame)
                self.socket.emit("webcamUpdate", base64.b64encode(frame))
                self.socket.sleep(1 / 60)
            
            vc.release()
            print("failed to get webcam, will try again in 30 seconds")
            self.socket.sleep(30)