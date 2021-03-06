import React from 'react';
import styles from './exchangetypeaccount.css';


export default class ApplyAccountType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userBank: '',
            userAccount: '',
            exchangeMoney: ''
        }
    }

    // 입금자 최신화
    setUserName(e) {
        this.setState({
            userName: e.target.value.trim()
        });
    }

    // 은행명 최신화
    setUserBank(e) {
        this.setState({
            userBank: e.target.value.trim()
        });
    }

    // 계좌번호 최신화
    setUserAccount(e) {
        // 숫자 이외의 문자 차단
        const regEx = /[^0-9]+/gi;
        this.setState({
            userAccount: e.target.value.replace(regEx, '').trim()
        });
    }

    // 금액 최신화
    setExchangeMoney(e) {
        // 숫자 이외의 문자 차단
        const regEx = /[^0-9]+/gi;
        this.setState({
            exchangeMoney: e.target.value.replace(regEx, '').trim()
        });
    }

    // 버튼 클릭시 금액 증가
    addExchangeMoney(e) {
        const addMoney = parseInt(e.target.dataset.money) * 10000;
        const currentMoney = this.state.exchangeMoney === '' ? 0 : parseInt(this.state.exchangeMoney);
        this.setState({
            exchangeMoney: addMoney + currentMoney
        });
    }

    // 환전신청
    applyToExchange() {
        const exchangeMoney = parseInt(this.state.exchangeMoney);
        // 0보다 작은금액 또는 숫자가 아닌 금액 또는 출금 가능금액 이하
        if(exchangeMoney <= 0 || isNaN(exchangeMoney) || this.props.userPoint < exchangeMoney) {
            alert(this.props.langPack.errorExchangeMoney);
            return false;
        } else if (this.inputCheck()) {
            const data = `|2|${this.state.userName}|${this.state.userBank}|${this.state.userAccount}|${this.state.exchangeMoney}|`;

            this.props.requestChargeExchange(data);
            this.resetInput();
        } else {
            alert(this.props.langPack.errorExchangeInput);
        }
    }

    // input에 모든 값이 기입됐는지 확인
    inputCheck() {
        if(
            this.state.userName === '' ||
            this.state.userBank === '' ||
            this.state.userAccount === '' ||
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
            userName: '',
            userBank: '',
            userAccount: '',
            exchangeMoney: ''
        });
    }

    render() {
        return (
            <div>
                <p className={styles.possibleMoney}>{this.props.langPack.withdrawable} : {new Intl.NumberFormat().format(this.props.userPoint)}</p>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>{this.props.langPack.user}</span>
                    <input
                        type="text"
                        className={styles.accountUserName}
                        value={this.state.userName}
                        placeholder="name"
                        onChange={(e) => this.setUserName(e)}
                    />
                </div>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>{this.props.langPack.account}</span>
                    <input
                        type="text"
                        className={styles.accountBank}
                        placeholder="bank name"
                        value={this.state.userBank}
                        onChange={(e) => this.setUserBank(e)}
                    />
                    <input
                        type="text"
                        className={styles.accountNumber}
                        placeholder="account"
                        value={this.state.userAccount}
                        onChange={(e) => this.setUserAccount(e)}
                    />
                </div>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>{this.props.langPack.money}</span>
                    <input
                        type="text"
                        className={styles.exchangeMoney}
                        placeholder="money"
                        value={this.state.exchangeMoney}
                        onChange={(e) => this.setExchangeMoney(e)}
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
                    <button className={styles.applyButton} onClick={() => this.applyToExchange()}>{this.props.langPack.exchangeApply}</button>
                    <button className={styles.cancelButton} onClick={() => {this.props.destroyModal()}}>{this.props.langPack.cancel}</button>
                </div>
            </div>
        )
    }
}