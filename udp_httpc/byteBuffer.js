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
  var  addr = parseInt(addrArray[i]);
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

  return bytes;
}

console.log(toPacket('data','1','192.168.2.3','8007',"Hi S"));
