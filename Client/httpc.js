#!/usr/bin/env node

"use strict";

const net = require("net");

const yargs = require("yargs");

const url = require("url");

yargs.command(
  "help",
  "prints this screen",
  (yargs) => {},
  function handler(argv) {
    console.log("Welcome to Help");
  }
);

yargs
  .command(
    "get [url]",
    "Executes a HTTP GET request and posts the response",
    (yargs) => {},
    function handler(argv) {
      // extract this to const for readibilty
      const myUrl = url.parse(argv.url);
      const client = net.connect(80, myUrl.host, function () {
        client.write(
          `GET /get?${myUrl.query} HTTP/1.1\n` + `Host: ${myUrl.host}\n\n`
        );
        console.log("Connected to server!\n");
      });
      client.on("data", function (data) {
        const dataString = data.toString();
        var linebreakpattern = "\r\n\r\n"; // FINE_I"LL_DO_IT_MYSELF.jpg
        var header = dataString.substring(
          0,
          dataString.indexOf(linebreakpattern) + 0
        );
        var body = dataString.substring(
          dataString.indexOf(linebreakpattern) + linebreakpattern.length
        );
        if (argv.v) {
          console.log(header + "\n" + body);
        } else {
          console.log(body);
        }
        client.destroy();
      });
      client.on("end", function () {
        console.log("Disconnected from server");
      });
      client.on("error", function () {
        console.log("Connection error");
      });

      // dont touch from here on
      console.log(`Sending GET request to ${argv.url}`);
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
    default: false,
  })
  .option("header", {
    alias: "h",
    type: "key:value",
    description: "Associates headers to HTTP Request with the format",
    //   default: false,
  });

yargs
  .command(
    "post [url]",
    "Executes a HTTP POST request and posts the response",
    (yargs) => {},
    function handler(argv) {
      // extract this to const for readibilty
      const myUrl = url.parse(argv.url);
      console.log(argv.d);
      const client = net.connect(80, myUrl.host, function () {
        client.write(
          `POST ${myUrl.path} HTTP/1.1\n` + `Host: ${myUrl.host}\n` + `Content-Type: application/json;\n` + `Content-Length: ${argv.d.length}` + `\r\n\r\n${argv.d}\n\n`
        );
        console.log("Connected to server!");
      });
      client.on("data", function (data) {
        const dataString = data.toString();
        var linebreakpattern = "\r\n\r\n"; // FINE_I"LL_DO_IT_MYSELF.jpg
        var header = dataString.substring(
          0,
          dataString.indexOf(linebreakpattern) + 0
        );
        var body = dataString.substring(
          dataString.indexOf(linebreakpattern) + linebreakpattern.length
        );
        if (argv.v) {
          console.log(header + "\n" + body);
        } else {
          console.log(body);
        }
        client.destroy();
      });
      client.on("end", function () {
        console.log("Disconnected from server");
      });
      client.on("error", function () {
        console.log("Connection error");
      });

      // dont touch from here on
      console.log(`Sending POST request to ${argv.url}`);
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

//https://thecodebarbarian.com/building-a-cli-tool-with-node-js.html
//https://blog.bitsrc.io/how-to-build-a-command-line-cli-tool-in-nodejs-b8072b291f81
//https://alanstorm.com/yargs-and-command-line-argument-processing-in-nodejs/
//https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/

// new Promise((resolve, reject) => {
//   let buff = Buffer.of();
//   client.on("data", function (data) {
//     console.log("Received " + data.length + " bytes\n" + data);
//     buff = Buffer.concat(buff, data);
//   });
//   client.on("end", function () {
//     console.log("disconnected from server");
//     //client.end();
//     resolve(buff.toString());
//   });
//   client.on("error", function (e) {
//     console.log("Connection error");
//     // client.end();
//     reject(e);
//   });
// })
//   .then((data) => console.log(`Finished recieving data: ${data}`))
//   .catch((e) => console.log(`An error occured: ${e}`));
//`GET /get?${myUrl.query}} HTTP/1.1\n` + `Host: ${myUrl.host}\n\n`
