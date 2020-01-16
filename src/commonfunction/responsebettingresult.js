import {
    encodeUTF8,
    encodeUTF16
} from '../config/byteparser';

// 게임 시간을 불러오는 함수
export default function responseBettingResult(webSocket, uniqueId, gameType, page) {
    const command = encodeUTF8('1173000');
    const content = encodeUTF16(`${uniqueId}|${gameType}|${page}|`);
    const endSignal = encodeUTF8('<End>');
    const sendData = command.concat(content).concat(endSignal);

    webSocket.emit('tcpsend', sendData);
}