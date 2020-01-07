function getTCPSocket(data, gateWaySocket) {
	const reciveArray = new Uint8Array(data);
    const content = decodeUTF16(reciveArray.slice(10, reciveArray.length-5)).split('|');
    content[content.length - 1] === '' ? content.pop() : '';
	const TCPSocketIp = content[1];
	const TCPSocketPort = content[2];
	gateWaySocket.emit('end');
    return {TCPSocketIp, TCPSocketPort};
}

function decodeUTF16(str) {
    const utf16decoder = new TextDecoder('utf-16');
    const utf16Array = new Uint8Array(str);

    return utf16decoder.decode(utf16Array);
}

function encodeUTF8(str) {
    const utf8Array = [];
    const buffer = Buffer.from(str);
    for (let i = 0; i < buffer.length; i++) {
        utf8Array.push(buffer[i]);
    }

    return utf8Array;
}

function encodeUTF16(str) {
    const utf16Array = [];
    const buffer = Buffer.from(str, 'utf16le');
    for (let i = 0; i < buffer.length; i++) {
        utf16Array.push(buffer[i]);
    }

    return utf16Array;
}

module.exports = {
    getTCPSocket,
    encodeUTF8,
    encodeUTF16,
    decodeUTF16,
};