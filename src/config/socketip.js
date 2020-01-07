import io from '../../node_modules/socket.io-client/dist/socket.io';
import getUUIDFromCookie from '../config/getcookie';

const webSocketIp = 'ws://wlotto.net:8803/';
// const webSocketIp = 'ws://192.168.0.25:8803/';

export default function createWebSocket() {
    const webSocket = io(`${webSocketIp}${getUUIDFromCookie()}`);
    return webSocket;
}