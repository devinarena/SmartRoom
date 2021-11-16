import socket

HOST = "127.0.0.1"
PORT = 30241

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    cmd = None
    while True:
        cmd = input("CMD > ")
        if not cmd:
            break
        s.sendall(cmd.encode("utf-8"))
        data = s.recv(1024)
        print(data.decode("utf-8"))