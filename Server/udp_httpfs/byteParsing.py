from typing import Sequence


def parseBytes(bytesInput,addressInput):

    # Determine Packet Type
    packetType=""

    if bytesInput[0] == 0:
        packetType = "data"
    elif bytesInput[0] == 1:
        packetType = "ACK"
    elif bytesInput[0] == 2:
        packetType = "SYN"
    elif bytesInput[0] == 3:
        packetType = "SYN-ACK"

    # Determine Sequence Number
    sqBit3 = bytesInput[1]*1000
    sqBit2 = bytesInput[2]*100
    sqBit1 = bytesInput[3]*10
    sqBit0 = bytesInput[4]*1

    sequenceNo = sqBit0+sqBit1+sqBit2+sqBit3

    # Determine Client IP and Port
    clientIP = addressInput[0]
    clientPort = addressInput[1]

    # Determine Payload
    payLoadByteStart = 11
    payLoadArr = []
    for x in range(payLoadByteStart,len(bytesInput)):
        # print(f"Payload at bit {x} is {bytesInput[x]}")
        payLoadArr.append(bytesInput[x])
    payLoad = ''.join(chr(i) for i in payLoadArr)
    
    #Print Contents of Packet
    print("==========PACKET CONTENTS===========")
    print(f"Data type is {packetType}")
    print(f"Sequence Number is {sequenceNo}")
    print(f"Client IP is {clientIP}")
    print(f"Client Port is {clientPort}")
    print(f"Payload is {payLoad}")