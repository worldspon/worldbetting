import io from '../../node_modules/socket.io-client/dist/socket.io';
import getUUIDFromCookie from '../config/getcookie';

function getConnectURL() {
    const url = location.href;

    if(url.includes('wbet')) {
        return 'wbet2020.com';
    } else if(url.includes('betsamples')) {
        return 'betsamples.com';
    }
}

// const webSocketIp = `ws://${getConnectURL()}:8803/`;
const webSocketIp = 'ws://192.168.0.25:8803/';

export default function createWebSocket() {
    const webSocket = io(`${webSocketIp}${getUUIDFromCookie()}`);
    return webSocket;
}