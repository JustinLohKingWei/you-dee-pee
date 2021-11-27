# httpfs
A simple file server and my first python app

# Project Usage
1. Clone the repo
2. Install the application with $ pip install -e.
3. Spin up the server with command httpfs -p portNumber -d someDirectory

# Uninstallation
1. The project can be removed with $ pip uninstall -e.

# Test Commands
1. curl localhost:8080
2. telnet localhost 5050
3. curl -v http://localhost:5050/testWrite.txt
4. curl --header "Content-Type: application/json" -d "{\"value\":\"node JS\"}" http://localhost:5050/testWrite.txt
