import {
    encodeUTF8,
    encodeUTF16
} from '../config/byteparser';

// 게임 시간을 불러오는 함수
export default function responseBettingResultCount(webSocket, uniqueId, gameType) {
    const command = encodeUTF8('1173010');
    const content = encodeUTF16(`${uniqueId}|${gameType}|`);
    const endSignal = encodeUTF8('<End>');
    const sendData = command.concat(content).concat(endSignal);

    webSocket.emit('tcpsend', sendData);
}