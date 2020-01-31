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
import requestGameState from './commonfunction/requestgamestate';
import LanguagePack from './lang/langpack';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chargeModal: false,
            exchangeModal: false,
            infochangeModal: false,
            userPoint: 0,
            userCommission: 0,
            userBonus: 0,
            // 충전, 환전 타입
            chargeExchangeType: 0,
            // 회사 코인 리스트
            companyCoinList: [],
            // 코인 리스트가 분할되어 오는것을 대비해 임시 저장할 저장소
            coinByteStore: [],
            companyAccount: [],
            // 충환전 리스트 갯수
            chargeExchangeListEndPage: 0,
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
            },
            // 게임 인증 정보
            certification: {},
            // 게임 접속 가능 정보
            connectState: {}
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
                    // 게임 접속 가능상태 변경
                    } else if(command === '1002000') {
                        this.setGameState(ary.slice(7, ary.length-5));
                    // 유저 위치 로비 변경
                    } else if(command === '1003000') {
                        this.setUserState(ary.slice(7, ary.length-5));
                    // 유저 포인트
                    } else if(command === '1001000' || command === '1001500') {
                        this.setUserMoney(ary.slice(7, ary.length-5));
                    // 유저 정보 저장
                    } else if(command === '1000100') {
                        this.setUserInfo(ary.slice(7, ary.length-5));
                    // 회사 코인 리스트
                    } else if(command === '1101000') {
                        this.setCompanyCoinList(ary.slice(7, ary.length-5));
                    // 회사 계좌 정보
                    } else if(command === '1100200') {
                        this.setCompanyAccount(ary.slice(7, ary.length-5));
                    // 충전 환전신청
                    } else if(command === '1100000') {
                        this.responseChargeExchangeResult(ary.slice(7, ary.length-5));
                    // 충환전 리스트 갯수 호출
                    } else if(command === '1100110') {
                        this.responseChargeExchangeListCount(ary.slice(7, ary.length-5));
                    // 충전 환전 리스트
                    } else if(command === '1100100') {
                        this.responseChargeExchangeList(ary.slice(7, ary.length-5));
                    // 정보 수정
                    } else if(command === '1000200') {
                        this.responseChangeUserInfo(ary.slice(7, 8));
                    } else if(command === '9000000') {
                        this.responseChangeExchangeAction(ary.slice(7, ary.length-5));
                    } else if(command === '9000100') {
                        // 시스템 환경 설정이 변경됨
                        alert(this.props.langPack.alert.sysEnvChange);
                        this.tryLogout();
                    // 관리자에게 금액 받음
                    } else if(command === '9000400') {
                        this.responseReceiveMoney(ary.slice(7, ary.length-5))
                    }
                }
            });

            // force client disconnect from server
            webSocket.on('forceDisconnect', () => {
                webSocket.emit('disconnect');
            });

            webSocket.on('tcpForceClose', (message) => {
                webSocket.emit('disconnect',message);
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

    responseReceiveMoney(byteArray) {
        const content = decodeUTF16(byteArray.slice(3)).split('|');
        // 관리자에게 금액 받음
        alert(`${this.props.langPack.alert.receiveMoney}\n${content[0]}`);
        this.requestUserMoney();
    }

    // 충환전 처리통보
    responseChangeExchangeAction(byteArray) {
        const content = decodeUTF16(byteArray.slice(3)).split('|');
        if(content[1] == 1) {
            // 충전 완료
            alert(`${this.props.langPack.alert.chargeSuccess} : ${content[0]}`);
        } else {
            // 환전 취소
            alert(this.props.langPack.alert.exchangeFailed);
        }
        this.requestUserMoney();
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
        const errorCode = parseInt(byteArray.slice(0,1));
        // 로그인 인증 성공
        if( errorCode === 0 ) {
            // 로비 진입
            this.emitUserState();
            // 유저 금액 최신화
            this.requestUserMoney();
            // 유저 정보 및 충환전 타입
            this.requestUserInfo();
            requestGameState(this.state.webSocket, this.props.uniqueId);
            this.requestChargeExchangeListCount(1);
        } else {
            // 로그인 인증 실패
            switch (errorCode) {
                case 6:
                    // 기간이 만료된 세션
                    this.state.webSocket.emit('disconnect', this.props.langPack.alert.loginCheckFail);
                    sessionStorage.clear();
                    location.href = '/login';
                    break;
                case 250:
                    // DB 접속 에러
                    this.state.webSocket.emit('disconnect', this.props.langPack.alert.connectErrorDB);
                    sessionStorage.clear();
                    location.href = '/login';
                    break;
                case 255:
                    // DB 접속 에러
                    this.state.webSocket.emit('disconnect', this.props.langPack.alert.connectErrorDB);
                    sessionStorage.clear();
                    location.href = '/login';
                    break;
                default:
                    // 알수없는 오류입니다.
                    this.state.webSocket.emit('disconnect', this.props.langPack.alert.default);
                    sessionStorage.clear();
                    location.href = '/login';
                    break;
            }
        }
    }

    // 게임 접속 가능 상태 설정
    setGameState(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode === 0) {
            const content = decodeUTF16(byteArray.slice(3)).split('|');
            this.setState({
                certification: {
                    powerBall: content[1],
                    worldBall5: content[4],
                    worldBall3: content[7],
                    zombieDrop: content[10],
                    zombieBreak: content[13],
                    rsp: content[16]
                },
                connectState: {
                    powerBall: content[2],
                    worldBall5: content[5],
                    worldBall3: content[8],
                    zombieDrop: content[11],
                    zombieBreak: content[14],
                    rsp: content[17]
                }
            })
        } else {
            console.log('state failed');
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
            alert(this.props.langPack.alert.failEnterLobby);
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
            this.setState({
                userPoint: parseInt(content[0]),
                userCommission: parseInt(content[1]),
                userBonus: parseInt(content[2])
            });
        } else if(errorCode === 250 || errorCode === 255) {
            alert(this.props.langPack.alert.connectErrorDB);
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
                chargeExchangeType: parseInt(content[6]),
                userInfoReadOnly: content[7]
            }, () => {
                if(this.state.chargeExchangeType === 1) {
                    // 충환전 타입이 코인이면 회사 코인 리스트 호출
                    this.requestCompanyCoinList();
                }
            });
        } else if(errorCode === 250 || errorCode === 255) {
            alert(this.props.langPack.alert.connectErrorDB);
        }
    }

    // 회사 계좌정보를 불러오는 소켓통신
    requestCompanyAccount() {
        const command = encodeUTF8('1100200');
        const content = encodeUTF16(this.props.uniqueId + `|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    // 회사 계좌정보 세팅
    setCompanyAccount(byteArray) {
        const errorCode = parseInt(byteArray.slice(0, 1));
        if(errorCode === 0) {
            this.setState({
                companyAccount: decodeUTF16(byteArray.slice(3)).split('|')
            });
        } else {
            alert(this.props.langPack.alert.failGetCompanyAccount);
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
            alert(this.props.langPack.alert.successChargeExchangeApply)
        } else {
            // 로그인 인증 실패
            switch (errorCode) {
                case 1:
                    alert(this.props.langPack.alert.errorChargeExchangeOne);
                    break;
                case 2:
                    alert(this.props.langPack.alert.errorChargeExchangeTwo);
                    break;
                case 3:
                    alert(this.props.langPack.alert.errorChargeExchangeThree);
                    break;
                case 250:
                    alert(this.props.langPack.alert.errorChargeExchangeDB);
                    break;
                case 255:
                    alert(this.props.langPack.alert.errorChargeExchangeDB);
                    break;
                default:
                    alert(this.props.langPack.alert.default);
                    break;
            }
        }
    }

    // 충환전 리스트 총 갯수를 받아옴
    requestChargeExchangeListCount(type) {
        const command = encodeUTF8('1100110');
        const content = encodeUTF16(`${this.props.uniqueId}|${type}|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);
        this.state.webSocket.emit('tcpsend', sendData);
    }

    responseChargeExchangeListCount(byteArray) {
        const content = decodeUTF16(byteArray.slice(3)).split('|');
        console.log(content);
        this.setState({
            chargeExchangeListEndPage: content[0] == 0 ? 0 : Math.ceil(parseInt(content[0])/10) - 1
        });

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
        const content = encodeUTF16(`${this.props.uniqueId}|${type}|${page}|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    responseChargeExchangeList(byteArray) {
        console.log(byteArray);
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
            alert(this.props.langPack.alert.successChangeUserInfo);
            this.destroyModal();
            this.requestUserInfo();
        } else if(errorCode === 1) {
            alert(this.props.langPack.alert.errorChangeUserInfoOne);
        } else if(errorCode === 2) {
            alert(this.props.langPack.alert.errorChangeUserInfoTwo);
        } else {
            alert(this.props.langPack.alert.default);
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
                        langPack={this.props.langPack.header}
                        trademark={this.props.trademark}
                        userPoint={this.state.userPoint}
                        userCommission={this.state.userCommission}
                        userBonus={this.state.userBonus}
                        showChargeModal={() => {this.showChargeModal()}}
                        showExchangeModal={() => {this.showExchangeModal()}}
                        showInfoChangeModal = {() => {this.showInfoChangeModal()}}
                        tryLogout = {() => {this.tryLogout()}}
                    />
                    { 
                        this.state.chargeModal &&
                        <Charge
                            langPack={this.props.langPack.charge}                            
                            webSocket={this.state.webSocket}
                            uniqueId={this.props.uniqueId}
                            type={this.state.chargeExchangeType}
                            companyAccount={this.state.companyAccount}
                            companyCoinList={this.state.companyCoinList}
                            chargeExchangeList={this.state.chargeExchangeList}
                            requestCompanyCoinList={() => this.requestCompanyCoinList()}
                            requestCompanyAccount={() => this.requestCompanyAccount()}
                            requestChargeExchange={(data) => this.requestChargeExchange(data)}
                            requestChargeExchangeListCount={(type) => this.requestChargeExchangeListCount(type)}
                            requestChargeExchangeList={(type, page) => this.requestChargeExchangeList(type, page)}
                            chargeExchangeListEndPage={this.state.chargeExchangeListEndPage}
                            destroyModal={() => this.destroyModal()}
                        />
                    }
                    { 
                        this.state.exchangeModal &&
                        <Exchange
                            langPack={this.props.langPack.exchange}
                            webSocket={this.state.webSocket}
                            uniqueId={this.props.uniqueId}
                            type={this.state.chargeExchangeType}
                            userPoint={this.state.userPoint}
                            chargeExchangeList={this.state.chargeExchangeList}
                            requestChargeExchange={(data) => this.requestChargeExchange(data)}
                            requestChargeExchangeListCount={(type) => this.requestChargeExchangeListCount(type)}
                            requestChargeExchangeList={(type, page) => this.requestChargeExchangeList(type, page)}
                            chargeExchangeListEndPage={this.state.chargeExchangeListEndPage}
                            destroyModal={() => this.destroyModal()}
                        />
                    }
                    { 
                        this.state.infochangeModal &&
                        <InfoChange
                            langPack={this.props.langPack.infoChange}
                            userInfo={this.state.userInfo}
                            userInfoReadOnly={this.state.userInfoReadOnly}
                            requestChangeUserInfo={(data) => this.requestChangeUserInfo(data)}
                            requestUserInfo={() => this.requestUserInfo()}
                            destroyModal={() => {this.destroyModal()}}
                        />
                    }
                    {
                        !this.state.chargeModal && !this.state.exchangeModal && !this.state.infochangeModal &&
                        <GameSelectBox
                            langPack={this.props.langPack.gameSelectBox}
                            certification={this.state.certification}
                            connectState={this.state.connectState}
                        />

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
        langPack={sessionStorage.getItem('lang') === null ? LanguagePack.ko.lobby : LanguagePack[sessionStorage.getItem('lang')].lobby}
    />,
    document.getElementById('root')
);