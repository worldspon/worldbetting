import {
    encodeUTF8,
    encodeUTF16
} from '../config/byteparser';

// 게임환경세팅 정보를 호출하는 함수
// 게임순서 : 파워볼 / 5분 / 3분 / 낙하 / 격파 / 가위바위보
// 베팅시작시간[1],끝시간[1] x6 / [12]벨런스[1] x6 / [60]파워볼조합 사용여부[1] x4 / 베팅취소 사용여부
export default function requestGameInfo(webSocket, uniqueId) {
    const command = encodeUTF8('1005000');
    const content = encodeUTF16(`${uniqueId}|`);
    const endSignal = encodeUTF8('<End>');
    const sendData = command.concat(content).concat(endSignal);

    webSocket.emit('tcpsend', sendData);
}