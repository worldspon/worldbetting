import React from 'react';
import styles from './bettingbox.css';
import SlipPad from '../slippad/slippad';
import BettingList from '../bettinglist/bettinglist'

export default class BettingBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
            day: new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
            resultModal: false
        }
        this.gameResultModal = React.createRef();
    }
    
    static getDerivedStateFromProps(props, state) {
        if(props.gameCount === 180 && !state.resultModal) {
            return {
                resultModal: true
            };
        } else {
            return null;
        }
    }

    destroyResultModal() {
        this.setState({
            resultModal: false
        })
    }

    currentGameResultModal(data) {
        return (<div className={styles.gameResultModalWrap} ref={this.gameResultModal}>
                    <div className={styles.gameResultModal}>
                        {data === null ? '' :
                            <p className={styles.gameResultTitle}>
                                {this.state.year}-{this.state.month < 10 ? '0' + this.state.month : this.state.month}-{this.state.day < 10 ? '0' + this.state.day : this.state.day} [140] {data.gameRound} 회차
                                <img className={styles.gameResultModalCancelButton} src={require('../../../images/cancel_button.png')} onClick={() => this.destroyResultModal()} />
                            </p>
                        }
                        {data === null ? '' :
                            <div className={styles.gameResult}>
                                <span className={styles.resultBallSpan}>{data.ballOne}</span>
                                <span className={styles.resultBallSpan}>{data.ballTwo}</span>
                                <span className={styles.resultBallSpan}>{data.ballThree}</span>
                                <span className={styles.resultBallSpan}>{data.ballFour}</span>
                                <span className={styles.resultBallSpan}>{data.ballFive}</span>
                                <span className={styles.resultBallSpan}>{data.powerBall}</span>
                            </div>
                        }
                    </div>
                </div>);
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         clear: true
        //     })
        // }, 3000)
    }

    render() {
        return (
            <div className={styles.bettingWrap}>
                { this.state.resultModal && this.currentGameResultModal(this.props.prevGameResult) }
                <div className={styles.gameTitleBox}>
                    <span className={styles.gameTitle}>{this.props.gameTitle}</span>
                    <span>Online Premium Sports Books.</span>
                </div>
                <div className={styles.bettingBoard}>
                    {/* 각 게임 js에서 typepad를 props로 받아 복사 + props 설정 후 return */}
                    { React.cloneElement(
                        this.props.typePad,
                        {
                            selectBettingTypeNum:this.props.selectBettingTypeNum,
                            changeSelectBettingTypeNum: (typeNum, min, max) => this.props.changeSelectBettingTypeNum(typeNum, min, max)
                        })
                    }
                    <SlipPad
                        bettingMoney={this.props.bettingMoney}
                        changeBettingMoney={(bettingMoney, inputFlag) => this.props.changeBettingMoney(bettingMoney, inputFlag)}
                        bettingMoneyClear={() => this.props.bettingMoneyClear()}
                        bettingAllClear={() => this.props.bettingAllClear()}
                        gameBetting={() => this.props.gameBetting()}
                    />
                </div>
                <BettingList
                    gameType={this.props.gameType}
                    allocation={this.props.allocation}
                    gameRound={this.props.gameRound}
                    bettingList={this.props.bettingList}
                    requestCancelBetting={(e) => this.props.requestCancelBetting(e)}
                />
            </div>
        )
    }
}