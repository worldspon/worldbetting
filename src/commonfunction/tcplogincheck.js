import {
    encodeUTF8,
    encodeUTF16
} from '../config/byteparser';

export default function tcpLoginCheck(webSocket) {
    const command = encodeUTF8('1000020');
    const content = encodeUTF16(`${sessionStorage.getItem('uniqueId')}|${sessionStorage.getItem('userId')}|`);
    const endSignal = encodeUTF8('<End>');
    const sendData = command.concat(content).concat(endSignal);
    webSocket.emit('tcpsend', sendData);
}