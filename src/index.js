import React from 'react';
import ReactDOM from 'react-dom';
import createWebSocket from './config/socketip';
// 쿠키 추출
import {
    encodeUTF8,
    encodeUTF16,
    decodeUTF8,
    decodeUTF16,
    checkTcpData,
    parseCompanyCoinStruct,
    parseChargeExchangeList
} from './config/byteparser';
import common from './common.css';
import styles from './index.css';
import IndexHeader from './indexcomponent/indexheader';
import GameSelectBox from './indexcomponent/gameselectbox';
import Charge from './indexcomponent/charge/charge';
import Exchange from './indexcomponent/exchange/exchange';
import InfoChange from './indexcomponent/infochange/infochange';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chargeModal: false,
            exchangeModal: false,
            infochangeModal: false,
            userPoint: 0,
            userCommission: 0,
            // 충전, 환전 타입
            chargeExchangeType: 0,
            // 회사 코인 리스트
            companyCoinList: [],
            // 코인 리스트가 분할되어 오는것을 대비해 임시 저장할 저장소
            coinByteStore: [],
            // 충환전 신청 리스트
            chargeExchangeList: [],
            // 충환전 신청 리스트가 분할되어 오는것을 대비해 임시 저장할 저장소
            chargeExchangeListByteStore: [],
            // 유저 세부정보
            userInfo: {
                tel: '',
                bank: '',
                name: '',
                account: '',
                coin: '',
                coinWallet: ''
            }
        }
    }

    // 웹 소켓 연결
    connectWebSocket() {
        const webSocket = createWebSocket();
        this.setState({
            webSocket: webSocket
        });
        webSocket.on('connect', () => {

            webSocket.on('tcpReceive', (data) => {
                const reciveArray = new Uint8Array(data);
                const dataArray = checkTcpData(reciveArray);

                for(const ary of dataArray) {
                    const command = decodeUTF8(ary.slice(0, 7));
                    // 로그인 검증
                    if(command === '1000020') {
                        this.handleLoginCheckResult(ary.slice(7, ary.length-5));
                    // 유저 위치 로비 변경
                    } else if(command === '1003000') {
                        this.setUserState(ary.slice(7, ary.length-5));
                    // 유저 포인트
                    } else if(command === '1001000') {
                        this.setUserMoney(ary.slice(7, ary.length-5));
                    // 유저 정보 수정
                    } else if(command === '1000100') {
                        this.setUserInfo(ary.slice(7, ary.length-5));
                    // 회사 코인 리스트
                    } else if(command === '1101000') {
                        this.setCompanyCoinList(ary.slice(7, ary.length-5));
                    // 충전 환전신청
                    } else if(command === '1100000') {
                        this.responseChargeExchangeResult(ary.slice(7, ary.length-5));
                    // 충전 환전 리스트
                    } else if(command === '1100100') {
                        this.responseChargeExchangeList(ary.slice(7, ary.length-5));
                    } else if(command === '1000200') {
                        this.responseChangeUserInfo(ary.slice(7, 8));
                    }
                }
            });

            // force client disconnect from server
            webSocket.on('forceDisconnect', () => {
                webSocket.disconnect();
            });
        
            webSocket.on('disconnect', (message) => {
                sessionStorage.clear();
                alert(message);
                location.href='/login';
            });

            // 로그인 검증
            this.tcpLoginCheck();
        });
    }

    // 접속시 TCP 서버에 로그인 인증 이벤트 emit
    tcpLoginCheck() {
        const command = encodeUTF8('1000020');
        const content = encodeUTF16(`${sessionStorage.getItem('uniqueId')}|${sessionStorage.getItem('userId')}|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    // 로그인 검증 결과 처리
    handleLoginCheckResult(byteArray) {
        console.log('CHECK!');
        const errorCode = parseInt(byteArray.slice(0,1));
        // 로그인 인증 성공
        if( errorCode === 0 ) {
            // 로비 진입
            this.emitUserState();
            // 유저 금액 최신화
            this.requestUserMoney();
            // 유저 정보 및 충환전 타입
            this.requestUserInfo();
        } else {
            // 로그인 인증 실패
            switch (errorCode) {
                case 6:
                    this.state.webSocket.emit('disconnect','기간이 만료된 세션입니다.');
                    // alert('기간이 만료된 세션입니다.');
                    sessionStorage.clear();
                    location.href = '/login';
                    break;
                case 250:
                    this.state.webSocket.emit('disconnect','통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
                    // alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
                    sessionStorage.clear();
                    location.href = '/login';
                    break;
                case 255:
                    this.state.webSocket.emit('disconnect','통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
                    // alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
                    sessionStorage.clear();
                    location.href = '/login';
                    break;
                default:
                    this.state.webSocket.emit('disconnect','알수없는 오류입니다.');
                    alert('알수없는 오류입니다.');
                    sessionStorage.clear();
                    location.href = '/login';
                    break;
            }
        }
    }

    // 로그아웃 통신
    tryLogout() {
        const command = encodeUTF8('1000030');
        const content = encodeUTF16(`${this.props.uniqueId}|${this.props.trademark}|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);
        this.state.webSocket.emit('tcpsend', sendData);
        sessionStorage.clear();
        this.state.webSocket.emit('disconnect','로그아웃처리 되었습니다.');
        location.href = '/login';
    }  

    // 유저의 위치를 로비로 변경하는 소켓통신
    emitUserState() {
        const command = encodeUTF8('1003000');
        const content = encodeUTF16(this.props.uniqueId + `|0|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    // 유저 위치 로비 변경
    setUserState(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode !== 0) {
            alert('로비 진입에 실패하였습니다.');
            // this.tryLogout();
        }
    }

    // 유저 포인트 가져오는 소켓통신
    requestUserMoney() {
        const command = encodeUTF8('1001000');
        const content = encodeUTF16(this.props.uniqueId + `|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    // 유저 포인트 정보를 최신화
    setUserMoney(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode === 0) {
            const content = decodeUTF16(byteArray.slice(3)).split('|');
            content[content.length-1] === '' ? content.pop() : '';
            this.setState({
                userPoint: parseInt(content[0]),
                userCommission: parseInt(content[1])
            });
        } else if(errorCode === 250 || errorCode === 255) {
            alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
        }
    }

    // 유저 세부정보 및 충환전 타입을 가져오는 소켓통신
    requestUserInfo() {
        const command = encodeUTF8('1000100');
        const content = encodeUTF16(this.props.uniqueId + `|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    // 유저 세부정보 및 충환전 타입 저장
    setUserInfo(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode === 0) {
            const content = decodeUTF16(byteArray.slice(3)).split('|');
            content[content.length-1] === '' ? content.pop() : '';
            this.setState({
                userInfo: {
                    tel: content[0],
                    bank: content[1],
                    name: content[2],
                    account: content[3],
                    coin: content[4],
                    coinWallet: content[5]
                },
                chargeExchangeType: parseInt(content[6])
            }, () => {
                if(this.state.chargeExchangeType === 1) {
                    // 충환전 타입이 코인이면 회사 코인 리스트 호출
                    this.requestCompanyCoinList();
                }
            });
        } else if(errorCode === 250 || errorCode === 255) {
            alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
        }
    }

    // 코인리스트를 불러오는 소켓통신
    requestCompanyCoinList() {
        // 코인리스트 초기화
        // 같은 리스트가 반복되는것을 방지
        this.setState({
            companyCoinList: [],
            coinByteStore: []
        });
        const command = encodeUTF8('1101000');
        const content = encodeUTF16(this.props.uniqueId + `|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    // 코인리스트 세팅
    setCompanyCoinList(byteArray) {
        const errorCode = parseInt(byteArray.slice(0, 1));
        const coinByteStore = [...this.state.coinByteStore];
        coinByteStore.push(...byteArray.slice(3));
        if(errorCode !== 2) {
            this.setState({
                coinByteStore: coinByteStore
            });
        } else {
            const coinList = [];
            const reciveCoinList = parseCompanyCoinStruct(coinByteStore);
            reciveCoinList.map((coinObject) => {
                coinList.push({
                    coinName: coinObject.coinName.trim(),
                    coinWallet: coinObject.coinWallet.trim()
                });
            })
            this.setState({
                companyCoinList: coinList,
            });
        }
    }

    // 충전, 환전 신청 소켓통신
    requestChargeExchange(data) {
        const command = encodeUTF8('1100000');
        const content = encodeUTF16(this.props.uniqueId + `${data}`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    // 충전, 환전 신청 결과
    responseChargeExchangeResult(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if( errorCode === 0 ) {
            alert('신청이 완료되었습니다.')
        } else {
            // 로그인 인증 실패
            switch (errorCode) {
                case 1:
                    alert('로비에서만 신청이 가능합니다.');
                    break;
                case 2:
                    alert('올바르지 않은 금액입니다.');
                    break;
                case 3:
                    alert('환전금액이 부족합니다.');
                    break;
                case 250:
                    alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
                    break;
                case 255:
                    alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
                    break;
                default:
                    alert('알수없는 오류입니다.');
                    break;
            }
        }
    }

    // 충전, 환전 리스트 받아오는 통신
    requestChargeExchangeList(type, page) {
        // 충환전 리스트 초기화
        // 같은 리스트가 반복되는것을 방지
        this.setState({
           chargeExchangeList: [],
           chargeExchangeListByteStore: []
        });
        const command = encodeUTF8('1100100');
        const content = encodeUTF16(`${this.props.uniqueId}|${type}|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    responseChargeExchangeList(byteArray) {
        const errorCode = parseInt(byteArray.slice(0, 1));
        const chargeExchangeListByteStore = [...this.state.chargeExchangeListByteStore];
        chargeExchangeListByteStore.push(...byteArray.slice(3));

        if(errorCode !== 2) {
            this.setState({
                chargeExchangeListByteStore: chargeExchangeListByteStore
            });
        } else {
            const chargeExchangeList = [];
            const reciveList = parseChargeExchangeList(chargeExchangeListByteStore);
            reciveList.map((listObject) => {
                chargeExchangeList.push({
                    listUnique: listObject.listUnique,
                    userUnique: listObject.userUnique,
                    applyDate: listObject.applyDate,
                    handleDate: listObject.handleDate,
                    userPoint: listObject.userPoint,
                    userCoin: listObject.userCoin,
                    applyState: listObject.applyState,
                    userBank: listObject.userBank,
                    userAccount: listObject.userAccount,
                    accountName: listObject.accountName
                });
            })
            this.setState({
                chargeExchangeList: chargeExchangeList
            });
        }
    }

    // 정보 수정
    requestChangeUserInfo(data) {
        const command = encodeUTF8('1000200');
        const content = encodeUTF16(`${this.props.uniqueId}${data}`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    responseChangeUserInfo(byte) {
        const errorCode = parseInt(byte);
        if(errorCode === 0) {
            alert('정보수정이 완료되었습니다.');
            this.destroyModal();
            this.requestUserInfo();
        } else {
            alert('알수없는 오류입니다.')
        }
    }

    // 충전신청 모달
    showChargeModal() {
        this.setState({
            chargeModal: true,
            exchangeModal: false,
            infochangeModal: false
        });
    }

    // 환전신청 모달
    showExchangeModal() {
        this.setState({
            chargeModal: false,
            exchangeModal: true,
            infochangeModal: false
        })
    }

    // 정보수정 모달
    showInfoChangeModal() {
        this.setState({
            chargeModal: false,
            exchangeModal: false,
            infochangeModal: true
        })
    }

    // 모달 닫음
    destroyModal() {
        // 모달 flag, 코인리스트 초기화
        this.setState({
            chargeModal: false,
            exchangeModal: false,
            infochangeModal: false
        })
    }  

    componentDidMount() {
        this.connectWebSocket();
    }

    render() {
        return (
            <div className={common.wrap}>
                <div className={common.main}>
                    <IndexHeader
                        trademark={this.props.trademark}
                        userPoint={this.state.userPoint}
                        userCommission={this.state.userCommission}
                        showChargeModal={() => {this.showChargeModal()}}
                        showExchangeModal={() => {this.showExchangeModal()}}
                        showInfoChangeModal = {() => {this.showInfoChangeModal()}}
                        tryLogout = {() => {this.tryLogout()}}
                    />
                    { 
                        this.state.chargeModal &&
                        <Charge
                            webSocket={this.state.webSocket}
                            uniqueId={this.props.uniqueId}
                            type={this.state.chargeExchangeType}
                            companyCoinList={this.state.companyCoinList}
                            chargeExchangeList={this.state.chargeExchangeList}
                            requestCompanyCoinList={() => this.requestCompanyCoinList()}
                            requestChargeExchange={(data) => this.requestChargeExchange(data)}
                            requestChargeExchangeList={(type) => this.requestChargeExchangeList(type)}
                            destroyModal={() => this.destroyModal()}
                        />
                    }
                    { 
                        this.state.exchangeModal &&
                        <Exchange
                            webSocket={this.state.webSocket}
                            uniqueId={this.props.uniqueId}
                            type={this.state.chargeExchangeType}
                            userPoint={this.state.userPoint}
                            requestChargeExchange={(data) => this.requestChargeExchange(data)}
                            requestChargeExchangeList={(type) => this.requestChargeExchangeList(type)}
                            destroyModal={() => this.destroyModal()}
                        />
                    }
                    { 
                        this.state.infochangeModal &&
                        <InfoChange
                            userInfo={this.state.userInfo}
                            requestChangeUserInfo={(data) => this.requestChangeUserInfo(data)}
                            requestUserInfo={() => this.requestUserInfo()}
                            destroyModal={() => {this.destroyModal()}}
                        />
                    }
                    {
                        !this.state.chargeModal && !this.state.exchangeModal && !this.state.infochangeModal &&
                        <GameSelectBox />
                    }
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Index
        trademark={sessionStorage.getItem('userId')}
        uniqueId={sessionStorage.getItem('uniqueId')}
    />,
    document.getElementById('root')
);