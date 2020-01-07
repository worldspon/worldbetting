import React from 'react';
import styles from './slippad.css';

export default class SlipPad extends React.Component {
    constructor(props) {
        super(props);
    }

    // 베팅 머니를 최신화 하는 함수를 버튼 클릭 이벤트에 바인딩
    bindBettingMoneyChangeEvent() {
        const bettingNumberButtonClass = styles.bettingNumberButton;
        const buttonClassArray = document.getElementsByClassName(bettingNumberButtonClass);
        for(const buttonClass of buttonClassArray) {
            buttonClass.addEventListener('click', (e)=>{
                this.props.changeBettingMoney(parseInt(e.target.dataset.money) * 10000);
            })
        }
    }

    // 유저 입력으로 베팅 금액을 변경
    userInputBettingMoney() {
        const userInput = prompt('베팅 금액을 입력해주세요.');
        if(userInput !== null) {
            if(parseInt(userInput) < 0 || isNaN(userInput)) {
                alert('올바른 금액을 입력해주세요.');
            } else {
                this.props.changeBettingMoney(parseInt(userInput), true);
            }
        }
    }

    componentDidMount() {
        // 모든 숫자 버튼에 이벤트 바인딩
        this.bindBettingMoneyChangeEvent();
    }

    render() {
        return (
            <div className={styles.bettingSlipBox}>
                <div className={styles.bettingSlipTitleBox}>
                    <p className={styles.bettingSlipTitle}>BET SLIP</p>
                    <button className={styles.bettingAllClearButton} onClick={() => {
                        this.props.bettingAllClear();
                    }}>전체 초기화</button>
                </div>
                <div className={styles.bettingSlipNumberBox}>
                    <p
                        className={styles.bettingMoney}
                        onClick={() => this.userInputBettingMoney()}
                    >{Intl.NumberFormat().format(parseFloat(this.props.bettingMoney))}</p>
                    <div className={styles.bettingNumberRow}>
                        <button
                            className={styles.bettingNumberButton}
                            data-money='1'
                        >1</button>
                        <button
                            className={styles.bettingNumberButton}
                            data-money='3'
                        >3</button>
                    </div>
                    <div className={styles.bettingNumberRow}>
                        <button
                            className={styles.bettingNumberButton}
                            data-money='5'
                        >5</button>
                        <button
                            className={styles.bettingNumberButton}
                            data-money='10'
                        >10</button>
                    </div>
                    <div className={styles.bettingNumberRow}>
                        <button
                            className={styles.bettingNumberButton}
                            data-money='20'
                        >20</button>
                        <button
                            className={styles.bettingNumberButton}
                            data-money='30'
                        >30</button>
                    </div>
                    <div className={styles.bettingNumberRow}>
                        <button
                            className={styles.bettingNumberButton}
                            data-money='50'
                        >50</button>
                        <button
                            className={styles.bettingNumberButton}
                            data-money='100'
                        >100</button>
                    </div>
                    <div className={styles.bettingNumberRow}>
                        <button className={styles.bettingNumberClearButton} onClick={() => {
                            this.props.bettingMoneyClear();
                        }}>C</button>
                    </div>
                    <div className={styles.bettingNumberRow}>
                        <button className={styles.bettingButton} onClick={() => this.props.gameBetting()}>베팅하기</button>
                    </div>
                </div>
            </div>
        )
    }
}