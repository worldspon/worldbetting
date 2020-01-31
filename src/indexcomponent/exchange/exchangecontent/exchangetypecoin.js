import React from 'react';
import styles from './exchangetypecoin.css';


export default class ApplyCoinType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coinName: '',
            coinWallet: '',
            exchangeMoney: ''
        }
    }

    // 유저 코인명 최신화
    setUserCoinName(e) {
        this.setState({
            coinName: e.target.value.trim()
        })
    }

    // 유저 지갑주소를 최신화
    setUserCoinWallet(e) {
        this.setState({
            coinWallet: e.target.value.trim()
        });
    }

    // 금액 최신화
    setExchangeMoney(e) {
        // 숫자 이외의 문자 차단
        const regEx = /[^0-9.]+/gi;
        this.setState({
            exchangeMoney: e.target.value.replace(regEx, '').trim()
        });
    }

    // 버튼 클릭시 금액 증가
    addExchangeMoney(e) {
        const addMoney = parseFloat(e.target.dataset.money) * 10000;
        const currentMoney = this.state.exchangeMoney === '' ? 0 : parseFloat(this.state.exchangeMoney);
        this.setState({
            exchangeMoney: addMoney + currentMoney
        });
    }

    // 환전신청
    applyToExchange() {
        const exchangeMoney = parseFloat(this.state.exchangeMoney);
        // 0보다 작은금액 또는 숫자가 아닌 금액 또는 출금 가능금액 이하
        if(exchangeMoney <= 0 || isNaN(exchangeMoney) || this.props.userPoint < exchangeMoney) {
            alert(this.props.langPack.alert.errorExchangeMoney);
            return false;
        } else if (this.inputCheck()) {
            const data = `|0||${this.state.coinName}|${this.state.coinWallet}|${this.state.exchangeMoney}|`;

            this.props.requestChargeExchange(data);
            this.resetInput();
        } else {
            alert(this.props.langPack.alert.errorExchangeInput);
        }
    }

    // input에 모든 값이 기입됐는지 확인
    inputCheck() {
        if(
            this.state.coinName === '' ||
            this.state.coinWallet === '' ||
            this.state.exchangeMoney === ''
        ) {
            return false;
        } else {
            return true;
        }
    }

    // input 초기화
    resetInput() {
        this.setState({
            coinName: '',
            coinWallet: '',
            exchangeMoney: ''
        });
    }

    render() {
        return (
            <div className={styles.coinTypeWrap}>
                <p className={styles.possibleMoney}>{this.props.langPack.withdrawable} : {new Intl.NumberFormat().format(this.props.userPoint)}</p>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>{this.props.langPack.coinName}</span>
                    <input
                        type="text"
                        className={styles.exchangeCoin}
                        value={this.state.coinName}
                        onChange={(e) => this.setUserCoinName(e)}
                        placeholder="coin name"
                    />
                </div>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>{this.props.langPack.wallet}</span>
                    <input
                        type="text"
                        className={styles.userWallet}
                        value={this.state.coinWallet}
                        onChange={(e) => this.setUserCoinWallet(e)}
                        placeholder="wallet"
                    />
                </div>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>{this.props.langPack.money}</span>
                    <input 
                        ype="text"
                        className={styles.exchangeMoney}
                        value={this.state.exchangeMoney}
                        onChange={(e) => this.setExchangeMoney(e)}
                        placeholder="money"
                    />
                </div>
                <div className={styles.accountRows + ' ' + styles.moneyButtonWrap}>
                    <span className={styles.rowTitle}></span>
                    <button
                        className={styles.moneyButton}
                        data-money='1'
                        onClick={(e) => this.addExchangeMoney(e)}
                    >1만원
                    </button>
                    <button
                        className={styles.moneyButton}
                        data-money='5'
                        onClick={(e) => this.addExchangeMoney(e)}
                    >5만원
                    </button>
                    <button
                        className={styles.moneyButton}
                        data-money='10'
                        onClick={(e) => this.addExchangeMoney(e)}
                    >10만원
                    </button>
                    <button
                        className={styles.moneyButton}
                        data-money='50'
                        onClick={(e) => this.addExchangeMoney(e)}
                    >50만원
                    </button>
                </div>
                <div className={styles.applyCancelBox}>
                    <button className={styles.applyButton} onClick={() => this.applyToExchange()}>{this.props.langPack.applyExchange}</button>
                    <button className={styles.cancelButton} onClick={() => {this.props.destroyModal()}}>{this.props.langPack.cancel}</button>
                </div>
            </div>
        )
    }
}