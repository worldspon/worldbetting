import {
    encodeUTF8,
    encodeUTF16
} from '../config/byteparser';

export default function setUserState(webSocket, uniqueId, gameType) {
    const command = encodeUTF8('1003000');
    const content = encodeUTF16(`${uniqueId}|${gameType}|`);
    const endSignal = encodeUTF8('<End>');
    const sendData = command.concat(content).concat(endSignal);

    webSocket.emit('tcpsend', sendData);
}