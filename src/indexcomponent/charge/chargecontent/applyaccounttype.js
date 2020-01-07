import React from 'react';
import styles from './applyaccounttype.css';


export default class ApplyTypeAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userBank: '',
            userAccount: '',
            chargeMoney: ''
        }
    }

    // 예금주 최신화
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
    setChargeMoney(e) {
        // 숫자 이외의 문자 차단
        const regEx = /[^0-9]+/gi;
        this.setState({
            chargeMoney: e.target.value.replace(regEx, '').trim()
        });
    }

    // 버튼 클릭시 금액 증가
    addChargeMoney(e) {
        const addMoney = parseInt(e.target.dataset.money) * 10000;
        const currentMoney = this.state.chargeMoney === '' ? 0 : parseInt(this.state.chargeMoney);
        this.setState({
            chargeMoney: addMoney + currentMoney
        });
    }

    // 충전신청
    applyToCharge() {
        const chargeMoney = parseInt(this.state.chargeMoney);
        // 0보다 작은금액 또는 숫자가 아닌 금액
        if(chargeMoney <= 0 || isNaN(chargeMoney)) {
            alert('올바른 금액을 입력해주세요.');
            return false;
        } else if(this.inputCheck()) {
            const data = `|1|${this.state.userName}|${this.state.userBank}|${this.state.userAccount}|${this.state.chargeMoney}|`;

            this.props.requestChargeExchange(data);
            this.resetInput();
        } else {
            alert('모든 값을 입력해주세요.');
        }
    }

    inputCheck() {
        if(
            this.state.userName === '' ||
            this.state.userBank === '' ||
            this.state.userAccount === '' ||
            this.state.chargeMoney === ''
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
            chargeMoney: ''
        });
    }

    render() {

        return (
            <div>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}></span>
                    <input type="text" className={styles.companyAccount} value="농협 / 12346843541381" readOnly />
                </div>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>예금주</span>
                    <input
                        type="text"
                        className={styles.depositorName}
                        placeholder="이름"
                        value={this.state.userName}
                        onChange={(e) => this.setUserName(e)}
                    />
                </div>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>계좌</span>
                    <input
                        type="text"
                        className={styles.depositorBank}
                        placeholder="은행명"
                        value={this.state.userBank}
                        onChange={(e) => this.setUserBank(e)}
                    />
                    <input
                        type="text"
                        className={styles.depositorAccount}
                        placeholder="계좌번호"
                        value={this.state.userAccount}
                        onChange={(e) => this.setUserAccount(e)}
                    />
                </div>
                <div className={styles.accountRows}>
                    <span className={styles.rowTitle}>금액</span>
                    <input
                        type="text"
                        className={styles.depositMoney}
                        placeholder="직접입력"
                        value={this.state.chargeMoney}
                        onChange={(e) => this.setChargeMoney(e)}
                    />
                </div>
                <div className={styles.accountRows + ' ' + styles.moneyButtonWrap}>
                    <span className={styles.rowTitle}></span>
                    <button
                        className={styles.moneyButton}
                        data-money='1'
                        onClick={(e) => this.addChargeMoney(e)}
                    >1만원
                    </button>
                    <button
                        className={styles.moneyButton}
                        data-money='5'
                        onClick={(e) => this.addChargeMoney(e)}
                    >5만원
                    </button>
                    <button
                        className={styles.moneyButton}
                        data-money='10'
                        onClick={(e) => this.addChargeMoney(e)}
                    >10만원
                    </button>
                    <button
                        className={styles.moneyButton}
                        data-money='50'
                        onClick={(e) => this.addChargeMoney(e)}
                    >50만원
                    </button>
                </div>
                <div className={styles.applyCancelBox}>
                    <button className={styles.applyButton} onClick={() => this.applyToCharge()}>충전신청</button>
                    <button className={styles.cancelButton} onClick={() => this.props.destroyModal()}>취소</button>
                </div>
            </div>
        )
    }
}