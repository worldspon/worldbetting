import {
    encodeUTF8,
    encodeUTF16
} from '../config/byteparser';

// 게임 시간을 불러오는 함수
export default function requestCancelBetting(webSocket, uniqueId, gameType, gameCount, e) {
    if(gameCount <= 30) {
        alert('취소 불가능 시간입니다.');
        return;
    }
    if(!confirm('정말로 취소하시겠습니까?')) return;
    const command = encodeUTF8('1172000');
    const content = encodeUTF16(`${uniqueId}|${gameType}|${parseFloat(e.target.dataset.unique)}|`);
    const endSignal = encodeUTF8('<End>');
    const sendData = command.concat(content).concat(endSignal);

    webSocket.emit('tcpsend', sendData);
}