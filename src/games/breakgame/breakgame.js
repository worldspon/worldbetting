import React from 'react';
import ReactDOM from 'react-dom';
import createWebSocket from '../../config/socketip';
import {
    decodeUTF8,
    decodeUTF16,
    checkTcpData,
    parseBettingList,
    parsePrevGameResult,
    parseBettingResult
} from '../../config/byteparser';
import common from '../../common.css';
import styles from './breakgame.css';
// 로그인 검증
import tcpLoginCheck from '../../commonfunction/tcplogincheck';
// 로그아웃
import tcpLogout from '../../commonfunction/tcplogout';
// 유저 위치변경
import setUserState from '../../commonfunction/setuserstate';
// 게임 환경 세팅
import requestGameInfo from '../../commonfunction/requestgameinfo';
// 유저 게임환경 세팅
import requestUserGameInfo from '../../commonfunction/requestusergameinfo';
// 유저 포인트
import requestUserPoint from '../../commonfunction/requestuserpoint';
// 유저 포인트(DB)
import requestUserPointDB from '../../commonfunction/requestuserpointdb';
// 유저 커미션 전환
import requestChangeCommission from '../../commonfunction/requestchangecommission';
// 게임 회차
import requestGameRound from '../../commonfunction/requestgameround';
// 게임 시간
import requestGameCount from '../../commonfunction/requestgamecount';
// 베팅리스트
import requestBettingList from '../../commonfunction/requestbettinglist';
// 게임 베팅
import requestGameBetting from '../../commonfunction/requestgamebetting';
// 베팅 취소
import requestCancelBetting from '../../commonfunction/requestcancelbetting';
// 과거 베팅 리스트 갯수
import responseBettingResultCount from '../../commonfunction/responsebettingresultcount';
// 과거 베팅 리스트
import responseBettingResult from '../../commonfunction/responsebettingresult';
import searchBettingType from '../../commonfunction/searchbettingtype';
import Header from '../commoncomponent/header/header';
import BettingBox from '../commoncomponent/bettingbox/bettingbox';
// GameBetting Tag에 props로 보내기 위한 TypePad Tag
import TypePad from '../commonComponent/typepad/typepad';
// 공통 Component TypePad에 각 게임마다 다른 button component를 전달하기 위한 Tag
import ButtonPad from './buttonpad'
import GameResult from '../commoncomponent/gameresult/gameresult';
import BettingResult from '../commoncomponent/bettingresult/bettingresult';
import listStyles from '../commoncomponent/gameresult/gameresult.css';
import promiseModule from '../../config/promise';
import Pagination from '../../commoncomponent/pagination/pagination'
import { printReceipt } from '../../commonfunction/printbetting';

// 내부 코드에서 표시되는 page는 배열 index로 실제 표시 page는 +1 하여 표시됨

