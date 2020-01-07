import React from 'react';
import styles from './typepad.css';

export default class TypePad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
            day: new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={styles.bettingChoiceBox}>
                <div className={styles.bettingGameTitleBox}>
                    <img className={styles.ballIcon} src={require('../../../images/ball_icon.png')} />
                    <h2 className={styles.currentGameTitle}>
                        {this.props.gameTitle} {this.state.year}-{this.state.month}-{this.state.day} {this.props.gameRound}회차 잔여금액 : {new Intl.NumberFormat().format(this.props.totalBettingLimit - this.props.currentTotalBettingMoney)}
                    </h2>
                </div>
                { React.cloneElement(
                    this.props.buttonPad,
                    {
                        selectBettingTypeNum:this.props.selectBettingTypeNum,
                        changeSelectBettingTypeNum: (typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)
                    })
                }
            </div>
                   
        )
    }
}