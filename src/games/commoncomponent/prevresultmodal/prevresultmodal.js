import React from 'react';
import styles from './prevresultmodal.css';

export default class PrevResultModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
            day: new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
        }
    }

    ballColorSelector(ballType) {
        if(ballType <= 7) {
            return styles.yellowBall;
        } else if(ballType <= 14) {
            return styles.blueBall;
        } else if(ballType <= 21) {
            return styles.redBall;
        } else {
            return styles.greenBall;
        }
    }

    render() {
        return (
            <div className={styles.gameResultModalWrap} ref={this.gameResultModal}>
                <div className={styles.gameResultModal}>
                    {this.props.prevGameResult === null ? 
                        <p className={styles.gameResultTitle}>
                            <img className={styles.gameResultModalCancelButton} src={require('../../../images/cancel_button.png')} onClick={() => this.props.destroyResultModal()} />
                        </p>
                        :
                        <p className={styles.gameResultTitle}>
                            {this.state.year}-{this.state.month}-{this.state.day} {this.props.prevGameResult.gameRound} 회차
                            <img className={styles.gameResultModalCancelButton} src={require('../../../images/cancel_button.png')} onClick={() => this.props.destroyResultModal()} onLoad={() => this.props.destroyTimer()} />
                        </p>
                    }
                    {this.props.prevGameResult === null ? 
                        <div className={styles.gameResultWait}>
                            <p className={styles.waitParagraph}>결과 수집중입니다.</p>
                        </div>
                        :
                        this.props.gameType <= 4 ?
                        <div className={styles.gameResult}>
                            <span className={styles.resultBallSpan + ' ' + this.ballColorSelector(this.props.prevGameResult.ballOne)}>{this.props.prevGameResult.ballOne}</span>
                            <span className={styles.resultBallSpan + ' ' + this.ballColorSelector(this.props.prevGameResult.ballTwo)}>{this.props.prevGameResult.ballTwo}</span>
                            <span className={styles.resultBallSpan + ' ' + this.ballColorSelector(this.props.prevGameResult.ballThree)}>{this.props.prevGameResult.ballThree}</span>
                            <span className={styles.resultBallSpan + ' ' + this.ballColorSelector(this.props.prevGameResult.ballFour)}>{this.props.prevGameResult.ballFour}</span>
                            <span className={styles.resultBallSpan + ' ' + this.ballColorSelector(this.props.prevGameResult.ballFive)}>{this.props.prevGameResult.ballFive}</span>
                            <span className={styles.resultBallSpan + ' ' + styles.powerBall}>{this.props.prevGameResult.powerBall}</span>
                        </div>
                        :
                        // 격파 게임
                        this.props.gameType == 5 ?
                        <div className={styles.gameResultRSPBreak}>
                            <div className={styles.leftResult}>
                                <span className={styles.leftRightTitle}>L</span>
                                <span 
                                    className={
                                        this.props.prevGameResult.leftResult > this.props.prevGameResult.rightResult ?
                                        styles.winText :
                                        this.props.prevGameResult.leftResult < this.props.prevGameResult.rightResult ?
                                        styles.loseText : styles.drawText
                                    }
                                >{this.props.prevGameResult.leftResult}
                                </span>
                                <img className={styles.rspBreakImg} src={require('../../../images/break_block.png')} />
                            </div>
                            <div className={styles.rightResult}>
                                <span className={styles.leftRightTitle}>R</span>
                                <span 
                                    className={
                                        this.props.prevGameResult.leftResult < this.props.prevGameResult.rightResult ?
                                        styles.winText :
                                        this.props.prevGameResult.leftResult > this.props.prevGameResult.rightResult ?
                                        styles.loseText : styles.drawText
                                    }
                                >{this.props.prevGameResult.rightResult}
                                </span>
                                <img className={styles.rspBreakImg} src={require('../../../images/break_block.png')} />
                            </div>
                        </div>
                        :
                        // 가위바위보 게임
                        <div className={styles.gameResultRSPBreak}>
                            <div className={styles.leftResult}>
                                <span className={styles.leftRightTitle}>L</span>
                                {
                                    this.props.prevGameResult.leftResult > this.props.prevGameResult.rightResult ?
                                    <span className={styles.winText}>WIN</span> :
                                    this.props.prevGameResult.leftResult < this.props.prevGameResult.rightResult ?
                                    <span className={styles.loseText}>LOSE</span> :
                                    <span className={styles.drawText}>DRAW</span>
                                }
                                {
                                    this.props.prevGameResult.leftResult == 1 ?
                                    <img className={styles.rspBreakImg} src={require('../../../images/scissors.png')} /> :
                                    this.props.prevGameResult.leftResult == 2 ?
                                    <img className={styles.rspBreakImg} src={require('../../../images/rock.png')} /> :
                                    <img className={styles.rspBreakImg} src={require('../../../images/paper.png')} />
                                }
                            </div>
                            <div className={styles.rightResult}>
                                <span className={styles.leftRightTitle}>R</span>
                                {
                                    this.props.prevGameResult.leftResult < this.props.prevGameResult.rightResult ?
                                    <span className={styles.winText}>WIN</span> :
                                    this.props.prevGameResult.leftResult > this.props.prevGameResult.rightResult ?
                                    <span className={styles.loseText}>LOSE</span> :
                                    <span className={styles.drawText}>DRAW</span>
                                }
                                {
                                    this.props.prevGameResult.rightResult == 1 ?
                                    <img className={styles.rspBreakImg} src={require('../../../images/scissors.png')} /> :
                                    this.props.prevGameResult.rightResult == 2 ?
                                    <img className={styles.rspBreakImg} src={require('../../../images/rock.png')} /> :
                                    <img className={styles.rspBreakImg} src={require('../../../images/paper.png')} />
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}