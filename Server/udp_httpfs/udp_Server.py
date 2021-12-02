
import socket
from .packetActions import parsePacket, toPacket

def udp_Server(portInput,directoryInput):
    IP = "127.0.0.1"
    bufferSize  = 1024

    UDPServerSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    UDPServerSocket.bind((IP,portInput))

    print(f"server starting and listening at port {portInput} , using directory {directoryInput}")

    while(True):
        bytesAddressPair = UDPServerSocket.recvfrom(bufferSize)

        print(bytesAddressPair)

        message = bytesAddressPair[0]

        address = bytesAddressPair[1]

        clientMsg = "Message from Client:{}".format(message)
        clientIP  = "Client IP Address:{}".format(address)
    
        print(clientMsg)
        print(clientIP)

        resultingPacket = parsePacket(message,address)
        p2 = toPacket('SYN-ACK',"1",'127.0.0.1',5050,"Hi")

        if(resultingPacket.packetType=="SYN") :
            print('sending a response to SYN')
            UDPServerSocket.sendto(p2, address)

        # bytesToSend = toPacket('data',"1",'127.0.0.1',5050,"Hi")
      

        # UDPServerSocket.sendto(bytesToSend, address)

        