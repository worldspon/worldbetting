import {
    encodeUTF8,
    encodeUTF16
} from '../config/byteparser';

// 게임 시간을 불러오는 함수
export default function requestGameBetting(webSocket, uniqueId, gameType, bettingType, bettingMoney) {
    const command = encodeUTF8('1170000');
    const content = encodeUTF16(uniqueId + `|${gameType}|${bettingType}|${bettingMoney}|`);
    const endSignal = encodeUTF8('<End>');
    const sendData = command.concat(content).concat(endSignal);

    webSocket.emit('tcpsend', sendData);
}