class ZombieBreak extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            staticLimitBettingMoney: 10000000000,
            logoURL: '../../../images/zombiebreak_game_icon.png',
            apiURL: 'zombieBreak',
            userPoint: 0,
            userCommission: 0,
            userBonus: 0,
            gameType: 5,
            gameTitle: 'ZombieBreak',
            // 게임 회차
            gameRound: 0,
            // 게임 시간
            gameCount: 0,
            // 게임 시간 타이머 인터벌
            gameCountInterval: null,
            // 게임 결과 컴포넌트 표시 여부 boolean
            gameResultComponent: false,
            bettingResultComponent: false,
            // 게임 결과테이블 결과부분 텍스트
            gameResultThText: ['왼쪽', '오른쪽'],
            bettingAllowStart: 0,
            bettingAllowEnd: 0,
            // 게임 세팅 정보
            minMaxBetting: [],
            allocation: [],
            totalBettingLimit: 0,
            // 현재 베팅 정보
            selectBettingTypeNum: null,
            bettingMin: 0,
            bettingMax: 0,
            bettingMoney: 0,
            bettingList: [],
            currentTotalBettingMoney: 0,
            // 게임 결과 페이지 정보
            resultCurrentPage: 0,
            resultEndPage: 0,
            // 게임 결과 배열
            gameResultList: [],
            bettingResultList: [],
            bettingListStore: [],
            // 이전회차 게임 결과
            prevGameResult: null,
            resultPrint: false
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
                    // 유저 위치 변경
                    } else if(command === '1003000') {
                        this.responseSetUserState(ary.slice(7, ary.length-5));
                    // 게임 환경 세팅
                    } else if(command === '1005000'){
                        this.setGameInfo(ary.slice(7, ary.length-5));
                    // 유저 게임 환경 세팅
                    } else if(command === '1015000'){
                        this.setUserGameInfo(ary.slice(7, ary.length-5));
                    // 유저 금액 최신화
                    } else if(command === '1001000' || command === '1001500') {
                        this.setUserMoney(ary.slice(7, ary.length-5));
                    // 유저 커미션 전환
                    } else if(command === '1103000') {
                        this.responseChangeCommission(ary.slice(7, ary.length-5));
                    // 게임 회차 최신화
                    } else if(command === '1161000') {
                        this.setGameRound(ary.slice(7, ary.length-5));
                    // 게임 시간 동기화
                    } else if(command === '1160000') {
                        this.setGameCount(ary.slice(7, ary.length-5));
                    //게임 베팅
                    } else if(command === '1170000') {
                        this.responseGameBetting(ary.slice(7, ary.length-5));
                    // 베팅 리스트 호출
                    } else if(command === '1171000') {
                        this.responseBettingList(ary.slice(7, ary.length-5));
                    // 베팅 취소
                    } else if(command === '1172000') {
                        this.responseCancelBetting(ary.slice(7, ary.length-5));
                    // 이전회차 게임 결과
                    } else if(command === '1181000') {
                        this.responsePrevGameResult(ary.slice(7, ary.length-5));
                    // 게임 과거 베팅내역
                    } else if(command === '1173010') {
                        this.setBettingResultCount(ary.slice(7, ary.length-5));
                    } else if(command === '1173000') {
                        this.setBettingResult(ary.slice(7, ary.length-5));
                    } else if(command === '9000000') {
                        this.responseChangeExchangeAction(ary.slice(7, ary.length-5));
                    } else if(command === '9000100') {
                        alert('시스템 환경이 변경되어 로그인 화면으로 이동합니다.');
                        tcpLogout(this.state.webSocket, this.props.uniqueId,this.props.trademark);
                    // 관리자에게 금액 받음
                    } else if(command === '9000400') {
                        this.responseReceiveMoney(ary.slice(7, ary.length-5))
                    }  else if(command === '9000300') {
                        this.setState({
                            bettingList: []
                        })
                        requestUserPointDB(this.state.webSocket, this.props.uniqueId);
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
            tcpLoginCheck(webSocket);
        });
    }

    responseReceiveMoney(byteArray) {
        const content = decodeUTF16(byteArray.slice(3)).split('|');
        alert(`관리자로부터 보유머니를 충전받았습니다.\n${content[0]}`);
    }

    // 충환전 처리통보
    responseChangeExchangeAction(byteArray) {
        const content = decodeUTF16(byteArray.slice(3)).split('|');
        if(content[1] == 1) {
            alert(`충전되었습니다 : ${content[0]}`);
        } else {
            alert(`환전신청이 취소되었습니다.`);
        }
        requestUserPoint(this.state.webSocket, this.props.uniqueId);
    }

    setBettingResultCount(byteArray) {
        const content = decodeUTF16(byteArray.slice(3)).split('|');
        this.setState({
            resultEndPage: Math.ceil(content[0]/10) - 1
        });
    }

    setBettingResult(byteArray) {

        const errorCode = parseInt(byteArray.slice(0, 1));
        const bettingListStore = [...this.state.bettingListStore];
        bettingListStore.push(...byteArray.slice(3));

        if(errorCode !== 2) {
            this.setState({
                bettingListStore: bettingListStore
            });
        } else {
            const reciveList = parseBettingResult(bettingListStore);
            this.createBettingResultListJSX(reciveList);
            this.setState({
                bettingListStore: []
            });
        }
    }

    responseChangeCommission(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode === 0) {
            requestUserPoint(this.state.webSocket, this.props.uniqueId);
        } else {
            alert('전환할 수수료가 없습니다.');
        }
    }

    responsePrevGameResult(byteArray) {
        const content = parsePrevGameResult(byteArray.slice(3), this.state.gameType);
        this.setState({
            prevGameResult: content
        });
    }

    // 로그인 검증 결과 처리
    handleLoginCheckResult(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        // 로그인 인증 성공
        if( errorCode === 0 ) {
            // 유저 위치 변경
            setUserState(this.state.webSocket, this.props.uniqueId, this.state.gameType);
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

    // 유저 위치 변경
    responseSetUserState(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode !== 0) {
            alert('게임 진입에 실패하였습니다.');
            // this.tryLogout();
        } else if(errorCode === 0) {
            // 게임환경세팅 정보를 호출하는 함수
            // 게임순서 : 파워볼 / 5분 / 3분 / 낙하 / 격파 / 가위바위보
            // 베팅시작시간[1],끝시간[1] x6 / 벨런스[12] x6 / 파워볼조합 사용여부[60] x4 / 베팅취소 사용여부
            requestGameInfo(this.state.webSocket, this.props.uniqueId);
            // // 유저 게임 환경 세팅
            requestUserGameInfo(this.state.webSocket, this.props.uniqueId);
            // // 게임 회차 최신화
            requestGameRound(this.state.webSocket, this.props.uniqueId, this.state.gameType);
            // // 게임 시간 동기화
            requestGameCount(this.state.webSocket, this.props.uniqueId, this.state.gameType);
        }
    }

    // 게임 환경 세팅
    // 게임 순서 : 파워볼 / 5분 / 3분 / 낙하 / 격파 / 가위바위보
    // 베팅시작시간[1],끝시간[1] x6 / [12]벨런스[1] x6 / [60]파워볼조합 사용여부[1] x4 / 베팅취소 사용여부
    setGameInfo(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode === 0) {
            const content = decodeUTF16(byteArray.slice(3)).split('|');
            const bettingAllowTime = content.slice(0, 12);
            const balance = content.slice(12, 60);
            const powerBall = content.slice(60, 64);
            const cancelAllow = content.slice(64);
            // console.log(bettingAllowTime);
            // console.log(balance);
            // console.log(powerBall);
            // console.log(cancelAllow);

            this.setState({
                bettingAllowStart: bettingAllowTime[8],
                bettingAllowEnd: bettingAllowTime[9]
            });
        } else {
            console.log('실패');
        }
    }

    // 유저 환경 세팅
    // 게임순서 : 파워볼 / 5분 / 3분 / 낙하 / 격파 / 가위바위보
    // (최대베팅[1], 최소베팅[1] x10)x6 / [96]배당률[1] x10 / [156]총베팅제한
    setUserGameInfo(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode === 0) {
            const content = decodeUTF16(byteArray.slice(3)).split('|');
            // const maxMinBetting = content.slice(32, 48);
            // const allocation = content.slice(116, 126);
            // const totalBettingLimit = content.slice(158, 159);

            this.setState({
                minMaxBetting: content.slice(80, 100),
                allocation: content.slice(160, 170),
                totalBettingLimit: content[184]
            });
            
        } else {
            console.log('실패');
        }
    }

    // 유저 포인트 정보를 최신화
    setUserMoney(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode === 0) {
            const content = decodeUTF16(byteArray.slice(3)).split('|');
            content[content.length-1] === '' ? content.pop() : '';
            this.setState({
                userPoint: parseInt(content[0]),
                userCommission: parseInt(content[1]),
                userBonus: parseInt(content[2])
            });
        } else if(errorCode === 250) {
            alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
        }
    }

    // 게임 회차 동기화, 최초 입장시 동기화 이후 서버에서 자동으로 데이터 보냄
    setGameRound(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode === 0) {
            const content = decodeUTF16(byteArray.slice(3)).split('|').join('');
            this.setState({
                gameRound: content,
                bettingList: []
            }, () => {
                // 회차 정보 업데이트시 유저 금액, 베팅리스트 최신화
                requestUserPoint(this.state.webSocket, this.props.uniqueId);
                requestBettingList(this.state.webSocket, this.props.uniqueId, this.state.gameType);
            });
        } else if(errorCode === 1) {
            alert('게임 회차 최신화에 실패하였습니다.');
        }else if(errorCode === 250 || errorCode === 255) {
            alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
        }
    }

    // 게임 시간 동기화, 최초 입장시 동기화 이후 서버에서 자동으로 데이터 보냄
    setGameCount(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode === 0) {
            clearInterval(this.state.gameCountInterval);
            const content = decodeUTF16(byteArray.slice(3)).split('|').join('');
            this.setState({
                gameCount: parseInt(content)
            }, () => {
                this.setGameTimer();
            });
        } else if(errorCode === 1) {
            alert('게임 시간 동기화에 실패하였습니다.');
        } else if(errorCode === 250 || errorCode === 255) {
            alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
        }
    }

    // 게임 시간을 1초씩 감소시키는 interval
    setGameTimer() {
        const timerInterval = setInterval(() => {
            this.setState({
                gameCount: this.state.gameCount - 1
            })
        }, 1000);

        this.setState({
            gameCountInterval: timerInterval
        });
    }

    // 베팅 타입을 설정하고 저장 및 초기화
    changeSelectBettingTypeNum(selectBettingTypeNum, min, max) {
        // 같은 버튼을 클릭한 경우 초기화
        if(this.state.selectBettingTypeNum === selectBettingTypeNum) {
            this.setState({
                selectBettingTypeNum: null,
                bettingMin: 0,
                bettingMax: 0
            });
        } else {
            this.setState({
                selectBettingTypeNum: selectBettingTypeNum,
                bettingMin: parseInt(min),
                bettingMax: parseInt(max)
            });
        }
    }

    // 베팅 금액 최신화
    changeBettingMoney(bettingMoney, inputFlag = false) {
        const maxBettingMoney = this.state.staticLimitBettingMoney;
        const nextBettingMoney = this.state.bettingMoney + bettingMoney;

        if(bettingMoney >= maxBettingMoney || nextBettingMoney >= maxBettingMoney) {
            alert('베팅 금액이 너무 큽니다.');
        } else if(inputFlag) {
            this.setState({
                bettingMoney: bettingMoney
            });   
        } else {
            this.setState({
                bettingMoney: this.state.bettingMoney + bettingMoney
            });   
        }
    }

    // 베팅 금액 초기화
    bettingMoneyClear() {
        this.setState({
            bettingMoney: 0
        })
    }

    // 모든 베팅 정보 초기화
    bettingAllClear() {
        this.setState({
            selectBettingTypeNum: null,
            bettingMin: 0,
            bettingMax: 0,
            bettingMoney: 0
        })
    }
    // 게임 베팅 시도
    gameBetting() {
        if( this.state.selectBettingTypeNum === null) {
            alert('게임을 선택해주세요.');
        } else if(this.state.bettingMoney <= 0) {
            alert('베팅 금액을 입력해주세요.');
        } else if(
            this.state.gameCount > this.state.bettingAllowStart ||
            this.state.gameCount < this.state.bettingAllowEnd) {
                alert('베팅 가능 시간이 아닙니다.');
        } else if(this.state.bettingMoney > (this.state.totalBettingLimit - this.state.currentTotalBettingMoney) || this.state.bettingMoney < this.state.bettingMin || this.state.bettingMoney > this.state.bettingMax){
            alert('베팅 가능 금액이 아닙니다.');
        } else {
            requestGameBetting(this.state.webSocket, this.props.uniqueId, this.state.gameType, this.state.selectBettingTypeNum, this.state.bettingMoney)
        }
    }

    responseGameBetting(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if(errorCode === 0) {
            this.state.resultPrint && printReceipt(this.state.gameRound, this.props.trademark, this.state.gameTitle, this.state.gameType, this.state.selectBettingTypeNum, this.state.bettingMoney, this.state.allocation);
            // 베팅 성공시 선택 초기화 및 유저 금액 최신화
            this.bettingAllClear();
            requestUserPoint(this.state.webSocket, this.props.uniqueId);
        } else if(errorCode === 250) {
            alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
        } else {
            alert('베팅에 실패하였습니다.');
        }
    }

    responseBettingList(byteArray) {
        const listArray = [...this.state.bettingList];
        listArray.push(...parseBettingList(byteArray.slice(3)));

        this.setState({
            bettingList: listArray
        });

        this.updateCurrentBettingMoney();
    }

    responseCancelBetting(byteArray) {
        this.setState({
            bettingList: []
        });
        requestUserPoint(this.state.webSocket, this.props.uniqueId);
        requestBettingList(this.state.webSocket, this.props.uniqueId, this.state.gameType);
    }

    updateCurrentBettingMoney() {
        this.setState({
            currentTotalBettingMoney: 0
        });

        let updateBettingMoney = 0;
        for(const list of this.state.bettingList) {
            updateBettingMoney += list.bettingMoney;
        }

        this.setState({
            currentTotalBettingMoney: updateBettingMoney
        });
    }

    setPrintFlag(printFlag) {
        this.setState({
            resultPrint: printFlag
        });
    }
    
    // Header에서 event를 받아 GameResult, Pagination 컴포넌트 호출
    showGameResultComponent() {
        this.setState({
            gameResultComponent: true,
            bettingResultComponent: false
        });
    }

    // Header에서 event를 받아 GameResult, Pagination 컴포넌트 호출
    showBettingResultComponent() {
        this.setState({
            gameResultComponent: false,
            bettingResultComponent: true
        });
    }

    // GameResult에서 event를 받아 GameResult, Pagination 컴포넌트 제거
    destroyGameResultComponent() {
        this.setState({
            gameResultComponent: false
        });
    }

    // GameResult에서 event를 받아 GameResult, Pagination 컴포넌트 제거
    destroyBettingResultComponent() {
        this.setState({
            bettingResultComponent: false
        });
    }

    //  GameResult 컴포넌트 제거시 관련 state 초기화
    resetPageState() {
        this.setState({
            resultCurrentPage: 0,
            gameResultList: [],
            resultEndPage: 0
        });
    }

    // ---------페이지 이동 함수-------------
    movePage(pageNum) {
        this.setState({
            resultCurrentPage: pageNum
        }, () => {
            if(this.state.gameResultComponent){
                this.getGameResult();
            } else if(this.state.bettingResultComponent) {
                responseBettingResult(this.state.webSocket, this.props.uniqueId, this.state.gameType, this.state.resultCurrentPage+1);
            }
        });
    }

    moveFirstPage() {
        this.setState({
            resultCurrentPage: 0
        }, () => {
            if(this.state.gameResultComponent){
                this.getGameResult();
            } else if(this.state.bettingResultComponent) {
                responseBettingResult(this.state.webSocket, this.props.uniqueId, this.state.gameType, this.state.resultCurrentPage+1);
            }
        })
    }

    movePrevPhrase() {
        this.setState({
            resultCurrentPage: this.state.resultCurrentPage - 5 >= 0 ? this.state.resultCurrentPage-5 : 0
        }, () => {
            if(this.state.gameResultComponent){
                this.getGameResult();
            } else if(this.state.bettingResultComponent) {
                responseBettingResult(this.state.webSocket, this.props.uniqueId, this.state.gameType, this.state.resultCurrentPage+1);
            }
        });
    }

    moveNextPhrase() {
        this.setState({
            resultCurrentPage: this.state.resultCurrentPage + 5 < this.state.resultEndPage ? this.state.resultCurrentPage + 5 : this.state.resultEndPage
        }, () => {
            if(this.state.gameResultComponent){
                this.getGameResult();
            } else if(this.state.bettingResultComponent) {
                responseBettingResult(this.state.webSocket, this.props.uniqueId, this.state.gameType, this.state.resultCurrentPage+1);
            }
        });
    }

    moveEndPage() {
        this.setState({
            resultCurrentPage: this.state.resultEndPage
        }, () => {
            if(this.state.gameResultComponent){
                this.getGameResult();
            } else if(this.state.bettingResultComponent) {
                responseBettingResult(this.state.webSocket, this.props.uniqueId, this.state.gameType, this.state.resultCurrentPage+1);
            }
        })
    }
    // ---------페이지 이동 함수-------------

    // 게임 결과 비동기 통신
    async getGameResult() {
        try {
            const promiseResult = await promiseModule.get(`/api/game/${this.state.apiURL}/${this.state.resultCurrentPage}`);
            const resultData = JSON.parse(promiseResult);
            if(resultData.game !== undefined) {
                this.createResultListJSX(resultData.game);
            } else {
                throw new Error(loginData.error.message);
            }
        } catch(error) {
            alert(error.message);
        }
    }

    // 게임 결과 JSX 생성 및 state 저장, endpage 계산 후 저장
    // 저장된 값은 gameResult 템플릿으로 전달 됨
    createResultListJSX(data) {
        const listArray = [];
        for(const [index, value] of data.rows.entries()) {
            listArray.push((<tr className={listStyles.fakeRow} key={index + 100}></tr>));
            listArray.push(<tr className={listStyles.gameResultListRow + ' ' + (index % 2 === 0 ? listStyles.listOddType : listStyles.listEvenType)} key={index}>
                <td>{value.gameCount}</td>
                <td>
                    <span>{value.result.left}</span>
                </td>
                <td>
                    <span>{value.result.right}</span>
                </td>
            </tr>);
        }

        this.setState({
            gameResultList: listArray,
            resultEndPage: Math.ceil(data.count/20) - 1
        });
    }

    // 게임 결과 JSX 생성 및 state 저장, endpage 계산 후 저장
    // 저장된 값은 gameResult 템플릿으로 전달 됨
    createBettingResultListJSX(data) {
        const listArray = [];
        for(const [index, value] of data.entries()) {
            const typeObject = searchBettingType(value.bettingType, this.state.gameType);
            listArray.push((<tr className={listStyles.fakeRow} key={index + 100}></tr>));
            listArray.push(<tr className={listStyles.gameResultListRow + ' ' + (index % 2 === 0 ? listStyles.listOddType : listStyles.listEvenType)} key={index}>
                <td>{value.round}</td>
                <td>{value.date}</td>
                <td>({typeObject.headType}){typeObject.bettingType}</td>
                <td>{value.bettingMoney}</td>
                <td>{value.result === 0 ? '대기' : value.result === 254 ? '취소' : value.result === 255 ? '특례' : value.resultMoney === 0 ? 'LOSE' : value.resultMoney}</td>
            </tr>);
        }

        this.setState({
            bettingResultList: listArray,
        });
    }

    resetPrevGameResult() {
        this.setState({
            prevGameResult: null
        })
    }

    componentDidMount() {
        this.connectWebSocket()
    }

    render() {
        return (
            <div className={common.wrap}>
                <div className={common.main}>
                    <Header
                        logoURL={this.state.logoURL}
                        trademark={this.props.trademark}
                        userPoint={this.state.userPoint}
                        userCommission={this.state.userCommission}
                        userBonus={this.state.userBonus}
                        gameRound={this.state.gameRound}
                        gameCount={this.state.gameCount}
                        bettingAllowStart={this.state.bettingAllowStart}
                        bettingAllowEnd={this.state.bettingAllowEnd}
                        showGameResultComponent={() => this.showGameResultComponent()}
                        showBettingResultComponent={() => this.showBettingResultComponent()}
                        requestChangeCommission={() => requestChangeCommission(this.state.webSocket, this.props.uniqueId)}
                        tcpLogout={() => tcpLogout(this.state.webSocket, this.props.uniqueId,this.props.trademark)}
                    />
                    {
                        // 게임 베팅부분
                        !this.state.gameResultComponent && !this.state.bettingResultComponent &&
                        <BettingBox
                            gameType={this.state.gameType}
                            allocation={this.state.allocation}
                            gameTitle={this.state.gameTitle}
                            gameRound={this.state.gameRound}
                            prevGameResult={this.state.prevGameResult}
                            gameCount={this.state.gameCount}
                            selectBettingTypeNum={this.state.selectBettingTypeNum}
                            bettingMoney={this.state.bettingMoney}
                            bettingList={this.state.bettingList}
                            resetPrevGameResult={() => this.resetPrevGameResult()}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.changeSelectBettingTypeNum(typeNum, min, max)}
                            changeBettingMoney={(bettingMoney, inputFlag) => this.changeBettingMoney(bettingMoney, inputFlag)}
                            bettingMoneyClear={() => this.bettingMoneyClear()}
                            bettingAllClear={() => this.bettingAllClear()}
                            gameBetting={() => this.gameBetting()}
                            requestCancelBetting={(e) => requestCancelBetting(this.state.webSocket, this.props.uniqueId, this.state.gameType, this.state.gameCount, e)}
                            setPrintFlag={(printFlag) => this.setPrintFlag(printFlag)}
                            typePad={
                                <TypePad
                                    totalBettingLimit={this.state.totalBettingLimit}
                                    currentTotalBettingMoney={this.state.currentTotalBettingMoney}
                                    gameRound={this.state.gameRound}
                                    gameTitle={this.state.gameTitle}
                                    buttonPad={
                                        <ButtonPad
                                            minMaxBetting={this.state.minMaxBetting}
                                            allocation={this.state.allocation}
                                        />
                                    }
                                />
                            }
                        />
                    }
                    {
                        // 베팅 결과 조회 부분
                        this.state.bettingResultComponent &&
                        <div className={styles.contentWrap}>
                            <BettingResult
                                gameTitle={this.state.gameTitle}
                                gameType={this.state.gameType}
                                bettingResultList={this.state.bettingResultList}
                                responseBettingResultCount={() => responseBettingResultCount(this.state.webSocket, this.props.uniqueId, this.state.gameType)}
                                responseBettingResult={() => responseBettingResult(this.state.webSocket, this.props.uniqueId, this.state.gameType, this.state.resultCurrentPage+1)}
                                destroyBettingResultComponent={() => {this.destroyBettingResultComponent()}}
                                resetPageState={() => this.resetPageState()}
                            />
                            <Pagination
                                currentPage={this.state.resultCurrentPage}
                                endPage={this.state.resultEndPage}
                                movePage={(pageNum) => this.movePage(pageNum)}
                                moveFirstPage={() => this.moveFirstPage()}
                                movePrevPhrase={() => this.movePrevPhrase()}
                                moveNextPhrase={() => this.moveNextPhrase()}
                                moveEndPage={() => this.moveEndPage()}
                            />
                        </div>
                    }
                    {
                        // 게임 결과 조회 부분
                        this.state.gameResultComponent &&
                        <div className={styles.contentWrap}>
                            <GameResult
                                gameTitle={this.state.gameTitle}
                                destroyGameResultComponent={() => {this.destroyGameResultComponent()}}
                                gameResultThText={this.state.gameResultThText}
                                gameResultList={this.state.gameResultList}
                                getGameResult={() => this.getGameResult()}
                                resetPageState={() => this.resetPageState()}
                            />
                            <Pagination
                                currentPage={this.state.resultCurrentPage}
                                endPage={this.state.resultEndPage}
                                movePage={(pageNum) => this.movePage(pageNum)}
                                moveFirstPage={() => this.moveFirstPage()}
                                movePrevPhrase={() => this.movePrevPhrase()}
                                moveNextPhrase={() => this.moveNextPhrase()}
                                moveEndPage={() => this.moveEndPage()}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <ZombieBreak
        trademark={sessionStorage.getItem('userId')}
        uniqueId={sessionStorage.getItem('uniqueId')}
    />,
    document.getElementById('root')
);