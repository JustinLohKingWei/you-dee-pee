import argparse
from .printDebug import printDebug
from .server import server

def main():
    parser=argparse.ArgumentParser(description='httpfs is a simple file server')
    parser.add_argument('-v', action="store_true", help="prints debug messages")
    parser.add_argument('-p', action="store", help="specifies the port number the server will listen and serve at.\n\ndefault is 8080.",type=int, nargs="?", const=8080)
    parser.add_argument('-d', action="store", help="Specifies the directory that the server will use to read/write requested files. Default is the current directory when launching the application.", nargs="?", const="data")
    args = parser.parse_args()
    if args.v:
        printDebug()
    server(args.p,args.d)


if __name__ == '__main__':
    main()