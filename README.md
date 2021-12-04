# you-dee-pee
This Project Comprises of 3 Components used to simulate a UDP connection 
1. A Router Application (Not my creation), runs on port 3001 on localhost
2. A Server Application with POST/GET requests handling , runs on port 8080 on local host
3. A Client Application to send POST , GET requests to the server, runs on port 5050 on local host

# Router installation
1. Have golang installed
2. cd into the source folder
3. run build router.go
4. run `/.router` to spin up the router

# Server installation 
1. Have python 2 and above installed
2. run `$ pip install -e.`
3. run `$ udp_httpfs --help` to verify application was installed
# Client installation
1. Clone the repo, make sure you have node js installed
2. Change Directories into the udp_httpc folder
3. Run the command in the terminal `sudo npm install -g`
4. Check if the Client Application is install via `udp_httpc --help`

# USAGE
1. Spin up the router by cd-ing into the Router source folder and running `./router`
2. Spin up the server with default values by cd-ing into the Server folder and running `$ udp_httpfs -p -d`
3. Use the command `$ udp_httpfs -p -d to test a GET request`
4. Use the command `$ udp_httpc udp_Get 'http://127.0.0.1:8080//get?foo.txt' `to test a queried GET request
5. Use the command `$ udp_httpc udp_Post -h "Content-Type: text/html" --d 'A Post Request' 'http://127.0.0.1:8080/foo.txt' to test a POST request`
 