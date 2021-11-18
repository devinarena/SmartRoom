import socketio

sio = socketio.Client()

@sio.event
def connect():
    print('connection established')

@sio.event
def disconnect():
    print('disconnected from server')

@sio.on("timechange")
def change(time):
    print(time)

def main():
    sio.connect('http://127.0.0.1:5000')

if __name__ == '__main__':
    main()