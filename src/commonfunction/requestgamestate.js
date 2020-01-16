import {
    encodeUTF8,
    encodeUTF16
} from '../config/byteparser';

// 게임회차를 불러오는 함수
export default function requestGameState(webSocket, uniqueId) {
    const command = encodeUTF8('1002000');
    const content = encodeUTF16(`${uniqueId}|`);
    const endSignal = encodeUTF8('<End>');
    const sendData = command.concat(content).concat(endSignal);
    webSocket.emit('tcpsend', sendData);
}