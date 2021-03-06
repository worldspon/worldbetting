import io from "../../node_modules/socket.io-client/dist/socket.io";
import getUUIDFromCookie from "../config/getcookie";

function getConnectURL() {
  const url = location.href;

  if (url.includes("wbet")) {
    return "wbet2020.com";
  } else if (url.includes("betsamples")) {
    return "betsamples.com";
  } else if (url.includes("p20")) {
    return "p20ball.com";
  } else if (url.includes("o20")) {
    return "o20ball.com";
  } else if (url.includes("n20")) {
    return "n20ball.com";
  } else if (url.includes("b20")) {
    return "b20ball.com";
  } else if (url.includes("wbc20.com")) {
    return "wbc20.com";
  } else if (url.includes("wbc20.net")) {
    return "wbc20.net";
  }
}

// 운영용
const webSocketIp = `ws://${getConnectURL()}:80/`;
// 로컬 작업용
// const webSocketIp = "ws://192.168.0.24:8803/";

export default function createWebSocket() {
  const webSocket = io(`${webSocketIp}${getUUIDFromCookie()}`);
  return webSocket;
}
