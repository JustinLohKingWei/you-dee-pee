
import socket
from .byteParsing import parseBytes

def udp_Server(portInput,directoryInput):
    IP = "127.0.0.1"
    bufferSize  = 1024

    UDPServerSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    UDPServerSocket.bind((IP,portInput))

    print(f"server starting at port {portInput} , using directory {directoryInput}")

    while(True):
        bytesAddressPair = UDPServerSocket.recvfrom(bufferSize)

        bytesAddressPair = UDPServerSocket.recvfrom(bufferSize)

        message = bytesAddressPair[0]

        address = bytesAddressPair[1]

        clientMsg = "Message from Client:{}".format(message)
        clientIP  = "Client IP Address:{}".format(address)
    
        print(clientMsg)
        print(clientIP)

        for x in range(15):
            translatedMessage = message[x]
            print(translatedMessage)

        parseBytes(message,address)

        