import "../byteBuffer.js";

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function handshake(client, p1, p3) {
    
  var handShakeComplete = false;
  if (!handShakeComplete) {
    // set timout for first message
    client.send(p1, 3001, "localhost", function (error) {
      if (error) {
        client.close();
      } else {
        console.log("Data sent !!!");
      }
    });
    sleep(50000);

    if (!handShakeComplete) {
      client.send(p1, 3001, "localhost", function (error) {
        if (error) {
          client.close();
        } else {
          console.log("Data sent !!!");
        }
      });
    }

    client.on("message", function (msg, info) {
      var response = parsePacket(msg, info);
      if (response.packetType == "SYN-ACK") {
        console.log("RECEIVED SYN-ACK");
        client.send(p3, 3001, "localhost", function (error) {
          if (error) {
            client.close();
          } else {
            console.log("Data sent !!!");
          }
        });
        handShakeComplete = true;
      }
    });
  }
}
