import React from "react";
import ReactDOM from "react-dom";
import createWebSocket from "../config/socketip";
import {
  encodeUTF8,
  encodeUTF16,
  decodeUTF8,
  decodeUTF16,
  checkTcpData
} from "../config/byteparser";
// import io from 'socket.io-client';
// IE에서 위처럼 하면 script1002 Syntax Error가 남 IE 때문에 밑 구문으로 import 해야함
// import io from '../../node_modules/socket.io-client/dist/socket.io';
import "../common.css";
import styles from "./login.css";
import promiseModule from "../config/promise";
import FindAccount from "./components/findaccount/findaccount";
import SignUp from "./components/signup/signup";
import LanguagePack from "../lang/langpack";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 이미지 로드 카운터
      imagesOnLoad: 0,
      // 애니메이션 바인딩 flag
      iconAnimation: false,
      userId: "",
      userPw: "",
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

  getConnectURL() {
    const url = location.href;
    if (url.includes("wbet")) {
      return "www.wbet2020.com";
    } else if (url.includes("betsamples")) {
      return "www.betsamples.com";
    } else if (url.includes("p20")) {
      return "www.p20ball.com";
    } else if (url.includes("o20")) {
      return "www.o20ball.com";
    } else if (url.includes("n20")) {
      return "www.n20ball.com";
    } else if (url.includes("b20")) {
      return "www.b20ball.com";
    } else if (url.includes("wbc20.com")) {
      return "www.wbc20.com";
    } else if (url.includes("wbc20.net")) {
      return "www.wbc20.net";
    }
  }

  // TCP 소켓 연결 코드를 받아오는 통신
  async getConnectCode() {
    try {
      const sendObject = {
        // 로컬작업용
        url: "www.wbet2020.com"
        // url: this.getConnectURL()
      };
      const promiseResult = await promiseModule.post(
        "/api/connect/information",
        sendObject
      );
      const codeData = JSON.parse(promiseResult);
      if (codeData.connectCode !== undefined) {
        this.setState({
          connectCode: codeData.connectCode
        });
      } else {
        throw new Error(codeData.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  changeLanguage(type) {
    // sessionStorage.setItem('lang', type);
    alert("준비중입니다");
  }

  // 웹 소켓 연결
  connectWebSocket() {
    const webSocket = createWebSocket();
    this.setState({
      webSocket: webSocket
    });
    webSocket.on("connect", () => {
      webSocket.on("tcpReceive", data => {
        const reciveArray = new Uint8Array(data);
        const dataArray = checkTcpData(reciveArray);

        for (const ary of dataArray) {
          const command = decodeUTF8(ary.slice(0, 7));
          if (command === "1000020") {
            // 로그인 된 사용자인지 검증
            this.handleLoginCheckResult(ary.slice(7, ary.length - 5));
          } else if (command === "1000010") {
            // TCP 서버 로그인 인증
            this.handleTcpLoginResult(ary.slice(7, ary.length - 5));
          } else if (command === "0100100") {
            // ID 찾기
            this.showFindId(ary.slice(7, ary.length - 5));
          } else if (command === "0100000") {
            // 회원가입
            this.responseSignUpResult(ary.slice(7, ary.length - 5));
          }
        }
      });

      // force client disconnect from server
      webSocket.on("forceDisconnect", function() {
        webSocket.disconnect();
      });

      webSocket.on("disconnect", function() {});

      // session에 정보가 남아있으면 로그인 검증
      if (
        sessionStorage.getItem("uniqueId") !== null &&
        sessionStorage.getItem("userId") !== null
      ) {
        this.tcpLoginCheck();
      } else {
        sessionStorage.clear();
      }
    });
  }

  // 로그인 검증
  tcpLoginCheck() {
    this.loginButton.current.disabled = true;
    const command = encodeUTF8("1000020");
    const content = encodeUTF16(
      `${sessionStorage.getItem("uniqueId")}|${sessionStorage.getItem(
        "userId"
      )}|`
    );
    const endSignal = encodeUTF8("<End>");
    const sendData = command.concat(content).concat(endSignal);
    this.state.webSocket.emit("tcpsend", sendData);
    this.loginButton.current.disabled = false;
  }

  // 로그인 검증 결과 처리
  handleLoginCheckResult(byteArray) {
    const errorCode = parseInt(byteArray.slice(0, 1));
    // 로그인 인증 성공
    if (errorCode === 0) {
      // 로비 진입
      location.href = "/";
    } else {
      sessionStorage.clear();
    }
  }

  // 로그인 시도
  tryLogin() {
    this.loginButton.current.disabled = true;
    const command = encodeUTF8("1000010");
    const content = encodeUTF16(
      this.state.connectCode + `|${this.state.userId}|${this.state.userPw}|`
    );
    const endSignal = encodeUTF8("<End>");
    const sendData = command.concat(content).concat(endSignal);
    this.state.webSocket.emit("tcpsend", sendData);
  }

  // 로그인 인증 성공시 필요 데이터 통신 시작
  handleTcpLoginResult(byteArray) {
    const errorCode = parseInt(byteArray.slice(0, 1));
    // 로그인 인증 성공
    if (errorCode === 0) {
      const content = decodeUTF16(byteArray.slice(3)).split("|");
      sessionStorage.setItem("uniqueId", content[0]);
      sessionStorage.setItem("userId", content[1]);
      sessionStorage.setItem("level", content[2]);
      sessionStorage.setItem("code", this.state.connectCode);
      location.href = "/";
    } else {
      this.loginButton.current.disabled = false;
      // 로그인 인증 실패
      switch (errorCode) {
        case 1:
          // 존재하지 않는 사용자
          alert(this.props.langPack.alert.noUser);
          break;
        case 2:
          // 비밀번호 불일치
          alert(this.props.langPack.alert.pwWrong);
          break;
        case 3:
          // 접속불가 상태
          alert(this.props.langPack.alert.connectError);
          break;
        case 4:
          // 중복접속 상태
          alert(this.props.langPack.alert.doubleConnect);
          break;
        case 5:
          // 메모리에 이미 접속상태
          alert(this.props.langPack.alert.memory);
          location.reload();
          break;
        case 250:
          // DB 연결 에러
          alert(this.props.langPack.alert.connectErrorDB);
          break;
        case 250:
          // DB 연결 에러
          alert(this.props.langPack.alert.connectErrorDB);
          break;
        default:
          // 알수없는 오류
          alert(this.props.langPack.alert.default);
          break;
      }
    }
  }

  // 아이디찾기 소켓통신
  requestUserId(tel) {
    const command = encodeUTF8("0100100");
    const content = encodeUTF16(this.state.connectCode + `|${tel}|`);
    const endSignal = encodeUTF8("<End>");
    const sendData = command.concat(content).concat(endSignal);

    this.state.webSocket.emit("tcpsend", sendData);
  }

  showFindId(byteArray) {
    const errorCode = parseInt(byteArray.slice(0, 1));
    if (errorCode === 0) {
      const content = decodeUTF16(byteArray.slice(3)).replace("|", "");
      this.setState({
        findAccount: content
      });
    } else {
      // 계정을 찾을 수 없습니다.
      alert(this.props.langPack.alert.failedFindAccount);
    }
  }

  // 회원가입 소켓통신
  requestSignUp(userObject) {
    const command = encodeUTF8("0100000");
    const content = encodeUTF16(
      this.state.connectCode +
        `|${userObject.id}|${userObject.pw}|${userObject.tel}|${userObject.recommend}|`
    );
    const endSignal = encodeUTF8("<End>");
    const sendData = command.concat(content).concat(endSignal);

    this.state.webSocket.emit("tcpsend", sendData);
  }

  responseSignUpResult(byteArray) {
    const errorCode = parseInt(byteArray.slice(0, 1));
    if (errorCode === 0) {
      this.setState({
        signUpFlag: true
      });
    } else if (errorCode === 1) {
      // 아이디를 네 자 이상 입력해주세요
      alert(this.props.langPack.alert.idLength);
    } else if (errorCode === 2) {
      // 비밀번호를 네 자 이상 입력해주세요
      alert(this.props.langPack.alert.pwLength);
    } else if (errorCode === 3) {
      // 추천인 아이디가 존재하지않습니다.
      alert(this.props.langPack.alert.noReferrer);
    } else if (errorCode === 4) {
      // 이미 사용하고 있는 아이디
      alert(this.props.langPack.alert.existId);
    } else if (errorCode === 5) {
      // 이미 사용하고 있는 전화번호
      alert(this.props.langPack.alert.existPh);
    } else {
      // 알수없는 오류
      alert(this.props.langPack.alert.default);
    }
  }

  // 이미지가 전부 로드 되면 GIF 및 애니메이션 효과 시작
  setImagesLoadCount() {
    this.setState(
      {
        imagesOnLoad: ++this.state.imagesOnLoad
      },
      () => {
        if (this.state.imagesOnLoad === 207) {
          this.logoAnimation();
        }
      }
    );
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
      if (i === 99) {
        iconClass[i - 1].style.visibility = "hidden";
        iconClass[0].style.visibility = "visible";
      } else {
        iconClass[i - 1].style.visibility = "hidden";
        iconClass[i].style.visibility = "visible";
      }
      i++;
      if (i > 99) {
        clearInterval(iconVisibleInterval);
      }
    }, 31);
  }

  // WORLDBETTING text GIF 효과
  dynamicTitle() {
    const titleClass = document.getElementsByClassName(styles.mainTitle);
    let i = 1;
    const titleVisibleInterval = setInterval(() => {
      if (i === 108) {
        titleClass[i - 1].style.visibility = "hidden";
        titleClass[0].style.visibility = "visible";
      } else {
        titleClass[i - 1].style.visibility = "hidden";
        titleClass[i].style.visibility = "visible";
      }
      i++;
      if (i > 108) {
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
    });
  }

  // pw input에 입력 이벤트 발생시 state 최신화
  pwInputChange(e) {
    this.setState({
      userPw: e.target.value.trim()
    });
  }

  // id input에서 enter 입력시 pw input으로 focus 이동
  focusPwInput(e) {
    if (e.key === "Enter") {
      this.pwInput.current.focus();
    }
  }

  // pw input에서 enter 입력시 로그인시도
  pwInputEnter(e) {
    if (e.key === "Enter") {
      this.tryLogin();
    }
  }

  // 모달 생성시 로그인 및 component input 초기화
  resetInputValue() {
    this.setState({
      userId: "",
      userPw: "",
      findAccount: null,
      signUpFlag: false
    });
  }

  // 회원가입 모달 생성
  showSignUpModal() {
    this.resetInputValue();
    this.setState({
      modal: "signUp"
    });
  }

  // 계정찾기 모달 생성
  showFindAccountModal() {
    this.resetInputValue();
    this.setState({
      modal: "findAccount"
    });
  }

  // 모달 숨김
  hideModal() {
    this.setState({
      modal: false
    });
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

    for (let i = 0; i < 108; i++) {
      if (i === 0) {
        logoImgTagArray.push(
          <img
            key={`icon${i}`}
            className={
              styles.mainIcon +
              " " +
              `${
                this.state.modal === false && this.state.iconAnimation
                  ? styles.iconAnimation
                  : ""
              }`
            }
            style={{ visibility: "visible" }}
            src={require(`../images/logoeffect/logo/main_icon${i}.png`)}
            onLoad={() => this.setImagesLoadCount()}
          ></img>
        );
        logoImgTagArray.push(
          <img
            key={`title${i}`}
            className={styles.mainTitle}
            style={{ visibility: "visible" }}
            src={require(`../images/logoeffect/title/main_title${i}.png`)}
            onLoad={() => this.setImagesLoadCount()}
          ></img>
        );
      } else if (i < 99) {
        logoImgTagArray.push(
          <img
            key={`icon${i}`}
            className={styles.mainIcon}
            src={require(`../images/logoeffect/logo/main_icon${i}.png`)}
            onLoad={() => this.setImagesLoadCount()}
          ></img>
        );
        logoImgTagArray.push(
          <img
            key={`title${i}`}
            className={styles.mainTitle}
            src={require(`../images/logoeffect/title/main_title${i}.png`)}
            onLoad={() => this.setImagesLoadCount()}
          ></img>
        );
      } else {
        logoImgTagArray.push(
          <img
            key={`title${i}`}
            className={styles.mainTitle}
            src={require(`../images/logoeffect/title/main_title${i}.png`)}
            onLoad={() => this.setImagesLoadCount()}
          ></img>
        );
      }
    }

    return (
      <div className={styles.loginWrap}>
        {logoImgTagArray}
        <div className={styles.loginBox}>
          <input
            className={
              styles.idInput +
              " " +
              `${this.state.userId.length <= 3 ? "" : styles.inputCheckImage}`
            }
            type="text"
            placeholder="ID"
            maxLength="10"
            onChange={e => this.idInputChange(e)}
            onKeyPress={e => this.focusPwInput(e)}
            value={this.state.userId}
          />
          <input
            className={
              styles.pwInput +
              " " +
              `${this.state.userPw.length <= 0 ? "" : styles.inputCheckImage}`
            }
            ref={this.pwInput}
            type="password"
            placeholder="Password"
            onChange={e => this.pwInputChange(e)}
            onKeyPress={e => this.pwInputEnter(e)}
            value={this.state.userPw}
          />
          <button
            className={styles.loginButton}
            ref={this.loginButton}
            onClick={() => this.tryLogin()}
          >
            {this.props.langPack.button.login}
          </button>
        </div>
        <div className={styles.signUpBox}>
          <button
            className={styles.showSignUpFormButton}
            onClick={() => this.showSignUpModal()}
          >
            {this.props.langPack.button.signUp}
          </button>
          <button
            className={styles.showFindAccountFormButton}
            onClick={() => this.showFindAccountModal()}
          >
            {this.props.langPack.button.findAccount}
          </button>
        </div>
        <div className={styles.downloadBox}>
          <div className={styles.pcDownloadBox}>
            <a href="http://worldupdate.biz/worldbet/wsetup.zip">
              <img src={require("../images/pc_icon.png")} />
              <span className={styles.downloadSpan}>
                {this.props.langPack.download.pc}
              </span>
            </a>
          </div>
          <div className={styles.mobileDownloadBox}>
            <a href="http://worldupdate.biz/worldbet/worldbetting.apk">
              <img src={require("../images/mobile_icon.png")} />
              <span className={styles.downloadSpan}>
                {this.props.langPack.download.mobile}
              </span>
            </a>
          </div>
          <div className={styles.printDownloadBox}>
            <a href="/guide" target="_blank">
              <img src={require("../images/print_icon.png")} />
              <span className={styles.downloadSpan}>
                {this.props.langPack.download.guide}
              </span>
            </a>
          </div>
        </div>
        <div className={styles.topHeader}>
          <img
            src={require("../images/ko_flag.png")}
            className={styles.flagImage}
            onClick={() => this.changeLanguage("ko")}
          />
          <img
            src={require("../images/uk_flag.png")}
            className={styles.flagImage}
            onClick={() => this.changeLanguage("uk")}
          />
          <img
            src={require("../images/ch_flag.png")}
            className={styles.flagImage}
            onClick={() => this.changeLanguage("ch")}
          />
          <img
            src={require("../images/jp_flag.png")}
            className={styles.flagImage}
            onClick={() => this.changeLanguage("jp")}
          />
        </div>

        {this.state.modal !== false && (
          // MODAL COMMON
          <div className={styles.modalWrap}>
            <div className={styles.signUpModal}>
              <button
                className={styles.closeModalButton}
                onClick={() => this.hideModal()}
              >
                X
              </button>
              <div className={styles.modalLogoBox}>
                <img
                  className={styles.modalLogo}
                  src={require("../images/main_logo.png")}
                />
              </div>
              {this.state.modal === "findAccount" && (
                <FindAccount
                  langPack={this.props.langPack.findAccount}
                  webSocket={this.state.webSocket}
                  checkInputClass={styles.inputCheckImage}
                  requestUserId={tel => this.requestUserId(tel)}
                  findAccount={this.state.findAccount}
                  hideModal={() => this.hideModal()}
                />
              )}
              {this.state.modal === "signUp" && (
                <SignUp
                  langPack={this.props.langPack.signUp}
                  checkInputClass={styles.inputCheckImage}
                  requestSignUp={userObject => this.requestSignUp(userObject)}
                  signUpFlag={this.state.signUpFlag}
                  hideModal={() => this.hideModal()}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

sessionStorage.getItem("lang") === null
  ? sessionStorage.setItem("lang", "ko")
  : "";

ReactDOM.render(
  <Login langPack={LanguagePack[sessionStorage.getItem("lang")].login} />,
  document.getElementById("root")
);
