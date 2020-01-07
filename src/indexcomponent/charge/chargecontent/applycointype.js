import React from 'react';
import styles from './applycointype.css';
import QRCode from 'qrcode';


export default class ApplyTypeCoin extends React.Component {
    constructor(props) {
        super(props);
        this.qrImg = React.createRef();
        this.copyButton = React.createRef();
        this.state = {
            selectedCoinName: '',
            selectedCoinWallet: '',
            userCoinWallet: '',
            userCoinQuantity: ''
        }
    }

    // 최초 접속시 props에서 coinlist를 받아 초기 세팅
    static getDerivedStateFromProps(props, state) {
        if(props.companyCoinList.length !== 0 && state.selectedCoinName === '') {
            return {
                selectedCoinName: props.companyCoinList[0].coinName,
                selectedCoinWallet: props.companyCoinList[0].coinWallet
            }
        }
        return null;
    }
    
    // QR코드 생성 함수
    async createQR(text) {
        try {
            const qrURL = await QRCode.toDataURL(text);
            this.qrImg.current.src = qrURL;
        } catch (err) {
            alert('QR코드 생성에 실패하였습니다.');
        }
    }

    // 선택 옵션이 변경되면 state에 반영
    changeCoinIndex(e) {
        this.setState({
            selectedCoinName: e.target.selectedOptions[0].dataset.coinName,
            selectedCoinWallet: e.target.selectedOptions[0].dataset.coinWallet
        }, () => {
            // setState 완료 후
            // 선택된 지갑주소에 해당하는 QR코드 생성
            this.createQR(this.state.selectedCoinWallet);
        })
    }

    // 선택한 지갑 주소를 복사하는 함수
    copyToClipBoard() {
        const copyTextBox = document.createElement('textarea');
        document.body.appendChild(copyTextBox);
        copyTextBox.value = this.state.selectedCoinWallet;
        copyTextBox.select();
        document.execCommand('copy');
        document.body.removeChild(copyTextBox);
        alert('지갑주소가 복사되었습니다.');
    }

    // 유저 지갑주소를 최신화
    setUserCoinWallet(e) {
        this.setState({
            userCoinWallet: e.target.value.trim()
        })
    }

    // 유저 코인수량을 최신화
    setUserCoinQuantity(e) {
        // 숫자 이외의 문자 차단
        const regEx = /[^0-9.]+/gi;
        this.setState({
            userCoinQuantity: e.target.value.replace(regEx, '').trim()
        })
    }

    // 충전신청
    applyToCharge() {
        // 검증을 위한 형 변환
        const userCoinQuantity = parseFloat(this.state.userCoinQuantity);
        if(userCoinQuantity <= 0 || isNaN(userCoinQuantity)) {
            alert('올바른 수량을 입력해주세요.');
            return false;
        }
        const data = `|1||${this.state.selectedCoinName}|${this.state.userCoinWallet}|${this.state.userCoinQuantity}|`;

        this.props.requestChargeExchange(data);
        this.resetInput();
    }

    // input 초기화
    resetInput() {
        this.setState({
            userCoinWallet: '',
            userCoinQuantity: ''
        });
    }

    createCoinListJSX(coinList) {
        const coinListJSX = []
        for(const [index, value] of coinList) {
            coinListJSX.push((
                <option
                    key={index}
                    data-coin-name={value.coinName}
                    data-coin-wallet={value.coinWallet}
                >
                {value.coinName} / {value.coinWallet}
                </option>
            ));
        }

        return coinListJSX;
    }

    componentDidMount() {
        // 코인리스트 재호출
        this.props.requestCompanyCoinList();
    }

    render() {
        // 선택된 코인이 있으면 QR코드 생성
        this.state.selectedCoinWallet === '' ? '' : this.createQR(this.state.selectedCoinWallet);
        
        const coinList = this.createCoinListJSX(this.props.companyCoinList.entries());

        return (
            <div className={styles.chargeContentWrap}>
                <div className={styles.coinTypeWrap}>
                    <div className={styles.coinRow}>
                        <select className={styles.companyCoinWallet} onChange={(e) => this.changeCoinIndex(e)}>
                            {coinList}
                        </select>
                        <button className={styles.walletCopyButton} onClick={() => this.copyToClipBoard()}>복사</button>
                    </div>
                    <div className={styles.walletInfoBox}>
                        <div className={styles.userCoinWrap}>
                            <div className={styles.userInputWrap}>
                                <label htmlFor="userWallet">지갑주소</label>
                                <input
                                    type="text"
                                    name="userWallet"
                                    value={this.state.userCoinWallet}
                                    onChange={(e) => this.setUserCoinWallet(e)}
                                />
                            </div>
                            <div className={styles.userInputWrap}>
                                <label htmlFor="coinCount">수량</label>
                                <input
                                    type="text"
                                    name="coinCount"
                                    value={this.state.userCoinQuantity}
                                    onChange={(e) => this.setUserCoinQuantity(e)}
                                />
                            </div>
                        </div>
                        <img className={styles.qrCodeImg} ref={this.qrImg}></img>
                    </div>
                    <div className={styles.applyCancelBox}>
                        <button className={styles.applyButton} onClick={() => {this.applyToCharge()}}>충전신청</button>
                        <button className={styles.cancelButton} onClick={() => {this.props.destroyModal()}}>취소</button>
                    </div>
                </div>
            </div>
        )
    }
}