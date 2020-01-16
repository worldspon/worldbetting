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
            alert('올바른 금액을 입력해주세요.');
            return false;
        } else if (this.inputCheck()) {
            const data = `|2|${this.state.userName}|${this.state.userBank}|${this.state.userAccount}|${this.state.exchangeMoney}|`;

            this.props.requestChargeExchange(data);
            this.resetInput();
        } else {
            alert('모든 값을 입력해주세요.');
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
                <p className={styles.possibleMoney}>출금 가능 금액 : {new Intl.NumberFormat().format(this.props.userPoint)}</p>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>예금주</span>
                    <input
                        type="text"
                        className={styles.accountUserName}
                        value={this.state.userName}
                        placeholder="이름"
                        onChange={(e) => this.setUserName(e)}
                    />
                </div>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>계좌</span>
                    <input
                        type="text"
                        className={styles.accountBank}
                        placeholder="은행명"
                        value={this.state.userBank}
                        onChange={(e) => this.setUserBank(e)}
                    />
                    <input
                        type="text"
                        className={styles.accountNumber}
                        placeholder="계좌번호"
                        value={this.state.userAccount}
                        onChange={(e) => this.setUserAccount(e)}
                    />
                </div>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>금액</span>
                    <input
                        type="text"
                        className={styles.exchangeMoney}
                        placeholder="직접입력"
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
                    <button className={styles.applyButton} onClick={() => this.applyToExchange()}>환전신청</button>
                    <button className={styles.cancelButton} onClick={() => {this.props.destroyModal()}}>취소</button>
                </div>
            </div>
        )
    }
}