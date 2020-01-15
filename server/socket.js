const gatewayNet = require('net');
const TCPNet = require('net');
const { getTCPSocket, encodeUTF8, encodeUTF16 } = require('./byteParser');

class GatewaySocket {
    constructor(io, uuid) {
        // 게이트웨이 소켓 설정
        this.gateWaySocket = gatewayNet.connect({port: 16001, host:'202.230.143.223'});

        // 소켓 연결시 이벤트 설정
        this.gateWaySocket.on('connect', () => {
            // TCP 서버 정보를 받아오는 이벤트 커맨드 작성
            const command = encodeUTF8('0010000');
            const endSignal = encodeUTF8('<End>');
            const content = encodeUTF16('8000|');
            const sendStream = Buffer.from(command.concat(content).concat(endSignal));
            this.gateWaySocket.write(sendStream);
        });

        this.gateWaySocket.on('data', (data) => {
            console.log('GATEWAY CREATE');
            // 게이트웨이에서 TCP 소켓 정보 취득 후 websocket 생성, 게이트웨이 end
            const {TCPSocketIp, TCPSocketPort} = getTCPSocket(data, this.gateWaySocket);
            new WebSocket(io, uuid, TCPSocketIp, TCPSocketPort);
        });

        this.gateWaySocket.on('end', () => {
            console.log('GATEWAY disconnected!');
        });

        this.gateWaySocket.on('error', (err) => {
            console.log('GATEWAY ERROR!!!! : ' + err);
        });

        this.gateWaySocket.on('timeout', () => {
            console.log('GATEWAY TIMEOUT!');
        });
    }
}

class WebSocket {
	constructor(io, uuid, tcpIp, tcpPort) {
        const commend = encodeUTF8('0000000');
        const endSignal = encodeUTF8('<End>');
        this.pingStream = Buffer.from(commend.concat(endSignal));

        // 생성된 UUID로 소켓 채널 생성
        this.socketClass = io.of(`/${uuid}`);

		this.socketClass.on('connection', (socket) => {
            // TCP Class에서 리턴하는 TCP 객체를 저장
            this.tcp = new TCPSocket(tcpIp, tcpPort, socket, uuid);

            // client에서 받은 파싱 데이터를 buffer에 담아 전송
            socket.on('tcpsend', (data) => {
                const sendObject = Buffer.from(data);
                this.tcp.write(sendObject);
            })
		
			// force client disconnect from server
			socket.on('forceDisconnect', () => {
			    socket.disconnect();
			});
		
			socket.on('disconnect', () => {
                // 종료시 TCP ping interval 해제
                clearInterval(this.pingInterval);
                // 웹 소켓 종료시 연결된 TCP 소켓 종료
                this.tcp.end();
                // 네임스페이스 pool 에서 현재 네임스페이스 삭제
                delete io.nsps[`/${uuid}`];
                console.log('=====================================================');
                console.log(`user disconnected ${uuid}`);
                console.log('=====================================================');
            });
            
            // TCP 소켓 DISCONNECT 방지를 위한 PING 인터벌 설정
            this.pingInterval = setInterval(() => {
                this.tcp.write(this.pingStream);
                // console.log(`SEND PING! ${uuid}`);
            }, 20000);
        });
    }
}

class TCPSocket {
    // send ping 식별을 위한 uuid      ↓ 추후 삭제 예정
	constructor(ip, port, webSocket, uuid) {
        this.TCPSocket = TCPNet.connect({port: port, host: `${ip}`});
		this.TCPSocket.on('connect', () => {
            // 최초 연결시 disconnect 방지를 위한 ping data send
            const commend = encodeUTF8('0000000');
            const endSignal = encodeUTF8('<End>');
            const pingStream = Buffer.from(commend.concat(endSignal));
            this.TCPSocket.write(pingStream);
            console.log(`SEND PING! ${uuid}`);
            console.log('=====================================================');
            console.log('TCP CONNECT! : ' + uuid);
            console.log('=====================================================');
		});

	
		this.TCPSocket.on('data', (data) => {
            // 웹 소켓에 byteArray 방출
            webSocket.emit('tcpReceive', data);
		});
		
        this.TCPSocket.on('end', () => {
            webSocket.emit('tcpForceClose', 'TCP 연결이 종료되어 로그아웃합니다.');
		});
		
		this.TCPSocket.on('error', (err) => {
            webSocket.emit('tcpForceClose', 'TCP 연결이 종료되어 로그아웃합니다.');
		});
		
		this.TCPSocket.on('timeout', () => {
            webSocket.emit('tcpForceClose', 'TCP 연결이 종료되어 로그아웃합니다.');
        })
        
        return this.TCPSocket;
	}
}

module.exports = {
  GatewaySocket
};