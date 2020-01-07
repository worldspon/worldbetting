import React from 'react';
import ReactDOM from 'react-dom';
import createWebSocket from '../config/socketip';
// 쿠키 추출
// import getUUIDFromCookie from '../config/getcookie';
import { encodeUTF8, encodeUTF16, decodeUTF8, decodeUTF16, checkTcpData } from '../config/byteparser';
// import io from 'socket.io-client';
// IE에서 위처럼 하면 script1002 Syntax Error가 남 IE 때문에 밑 구문으로 import 해야함
// import io from '../../node_modules/socket.io-client/dist/socket.io';
import '../common.css';
import styles from './login.css';
import promiseModule from '../config/promise';
import FindAccount from './components/findaccount/findaccount';
import SignUp from './components/signup/signup';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 이미지 로드 카운터
            imagesOnLoad: 0,
            // 애니메이션 바인딩 flag
            iconAnimation: false,
            userId: '',
            userPw: '',
            // 모달 show flag, modal 활성화중에는 애니메이션이 중지된다.
            modal: false,
            // 웹소켓통신을 위한 연결코드
            connectCode: null,
            // 웹소켓 객체
            webSocket: null,
            // 계정찾기 완료시 계정 저장
            findAccount: null,
            // 회원가입 완료시 회원가입 축하 화면 flag
            signUpFlag: false
        };
        this.pwInput = React.createRef();
        this.loginButton = React.createRef();
    }

    // TCP 소켓 연결 코드를 받아오는 통신
    async getConnectCode() {
        try {
            const sendObject = {
                url: 'www.wlotto.net'
            };
            const promiseResult = await promiseModule.post('/api/connect/information', sendObject);
            const codeData = JSON.parse(promiseResult);
            if(codeData.connectCode !== undefined) {
                this.setState({
                    connectCode: codeData.connectCode
                })
            } else {
                throw new Error(codeData.error.message);
            }
        } catch(error) {
            alert(error.message);
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
                    if(command === '1000020') {
                        // 로그인 된 사용자인지 검증
                        this.handleLoginCheckResult(ary.slice(7, ary.length-5));
                    } else if(command === '1000010') {
                        // TCP 서버 로그인 인증
                        this.handleTcpLoginResult(ary.slice(7, ary.length-5));
                    } else if(command === '0100100') {
                        // ID 찾기
                        this.showFindId(ary.slice(7, ary.length-5));
                    } else if(command === '0100000') {
                        // 회원가입
                        this.responseSignUpResult(ary.slice(7, ary.length-5));
                    }
                }
            });

            // force client disconnect from server
            webSocket.on('forceDisconnect', function() {
                webSocket.disconnect();
            })
        
            webSocket.on('disconnect', function() {
            });

            // session에 정보가 남아있으면 로그인 검증
            if(sessionStorage.getItem('uniqueId') !== null && sessionStorage.getItem('userId') !== null) {
                this.tcpLoginCheck();
            } else {
                sessionStorage.clear();
            }
        });
    }

    // 로그인 검증
    tcpLoginCheck() {
        this.loginButton.current.disabled = true;
        const command = encodeUTF8('1000020');
        const content = encodeUTF16(`${sessionStorage.getItem('uniqueId')}|${sessionStorage.getItem('userId')}|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);
        this.state.webSocket.emit('tcpsend', sendData);
        this.loginButton.current.disabled = false;
    }

    // 로그인 검증 결과 처리
    handleLoginCheckResult(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        // 로그인 인증 성공
        if( errorCode === 0 ) {
            // 로비 진입
            location.href ='/';
        } else {
            sessionStorage.clear();
        }
    }

    // 로그인 시도
    tryLogin() {
        this.loginButton.current.disabled = true;
        const command = encodeUTF8('1000010');
        const content = encodeUTF16(this.state.connectCode + `|${this.state.userId}|${this.state.userPw}|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);
        this.state.webSocket.emit('tcpsend', sendData);
    }

    // 로그인 인증 성공시 필요 데이터 통신 시작
    handleTcpLoginResult(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        // 로그인 인증 성공
        if( errorCode === 0 ) {
            const content = decodeUTF16(byteArray.slice(3)).split('|');
            sessionStorage.setItem('uniqueId', content[0]);
            sessionStorage.setItem('userId', content[1]);
            sessionStorage.setItem('level', content[2]);
            location.href='/';
        } else {
            this.loginButton.current.disabled = false;
            // 로그인 인증 실패
            switch (errorCode) {
                case 1:
                    alert('존재하지 않는 사용자입니다.');
                    break;
                case 2:
                    alert('비밀번호가 일치하지않습니다.');
                    break;
                case 3:
                    alert('접속불가 상태입니다.');
                    break;
                case 4:
                    alert('중복접속 상태입니다.');
                    break;
                case 5:
                    alert('메모리에 이미 접속상태입니다.');
                    location.reload();
                    break;
                case 250:
                    alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
                    break;
                case 250:
                    alert('통신이 원활하지 않아 잠시후에 다시 시도해주세요.(DB)');
                    break;
                default:
                    alert('알수없는 오류입니다.');
                    break;
            }
        }
    }

    // 아이디찾기 소켓통신
    requestUserId(tel) {
        const command = encodeUTF8('0100100');
        const content = encodeUTF16(this.state.connectCode + `|${tel}|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    showFindId(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if( errorCode === 0 ) {
            const content = decodeUTF16(byteArray.slice(3)).replace('|', '');
            this.setState({
                findAccount: content
            });
        } else {
            alert('계정을 찾을수 없습니다.');
        }
    }

    // 회원가입 소켓통신
    requestSignUp(userObject) {
        const command = encodeUTF8('0100000');
        const content = encodeUTF16(this.state.connectCode + `|${userObject.id}|${userObject.pw}|${userObject.tel}|${userObject.recommend}|`);
        const endSignal = encodeUTF8('<End>');
        const sendData = command.concat(content).concat(endSignal);

        this.state.webSocket.emit('tcpsend', sendData);
    }

    responseSignUpResult(byteArray) {
        const errorCode = parseInt(byteArray.slice(0,1));
        if( errorCode === 0 ) {
            this.setState({
                signUpFlag: true
            });
        } else if(errorCode === 1) {
            alert('아이디를 네 자 이상 입력해주세요.');
        } else if(errorCode === 2) {
            alert('비밀번호를 한 자 이상 입력해주세요.');
        } else if(errorCode === 3) {
            alert('추천인 아이디가 존재하지않습니다.');
        } else if(errorCode === 4) {
            alert('이미 사용하고 있는 아이디입니다.');
        } else if(errorCode === 5) {
            alert('이미 사용하고 있는 전화번호입니다.');
        } else {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
    }

    // 이미지가 전부 로드 되면 GIF 및 애니메이션 효과 시작
    setImagesLoadCount() {
        this.setState({
            imagesOnLoad: ++this.state.imagesOnLoad
        }, () => {
            if(this.state.imagesOnLoad === 207) {
                this.logoAnimation()
            }
        })
    }

    // 로고 GIF 실행 후 인터벌 등록
    logoAnimation() {
        this.dynamicMainLogo();
        setInterval(() => {
            this.setState({
                iconAnimation: false
            }); 
            this.dynamicMainLogo();
        }, 7500);
    }
    
    // 로고 전체 GIF 효과, 애니메이션 효과를 실행
    dynamicMainLogo() {
        this.dynamicIcon();
        this.dynamicTitle();
        setTimeout(() => {
            this.animationIcon();
        }, 3000);
    }

    // W icon GIF 효과
    dynamicIcon() {
        const iconClass = document.getElementsByClassName(styles.mainIcon);
        let i = 1;
        const iconVisibleInterval = setInterval(() => {
            if(i === 99) {
                iconClass[i-1].style.visibility = 'hidden';
                iconClass[0].style.visibility = 'visible';
            } else {
                iconClass[i-1].style.visibility = 'hidden';
                iconClass[i].style.visibility = 'visible';
            }
            i++;
            if(i > 99) {
                clearInterval(iconVisibleInterval);
            }
        }, 31);
    }

    // WORLDBETTING text GIF 효과
    dynamicTitle() {
        const titleClass = document.getElementsByClassName(styles.mainTitle);
        let i = 1;
        const titleVisibleInterval = setInterval(() => {
            if(i===108) {
                titleClass[i-1].style.visibility = 'hidden';
                titleClass[0].style.visibility = 'visible';
            } else {
                titleClass[i-1].style.visibility = 'hidden';
                titleClass[i].style.visibility = 'visible';
            }
            i++;
            if(i > 108) {
                clearInterval(titleVisibleInterval);
            }
        }, 28);
    }

    // W icon 회전 애니메이션 효과
    animationIcon() {
        this.setState({
            iconAnimation: true
        });
    }

    // id input에 입력 이벤트 발생시 state 최신화
    idInputChange(e) {
        this.setState({
            userId: e.target.value.trim()
        })
    }

    // pw input에 입력 이벤트 발생시 state 최신화
    pwInputChange(e) {
        this.setState({
            userPw: e.target.value.trim()
        })
    }

    // id input에서 enter 입력시 pw input으로 focus 이동
    focusPwInput(e) {
        if(e.key === 'Enter') {
            this.pwInput.current.focus();
        }
    }

    // pw input에서 enter 입력시 로그인시도
    pwInputEnter(e) {
        if(e.key === 'Enter') {
            this.tryLogin();
        }
    }

    // 모달 생성시 로그인 및 component input 초기화
    resetInputValue() {
        this.setState({
            userId: '',
            userPw: '',
            findAccount: null,
            signUpFlag: false
        })
    }

    // 회원가입 모달 생성
    showSignUpModal() {
        this.resetInputValue();
        this.setState({
            modal: 'signUp'
        });
    }
    
    // 계정찾기 모달 생성
    showFindAccountModal() {
        this.resetInputValue();
        this.setState({
            modal: 'findAccount'
        });
    }

    // 모달 숨김
    hideModal() {
        this.setState({
            modal: false
        })
    }

    componentDidMount() {
        // URL별로 다른 연결 코드를 HTTP 통신으로 가져옴
        this.getConnectCode();
        // web socket 연결
        this.connectWebSocket();
    }

    render() {
        // logo image tag JSX 생성
        const logoImgTagArray = [];

        for(let i = 0; i < 108; i++) {
            if(i === 0) {
                logoImgTagArray.push(<img key={`icon${i}`} className={styles.mainIcon + ' ' + `${this.state.modal === false && this.state.iconAnimation ? styles.iconAnimation : ''}`} style={{visibility: 'visible'}} src={require(`../images/logoeffect/logo/main_icon${i}.png`)} onLoad={() => this.setImagesLoadCount()}></img>);
                logoImgTagArray.push(<img key={`title${i}`} className={styles.mainTitle} style={{visibility: 'visible'}} src={require(`../images/logoeffect/title/main_title${i}.png`)} onLoad={() => this.setImagesLoadCount()}></img>);  
            } else if(i<99){
                logoImgTagArray.push(<img key={`icon${i}`} className={styles.mainIcon} src={require(`../images/logoeffect/logo/main_icon${i}.png`)} onLoad={() => this.setImagesLoadCount()}></img>);
                logoImgTagArray.push(<img key={`title${i}`} className={styles.mainTitle} src={require(`../images/logoeffect/title/main_title${i}.png`)} onLoad={() => this.setImagesLoadCount()}></img>);
            } else {
                logoImgTagArray.push(<img key={`title${i}`} className={styles.mainTitle} src={require(`../images/logoeffect/title/main_title${i}.png`)} onLoad={() => this.setImagesLoadCount()}></img>);
            }
        }

        return (
            <div className={styles.loginWrap}>
                {logoImgTagArray}
                <div className={styles.loginBox}>
                    <input
                        className={styles.idInput + ' ' + `${this.state.userId.length <= 3 ? '' : styles.inputCheckImage}`}
                        type="text"
                        placeholder="아이디"
                        maxLength="10"
                        onChange={(e) => this.idInputChange(e)}
                        onKeyPress={(e) => this.focusPwInput(e)}
                        value={this.state.userId}
                    />
                    <input
                        className={styles.pwInput + ' ' + `${this.state.userPw.length <= 0 ? '' : styles.inputCheckImage}`}
                        ref={this.pwInput}
                        type="password"
                        placeholder="비밀번호"
                        onChange={(e) => this.pwInputChange(e)}
                        onKeyPress={(e) => this.pwInputEnter(e)}
                        value={this.state.userPw}
                    />
                    <button
                        className={styles.loginButton}
                        ref={this.loginButton}
                        onClick={() => this.tryLogin()}
                    >로그인
                    </button>
                </div>
                <div className={styles.signUpBox}>
                    <button className={styles.showSignUpFormButton} onClick={() => this.showSignUpModal()}>회원가입</button>
                    <button className={styles.showFindAccountFormButton} onClick={() => this.showFindAccountModal()}>계정찾기</button>
                </div>

                { this.state.modal !== false &&
                    // MODAL COMMON
                    <div className={styles.modalWrap}>
                        <div className={styles.signUpModal}>
                        <button className={styles.closeModalButton} onClick={() => this.hideModal()}>X</button>
                        <div className={styles.modalLogoBox}>
                            <img className={styles.modalLogo} src={require('../images/main_logo.png')} />
                        </div>
                        { this.state.modal === 'findAccount' &&
                            <FindAccount webSocket={this.state.webSocket} checkInputClass={styles.inputCheckImage} requestUserId={(tel) => this.requestUserId(tel)} findAccount={this.state.findAccount} hideModal={() => this.hideModal()} />
                        }
                        { this.state.modal === 'signUp' && 
                            <SignUp checkInputClass={styles.inputCheckImage} requestSignUp={(userObject) => this.requestSignUp(userObject)} signUpFlag={this.state.signUpFlag} hideModal={() => this.hideModal()} />
                        }
                        </div>
                    </div>
                }
            </div>
        )
    }
}


ReactDOM.render(
    <Login />,
    document.getElementById('root')
);