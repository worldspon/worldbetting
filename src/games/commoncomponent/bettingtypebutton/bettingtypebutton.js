import React from 'react';
import styles from './bettingtypebutton.css';

export default class BettingTypeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorClass: this.props.color === 'blue' ? styles.bettingBlueButton : this.props.color === 'red' ? styles.bettingRedButton : styles.bettingGrayButton
        };
    }

    render() {
        return (
            <button
                className={
                    styles.bettingTypeButton + ' ' +
                    this.state.colorClass + ' ' +
                    (this.props.selectBettingTypeNum === this.props.bettingTypeNum ? styles.bettingTypeButtonSelect : '')
                }
                onClick={() => this.props.changeSelectBettingTypeNum(this.props.bettingTypeNum, this.props.min, this.props.max)}
            >
                <span className={styles.bettingType}>{this.props.bettingTitle}</span>
                <span className={styles.bettingAllocation}>배당률 : {this.props.allocation}</span>
                <span className={styles.bettingMoney}>({this.props.min} / {this.props.max})</span>
                {/* <span className={styles.bettingAllocation}>최대 : 1000</span> */}
            </button>
        )
    }
}