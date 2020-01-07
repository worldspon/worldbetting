import React from 'react';
import styles from './buttonpad.css';
import BettingTypeButton from '../commonComponent/bettingtypebutton/bettingtypebutton';

export default class ButtonPad extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.bettingButtonBoard}>
                <div className={styles.bettingCategoryBox + ' ' + styles.bettingLeftRight}>
                    <span className={styles.bettingCategoryTitle}>
                        왼쪽 / 오른쪽
                    </span>
                    <div className={styles.leftRightInnerWrap}>
                        <div className={styles.bettingTypeButtonBox}>
                            <BettingTypeButton
                                bettingTitle={'홀'}
                                color='blue'
                                bettingTypeNum={11}
                                max={this.props.minMaxBetting[4]}
                                min={this.props.minMaxBetting[5]}
                                allocation={this.props.allocation[2]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'짝'}
                                color='red'
                                bettingTypeNum={13}
                                max={this.props.minMaxBetting[4]}
                                min={this.props.minMaxBetting[5]}
                                allocation={this.props.allocation[2]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'언더'}
                                color='blue'
                                bettingTypeNum={15}
                                max={this.props.minMaxBetting[6]}
                                min={this.props.minMaxBetting[7]}
                                allocation={this.props.allocation[3]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'오버'}
                                color='red'
                                bettingTypeNum={17}
                                max={this.props.minMaxBetting[6]}
                                min={this.props.minMaxBetting[7]}
                                allocation={this.props.allocation[3]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                        </div>
                        <div className={styles.bettingTypeButtonBox}>
                            <BettingTypeButton
                                bettingTitle={'홀'}
                                color='blue'
                                bettingTypeNum={12}
                                max={this.props.minMaxBetting[8]}
                                min={this.props.minMaxBetting[9]}
                                allocation={this.props.allocation[4]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'짝'}
                                color='red'
                                bettingTypeNum={14}
                                max={this.props.minMaxBetting[8]}
                                min={this.props.minMaxBetting[9]}
                                allocation={this.props.allocation[4]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'언더'}
                                color='blue'
                                bettingTypeNum={16}
                                max={this.props.minMaxBetting[10]}
                                min={this.props.minMaxBetting[11]}
                                allocation={this.props.allocation[5]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'오버'}
                                color='red'
                                bettingTypeNum={18}
                                max={this.props.minMaxBetting[10]}
                                min={this.props.minMaxBetting[11]}
                                allocation={this.props.allocation[5]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.bettingCategoryBox + ' ' + styles.bettingWinLose}>
                    <span className={styles.bettingCategoryTitle}>
                        승패결과(총격파수)
                    </span>
                    <div className={styles.winLoseInnerWrap}>
                        <div className={styles.bettingTypeButtonBox}>
                            <BettingTypeButton
                                bettingTitle={'왼쪽'}
                                color='gray'
                                bettingTypeNum={21}
                                max={this.props.minMaxBetting[0]}
                                min={this.props.minMaxBetting[1]}
                                allocation={this.props.allocation[0]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'언더 + 왼쪽'}
                                color='blue'
                                bettingTypeNum={24}
                                max={this.props.minMaxBetting[12]}
                                min={this.props.minMaxBetting[13]}
                                allocation={this.props.allocation[6]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'오버 + 왼쪽'}
                                color='red'
                                bettingTypeNum={27}
                                max={this.props.minMaxBetting[12]}
                                min={this.props.minMaxBetting[13]}
                                allocation={this.props.allocation[6]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                        </div>
                        <div className={styles.bettingTypeButtonBox}>
                            <BettingTypeButton
                                bettingTitle={'비김'}
                                color='gray'
                                bettingTypeNum={22}
                                max={this.props.minMaxBetting[2]}
                                min={this.props.minMaxBetting[3]}
                                allocation={this.props.allocation[1]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'언더 + 비김'}
                                color='blue'
                                bettingTypeNum={25}
                                max={this.props.minMaxBetting[12]}
                                min={this.props.minMaxBetting[13]}
                                allocation={this.props.allocation[6]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'오버 + 비김'}
                                color='red'
                                bettingTypeNum={28}
                                max={this.props.minMaxBetting[12]}
                                min={this.props.minMaxBetting[13]}
                                allocation={this.props.allocation[6]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                        </div>
                        <div className={styles.bettingTypeButtonBox}>
                            <BettingTypeButton
                                bettingTitle={'오른쪽'}
                                color='gray'
                                bettingTypeNum={23}
                                max={this.props.minMaxBetting[0]}
                                min={this.props.minMaxBetting[1]}
                                allocation={this.props.allocation[0]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'언더 + 오른쪽'}
                                color='blue'
                                bettingTypeNum={26}
                                max={this.props.minMaxBetting[12]}
                                min={this.props.minMaxBetting[13]}
                                allocation={this.props.allocation[6]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'오버 + 오른쪽'}
                                color='red'
                                bettingTypeNum={29}
                                max={this.props.minMaxBetting[12]}
                                min={this.props.minMaxBetting[13]}
                                allocation={this.props.allocation[6]}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.bettingCategoryBox + ' ' + styles.bettingTotalBreakCount}>
                    <span className={styles.bettingCategoryTitle}>
                        총 격파수
                    </span>
                    <div className={styles.bettingTypeButtonBox}>
                        <BettingTypeButton
                            bettingTitle={'홀'}
                            color='blue'
                            bettingTypeNum={1}
                            max={this.props.minMaxBetting[12]}
                            min={this.props.minMaxBetting[13]}
                            allocation={this.props.allocation[6]}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'짝'}
                            color='red'
                            bettingTypeNum={2}
                            max={this.props.minMaxBetting[12]}
                            min={this.props.minMaxBetting[13]}
                            allocation={this.props.allocation[6]}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'언더'}
                            color='blue'
                            bettingTypeNum={3}
                            max={this.props.minMaxBetting[12]}
                            min={this.props.minMaxBetting[13]}
                            allocation={this.props.allocation[6]}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'오버'}
                            color='red'
                            bettingTypeNum={4}
                            max={this.props.minMaxBetting[12]}
                            min={this.props.minMaxBetting[13]}
                            allocation={this.props.allocation[6]}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}