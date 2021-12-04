export function toPacket(type, sequenceNo, addressNo, portNo, str) {
  var bytes = []; // char codes

  // define type bytes of packet
  switch (type) {
    case "data":
      bytes = bytes.concat([0]);
      break;

    case "ACK":
      bytes = bytes.concat([1]);
      break;

    case "SYN":
      bytes = bytes.concat([2]);
      break;
    case "SYN-ACK":
      bytes = bytes.concat([3]);
      break;
  }

  // define sequence bytes of packet
  const zeroPad = (num, places) => String(num).padStart(places, "0"); //function to add leading zeroes
  var sequenceNoStr = zeroPad(sequenceNo, 4);
  for (var i = 0; i < sequenceNoStr.length; ++i) {
    var sq = parseInt(String.fromCharCode(sequenceNoStr.charCodeAt(i)));
    bytes = bytes.concat([sq]);
  }

  // define address bytes of packet
  const addrArray = addressNo.split(".");
  for (var i = 0; i < addrArray.length; ++i) {
    var addr = parseInt(addrArray[i]);
    bytes = bytes.concat([addr]);
  }

  //define port bytes of packet
  var port1 = Math.floor(portNo / 256);
  bytes = bytes.concat([port1]);
  var port2 = portNo % 256;
  bytes = bytes.concat([port2]);

  // define payload bytes of packet
  for (var i = 0; i < str.length; ++i) {
    var code = str.charCodeAt(i);
    bytes = bytes.concat([code]);
  }

  // put into typed array to be sent
  var byteArr = new Uint8Array(bytes.length);
  for (var i = 0; i < bytes.length; ++i) {
    byteArr[i] = bytes[i];
  }

  return byteArr;
}

// Function to parse incoming packets
export function parsePacket(bytesInput, addressInput) {
  // for (var i =0 ; i<bytesInput.length;++i){
  //   console.log(bytesInput[i])
  // }

  const ip = addressInput.address;
  const port = addressInput.port;

  var packetType = "";

  switch (bytesInput[0]) {
    case 0:
      packetType = "data";
      break;
    case 1:
      packetType = "ACK";
      break;
    case 2:
      packetType = "SYN";
      break;
    case 3:
      packetType = "SYN-ACK";
      break;
  }

  // Determine Sequnce Number Of Incoming Packet
  const sqBit3 = bytesInput[1] * 1000;
  const sqBit2 = bytesInput[2] * 100;
  const sqBit1 = bytesInput[3] * 10;
  const sqBit0 = bytesInput[4] * 1;

  const sequenceNo = sqBit0 + sqBit1 + sqBit2 + sqBit3;

  // Determine Payload
  const payLoadByteStart = 11;
  var payLoadArr = [];
  for (var i = payLoadByteStart; i < bytesInput.length; ++i) {
    payLoadArr.push(String.fromCharCode(bytesInput[i]));
  }
  const payLoad = payLoadArr.join("");

  // Print data of recieved Packet
  console.log(`Packet type is ${packetType}`);
  console.log(`Sequence Number is ${sequenceNo}`);
  console.log(`Address is ${ip}`);
  console.log(`Port is ${port}`);
  console.log(`Payload is ${payLoad}`);

  var packet = {
    packetType: packetType,
    sequenceNo: sequenceNo,
    ip: ip,
    port: port,
    payLoad: payLoad,
  };

  return packet;
}

// sendGetRequest

export function sendGetRequest(client, myUrl) {
  console.log("SENDING GET REQUEST")
  let requestToSend = ""
  if(myUrl.query!=null){
  requestToSend =
    `GET /${myUrl.query} HTTP/1.1\n` + `Host: ${myUrl.hostname}\n\n`;
  }
  else{
    requestToSend =
    `GET / HTTP/1.1\n` + `Host: ${myUrl.hostname}\n\n`;
  }
  console.log(requestToSend);
  var data = toPacket("data", "1", myUrl.hostname, myUrl.port, requestToSend);
  client.send(data, 3001, "localhost", function (error) {
    if (error) {
      client.close();
    } else {
      console.log("Get Request sent !!!");
    }
  });
}

// sendPostRequest

export function sendPostRequest(client, myUrl) {
  console.log("SENDING POST REQUEST")
  let requestToSend = ""
  requestToSend =
  `POST ${myUrl.path} HTTP/1.1\n` +
  `Host: ${myUrl.host}\n` +
  `Content-Type: application/json;\n` +
  `Content-Length: ${argv.d.length}` +
  `\r\n\r\n${argv.d}\n\n`;
  console.log(requestToSend);
  var data = toPacket("data", "1", myUrl.hostname, myUrl.port, requestToSend);
  client.send(data, 3001, "localhost", function (error) {
    if (error) {
      client.close();
    } else {
      console.log("POST Request sent !!!");
    }
  });
}