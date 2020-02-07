import { encodeUTF8, encodeUTF16 } from "../config/byteparser";

/**
 * 현재 내 레벨 요청하기
 * @author Johnny
 * @param webSocket 웹 소켓 객체
 * @param uniqueId 사용자 고유 번호
 */
export default function requestLevelCheck(webSocket, uniqueId) {
  if (uniqueId && uniqueId > 0) {
    const command = encodeUTF8("1000300");
    const content = encodeUTF16(`${uniqueId}|`);
    const endSignal = encodeUTF8("<End>");
    const sendData = command.concat(content).concat(endSignal);

    webSocket.emit("tcpsend", sendData);
  }
}
