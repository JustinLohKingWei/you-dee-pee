import socket
import threading
import os
from pathlib import Path

HEADER = 64
FORMAT = 'utf-8'


def do_Get(connInput, request ,directoryInput):
    files = os.listdir(directoryInput)
    code = "200 OK"
    body = ""
    query = request.split('/', 1)
    query = query[1].strip()
    print(f"QUERY:{query}")
    if query == "":
        for f in files:
            print(f)
            body += f.strip()
            body += "\n"
    else:
        body += "\n"
        test_Path = Path(directoryInput+"/"+query)
        file_Exists = os.path.isfile(test_Path)
        print(f"FILE EXISTS? : {file_Exists}")
        if file_Exists:
            print(f'{query} is found!')
            with open(test_Path) as f:
                lines = f.readlines()
            for l in lines:
                body+=l
        else:
            print('NOT FOUND')
            code = "404 NOT FOUND"
            body+= "Content not available on this server\n"

    response = "HTTP/1.1 "+code+"\n"+"Content-Type: text/html\n"+"\n"
    response += body+"\n"
    connInput.send(response.encode(FORMAT))


def do_Post(connInput, request ,directoryInput,bodyInput):
    code = "200 OK"
    body = ""
    query = request.split('/', 1)
    query = query[1].strip()
    print(f"QUERY:{query}")
    body += "\n"
    test_Path = Path(directoryInput+"/"+query)
    file_Exists = os.path.isfile(test_Path)
    print(f"FILE EXISTS? : {file_Exists}")
    if file_Exists:
            print(f'{query} is found!')
            f = open(test_Path, "a")
            f.write(bodyInput)
            f.close()   
            body+="Content appended to end of file.\n"
    else:
        print('NOT FOUND')
        code = "404 NOT FOUND"
        body+= "Content not available on this server\n"

    response = "HTTP/1.1 "+code+"\n"+"Content-Type: text/html\n"+"\n"
    response += body+"\n"
    connInput.send(response.encode(FORMAT))


def handle_Request(connInput, addrInput ,directoryInput):
    conn = connInput
    addr = addrInput
    print(f'NEW CONNECTION: {addr}connected')
    connected = True
    from_client = ''
    while connected:
        data = conn.recv(4096)
        if not data:
            break
        from_client += data.decode(FORMAT)
        print("FROM CLIENT: \n"+from_client+"\n")
        headers = from_client.split('\r\n', 1)
        request = headers[0].split('HTTP/1.', 1)
        request_type = headers[0].split(' /', 1)
        headers = headers[0]
        request = request[0]
        request_type = request_type[0]
        if directoryInput=="httpfs":
            print("Authorization blocked")
            code = "403 FORBIDDEN\n"
            body = "Request type is not supported at this time"
            response = "HTTP/1.1 "+code+"\n"+"Content-Type: text/html\n"+"\n"
            response += body+"\n\n"
            connInput.send(response.encode(FORMAT))

        elif request_type == 'GET':
            print("Received GET request")
            do_Get(conn, request ,directoryInput)
        elif request_type == 'POST':
            print("Received POST request")
            body = from_client.split('\r\n\r\n', 1)
            body= body[1].strip()
            do_Post(conn, request ,directoryInput,body)
        else:
            print("Request not understood")
            code = "301 BAD REQUEST\n"
            body = "Request type is not supported at this time"
            response = "HTTP/1.1 "+code+"\n"+"Content-Type: text/html\n"+"\n"
            response += body+"\n\n"
            connInput.send(response.encode(FORMAT))
        connected = False

    conn.close()
    print('Connection closed')


def start(serverInput, serveraddr ,directoryInput):
    server = serverInput
    server.listen()
    print(f"Server is listening on {serveraddr}")
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_Request, args=(conn, addr ,directoryInput))
        thread.start()
        print(f"ACTIVE CONNECTIONS : {threading.active_count()-1}")


def server(portInput,directoryInput):
    PORT = portInput
    SERVER = socket.gethostbyname(socket.gethostname())
    ADDR = ('', PORT)
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(ADDR)
    print(f"{SERVER} server starting at port {PORT} ")
    start(server, SERVER ,directoryInput)
