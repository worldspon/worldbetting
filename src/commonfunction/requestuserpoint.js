import {
    encodeUTF8,
    encodeUTF16
} from '../config/byteparser';

// 유저 개인 게임환경을 세팅하는 함수
export default function requestUserPoint(webSocket, uniqueId) {
    const command = encodeUTF8('1001000');
    const content = encodeUTF16(`${uniqueId}|`);
    const endSignal = encodeUTF8('<End>');
    const sendData = command.concat(content).concat(endSignal);

    webSocket.emit('tcpsend', sendData);
}