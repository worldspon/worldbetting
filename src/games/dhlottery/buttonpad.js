import React from 'react';
import styles from './buttonpad.css';
import BettingTypeButton from '../commonComponent/bettingtypebutton/bettingtypebutton';

export default class ButtonPad extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className={styles.bettingButtonBoard}>
                <div className={styles.bettingCategoryBox + ' ' + styles.bettingCommonSingle}>
                    <span className={styles.bettingCategoryTitle}>
                        일반볼 단볼
                    </span>
                    <div className={styles.bettingTypeButtonBox}>
                        <BettingTypeButton
                            bettingTitle={'일반볼 홀'}
                            color='blue'
                            bettingTypeNum={11}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'일반볼 짝'}
                            color='red'
                            bettingTypeNum={12}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'일반볼 언더'}
                            color='blue'
                            bettingTypeNum={13}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'일반볼 오버'}
                            color='red'
                            bettingTypeNum={14}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                    </div>
                </div>
                <div className={styles.bettingCategoryBox + ' ' + styles.bettingCommonMix}>
                    <span className={styles.bettingCategoryTitle}>
                        일반볼 조합
                    </span>
                    <div className={styles.bettingTypeButtonBox}>
                        <BettingTypeButton
                            bettingTitle={'홀 + 언더'}
                            color='blue'
                            bettingTypeNum={15}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'짝 + 언더'}
                            color='red'
                            bettingTypeNum={16}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'홀 + 오버'}
                            color='blue'
                            bettingTypeNum={17}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'짝 + 오버'}
                            color='red'
                            bettingTypeNum={18}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                    </div>
                </div>
                <div className={styles.bettingCategoryBox + ' ' + styles.bettingCommonSize}>
                    <span className={styles.bettingCategoryTitle}>
                        일반볼 대중소
                    </span>
                    <div className={styles.bettingTypeButtonBox}>
                        <BettingTypeButton
                            bettingTitle={'대'}
                            color='gray'
                            bettingTypeNum={21}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'중'}
                            color='gray'
                            bettingTypeNum={22}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'소'}
                            color='gray'
                            bettingTypeNum={23}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                    </div>
                </div>
                <div className={styles.bettingCategoryBox + ' ' + styles.bettingSizeMix}>
                    <span className={styles.bettingCategoryTitle}>
                        대중소 조합
                    </span>
                    <div className={styles.sizeMixInnerWrap}>
                        <div className={styles.bettingTypeButtonBox}>
                            <BettingTypeButton
                                bettingTitle={'홀 + 대'}
                                color='blue'
                                bettingTypeNum={24}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'홀 + 중'}
                                color='blue'
                                bettingTypeNum={25}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'홀 + 소'}
                                color='blue'
                                bettingTypeNum={26}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                        </div>
                        <div className={styles.bettingTypeButtonBox}>
                            <BettingTypeButton
                                bettingTitle={'짝 + 대'}
                                color='red'
                                bettingTypeNum={27}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'짝 + 중'}
                                color='red'
                                bettingTypeNum={28}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                            <BettingTypeButton
                                bettingTitle={'짝 + 소'}
                                color='red'
                                bettingTypeNum={29}
                                selectBettingTypeNum={this.props.selectBettingTypeNum}
                                changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.bettingCategoryBox + ' ' + styles.bettingPowerSingle}>
                    <span className={styles.bettingCategoryTitle}>
                        파워볼 단볼
                    </span>
                    <div className={styles.bettingTypeButtonBox}>
                        <BettingTypeButton
                            bettingTitle={'파워볼 홀'}
                            color='blue'
                            bettingTypeNum={1}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'파워볼 짝'}
                            color='red'
                            bettingTypeNum={2}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'파워볼 언더'}
                            color='blue'
                            bettingTypeNum={3}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'파워볼 오버'}
                            color='red'
                            bettingTypeNum={4}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                    </div>
                </div>
                <div className={styles.bettingCategoryBox + ' ' + styles.bettingPowerMix}>
                    <span className={styles.bettingCategoryTitle}>
                        파워볼 조합
                    </span>
                    <div className={styles.bettingTypeButtonBox}>
                        <BettingTypeButton
                            bettingTitle={'홀 + 언더'}
                            color='blue'
                            bettingTypeNum={5}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'짝 + 언더'}
                            color='red'
                            bettingTypeNum={6}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'홀 + 오버'}
                            color='blue'
                            bettingTypeNum={7}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                        <BettingTypeButton
                            bettingTitle={'짝 + 오버'}
                            color='red'
                            bettingTypeNum={8}
                            selectBettingTypeNum={this.props.selectBettingTypeNum}
                            changeSelectBettingTypeNum={(typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}