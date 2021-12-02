def checkPayload(payload):
    pass

def handleRequest(payload):
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
        handleGetRequest()
    elif(request_type=="POST"):
        handlePostRequest()


def handleGetRequest(request):
    print("Received GET request")
    pass

def handlePostRequest(request):
    print("Received POST request")
    pass