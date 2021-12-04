#!/usr/bin/env node

"use strict";

import {
  toPacket,
  parsePacket,
  sendGetRequest,
  sendPostRequest,
} from "./byteBuffer.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const yargs = require("yargs");

const url = require("url");

//udp stuff
const udp = require("dgram");

yargs.command(
  "help",
  "prints this screen",
  (yargs) => {},
  function handler(argv) {
    console.log("Welcome to Help");
  }
);

// GET UPD function
yargs.command(
  "udp_Get [url]",
  "Sends a Get request to a server across a Router",
  (yargs) => {},
  function handler(argv) {
    console.log("Welcome to GET Function!");

    // creating a client socket
    var client = udp.createSocket("udp4");
    // client socket bind
    client.bind(5050);

    // creating the http request
    const myUrl = url.parse(argv.url);

    // MAKING HANDSHAKE PACKET TO SEND

    var handshakeComplete = false;
    var p1 = toPacket("SYN", "1", "127.0.0.1", "8080", "Hi S");
    var p3 = toPacket(
      "ACK",
      "3",
      "127.0.0.1",
      "8080",
      "CONNECTION ESTABLISHED"
    );

    client.on("message", function (msg, info) {
      var response = parsePacket(msg, info);
      if (response.packetType == "SYN-ACK") {
        client.send(p3, 3001, "localhost", function (error) {
          if (error) {
            client.close();
          } else {
            console.log("P3 sent !!!");
          }
        });
        handshakeComplete = true;
      } else if (response.packetType == "data") {
        console.log("Data Recieved");
      }
    });

    client.send(p1, 3001, "localhost", function (error) {
      if (error) {
        client.close();
      } else {
        console.log("P1 sent !!!");
      }
    });

    function checkHandShake(handShake) {
      if (handShake === false) {
        setTimeout(checkHandShake, 100);
      } else {
        sendGetRequest(client, myUrl);
      }
    }
    checkHandShake(handshakeComplete);
  }
);

// POST UDP function
yargs
  .command(
    "udp_Post [url]",
    "Sends a Get request to a server across a Router",
    (yargs) => {},
    function handler(argv) {
      console.log("Welcome to GET Function!");

      // creating a client socket
      var client = udp.createSocket("udp4");
      // client socket bind
      client.bind(5050);

      // creating the http request
      const myUrl = url.parse(argv.url);

      // MAKING HANDSHAKE PACKET TO SEND

      var handshakeComplete = false;
      var p1 = toPacket("SYN", "1", "127.0.0.1", "8080", "Hi S");
      var p3 = toPacket(
        "ACK",
        "3",
        "127.0.0.1",
        "8080",
        "CONNECTION ESTABLISHED"
      );

      client.on("message", function (msg, info) {
        var response = parsePacket(msg, info);
        if (response.packetType == "SYN-ACK") {
          client.send(p3, 3001, "localhost", function (error) {
            if (error) {
              client.close();
            } else {
              console.log("P3 sent !!!");
            }
          });
          handshakeComplete = true;
        } else if (response.packetType == "data") {
          console.log("Data Recieved");
        }
      });

      client.send(p1, 3001, "localhost", function (error) {
        if (error) {
          client.close();
        } else {
          console.log("P1 sent !!!");
        }
      });

      function checkHandShake(handShake) {
        if (handShake === false) {
          setTimeout(checkHandShake, 100);
        } else {
          sendPostRequest(client, myUrl, argv);
        }
      }
      checkHandShake(handshakeComplete);
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description:
      "Prints the detail of the response such as protocol, status, and headers",
    default: false,
  })
  .option("header", {
    alias: "h",
    type: "string",
    description: "Associates headers to HTTP Request with the format",
    default: null,
  })
  .option("inline-data", {
    alias: "d",
    type: "string",
    description: "Associates an inline data to the body HTTP POST request.",
    default: '{"Name": Justin Loh King Wei}',
  })
  .option("the-file", {
    alias: "f",
    type: "file",
    description:
      "Associates the content of a file to the body HTTP POST request",
    default: null,
  });
yargs.argv;
