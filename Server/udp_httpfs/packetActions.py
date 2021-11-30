import math

# Function to Parse incoming packets
def parsePacket(bytesInput, addressInput):

    # Determine Packet Type
    packetType = ""

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
    for x in range(payLoadByteStart, len(bytesInput)):
        # print(f"Payload at bit {x} is {bytesInput[x]}")
        payLoadArr.append(bytesInput[x])
    payLoad = ''.join(chr(i) for i in payLoadArr)

    # Print Contents of Packet
    print("==========PACKET CONTENTS===========")
    print(f"Data type is {packetType}")
    print(f"Sequence Number is {sequenceNo}")
    print(f"Client IP is {clientIP}")
    print(f"Client Port is {clientPort}")
    print(f"Payload is {payLoad}")


# function to construct outgoing packets
def toPacket(type, sequenceNo, addressNo, portNo, stringInput):
    # define type bytes of packet
    bytes = []
    if type == "data":
        bytes.append(0)
    elif type == "ACK":
        bytes.append(0)
    elif type == "SYN":
        bytes.append(0)
    elif type == "SYN-ACK":
        bytes.append(0)

    # define sequence bytes of packet
    sequenceNoStr = str(sequenceNo.zfill(4))
    for x in range(len(sequenceNoStr)):
        bytes.append(int(str(sequenceNoStr[x])))

    # define address bytes of packet
    addrArr = addressNo.split(".")
    for x in range(len(addrArr)):
        bytes.append(int(addrArr[x]))
    
    # define portBytes of packet
    port1 = math.floor(portNo/256)
    bytes.append(port1)
    port2 = portNo%256
    bytes.append(port2)

    # define payload bytes of packet
    for x in range(len(stringInput)):
        bytes.append(ord(stringInput[x]))

    bytesArr = bytearray(bytes)

    return bytesArr