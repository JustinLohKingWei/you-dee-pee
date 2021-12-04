import os
from pathlib import Path

from .packetActions import toPacket

def handleRequest(socket,address,payload,directoryInput):
    headers = payload.split('\r\n', 1)
    request = headers[0].split('HTTP/1.', 1)
    request_type = headers[0].split(' /', 1)
    headers = headers[0]
    request = request[0]
    request_type = request_type[0]
    print ("header is "+headers)
    print("request is "+request)
    print("request type is "+request_type)
    if(request_type=="GET"):
        handleGetRequest(socket,address,request,directoryInput)
    elif(request_type=="POST"):
        body = payload.split('\r\n\r\n', 1)
        body= body[1].strip()
        handlePostRequest(socket,address,request,directoryInput,body)


def handleGetRequest(socket,address,request,directoryInput):
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
    responseToSend = toPacket('data',"4",'127.0.0.1',5050,response)
    socket.sendto(responseToSend , address)

def handlePostRequest(socket,address,request,directoryInput,bodyInput):
    print("Received POST request")
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
            body+="Content appended to end of file.\n"
    else:
        print('File does not exist, creating a file with the specified name')
        body+="New dile created.\n"
    f = open(test_Path, "a+")
    f.write(bodyInput)
    f.close()   

    response = "HTTP/1.1 "+code+"\n"+"Content-Type: text/html\n"+"\n"
    response += body+"\n"
    responseToSend = toPacket('data',"4",'127.0.0.1',5050,response)
    socket.sendto(responseToSend , address)