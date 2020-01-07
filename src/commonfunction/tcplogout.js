import {
    encodeUTF8,
    encodeUTF16
} from '../config/byteparser';

export default function tcpLoginCheck(webSocket, uniqueId, trademark) {
    const command = encodeUTF8('1000030');
    const content = encodeUTF16(`${uniqueId}|${trademark}|`);
    const endSignal = encodeUTF8('<End>');
    const sendData = command.concat(content).concat(endSignal);
    webSocket.emit('tcpsend', sendData);
    sessionStorage.clear();
    webSocket.emit('disconnect','로그아웃처리 되었습니다.');
    location.href = '/login';
}