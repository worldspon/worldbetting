const express = require('express');
const uuidv1 = require('uuid/v1');
const app = express();
const port = 8803;
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const proxy = require('express-http-proxy');
// http server를 socket.io server로 upgrade한다
const {GatewaySocket} = require('./socket');

app.get('/api/*', proxy('http://211.192.165.100:6061'));
app.post('/api/*', proxy('http://211.192.165.100:6061'));
app.patch('/api/*', proxy('http://211.192.165.100:6061'));
app.put('/api/*', proxy('http://211.192.165.100:6061'));
app.delete('/api/*', proxy('http://211.192.165.100:6061'));


app.get('/', (req, res) => {
	res.append('Set-Cookie', `worldLottoUUID=${createSocket()}; Path=/;`);
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use(express.static('../build'));

app.get('/guide', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/guide/guide.html'));
});

app.get('/guide/*', (req, res) => {
	res.redirect('/guide');
});

app.get('/login', (req, res) => {
	res.append('Set-Cookie', `worldLottoUUID=${createSocket()}; Path=/;`);
	res.sendFile(path.join(__dirname, '../build/login/login.html'));
});

app.get('/login/*', (req, res) => {
	res.redirect('/login');
});

app.get('/dhlottery', (req, res) => {
	res.append('Set-Cookie', `worldLottoUUID=${createSocket()}; Path=/;`);
	res.sendFile(path.join(__dirname, '../build/games/dhlottery/dhlottery.html'));
});

app.get('/dhlottery/*', (req, res) => {
	res.redirect('/dhlottery');
});

app.get('/worldlotto3m', (req, res) => {
	res.append('Set-Cookie', `worldLottoUUID=${createSocket()}; Path=/;`);
	res.sendFile(path.join(__dirname, '../build/games/worldlotto3m/worldlotto3m.html'));
});

app.get('/worldlotto3m/*', (req, res) => {
	res.redirect('/worldlotto3m');
});

app.get('/worldlotto5m', (req, res) => {
	res.append('Set-Cookie', `worldLottoUUID=${createSocket()}; Path=/;`);
	res.sendFile(path.join(__dirname, '../build/games/worldlotto5m/worldlotto5m.html'));
});

app.get('/worldlotto5m/*', (req, res) => {
	res.redirect('/worldlotto5m');
});

app.get('/rspgame', (req, res) => {
	res.append('Set-Cookie', `worldLottoUUID=${createSocket()}; Path=/;`);
	res.sendFile(path.join(__dirname, '../build/games/rspgame/rspgame.html'));
});

app.get('/rspgame/*', (req, res) => {
	res.redirect('/rspgame');
});

app.get('/dropgame', (req, res) => {
	res.append('Set-Cookie', `worldLottoUUID=${createSocket()}; Path=/;`);
	res.sendFile(path.join(__dirname, '../build/games/dropgame/dropgame.html'));
});

app.get('/dropgame/*', (req, res) => {
	res.redirect('/dropgame');
});

app.get('/breakgame', (req, res) => {
	res.append('Set-Cookie', `worldLottoUUID=${createSocket()}; Path=/;`);
	res.sendFile(path.join(__dirname, '../build/games/breakgame/breakgame.html'));
});

app.get('/breakgame/*', (req, res) => {
	res.redirect('/breakgame');
});


// 소켓 생성, GATEWAY에서 TCP 정보를 받아 TCP, WEB SOCKET을 생성한다.
function createSocket() {
	console.log('INIT');
	const uuid = uuidv1();
	new GatewaySocket(io, uuid);
	return uuid;
}

server.listen(port, () => {
	console.log('SERVER START');
});