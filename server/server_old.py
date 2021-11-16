import socket

HOST = "127.0.0.1"
PORT = 30241


def main() -> None:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind((HOST, PORT))
        sock.listen()
        while True:
            conn, addr = sock.accept()
            with conn:
                print(f"Connection from {addr}")
                while True:
                    conn.sendall(b"python server!")
                # while True:
                #     cmd = conn.recv(1024).decode("utf-8")
                #     if not cmd:
                #         break
                #     print(f"Received command: {cmd}")
                #     if cmd == "help":
                #         conn.sendall(b"Current commands:\n" 
                #             b"time - gives the local machine's time\n"
                #             b"terminate - terminates the server, closes all connections")
                #     else:
                #         conn.sendall(b"Unknown command, try 'help' for help.")

if __name__ == "__main__":
    main()
