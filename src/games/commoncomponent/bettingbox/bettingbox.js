import React from 'react';
import styles from './bettingbox.css';
import SlipPad from '../slippad/slippad';
import BettingList from '../bettinglist/bettinglist'
import PrevResultModal from '../../commoncomponent/prevresultmodal/prevresultmodal';

export default class BettingBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultModal: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.gameType <= 2 && props.gameCount === 300 && !state.resultModal) {
            return {
                resultModal: true
            };
        } else if(props.gameType >= 3 && props.gameType <= 5 && props.gameCount === 180 && !state.resultModal) {
            return {
                resultModal: true
            };
        } else if(props.gameType == 6 && props.gameCount === 120 && !state.resultModal) {
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
        });
        this.props.resetPrevGameResult();
    }

    destroyTimer() {
        setTimeout(() => {
            this.destroyResultModal();
        }, 5000)
    }

    render() {
        return (
            <div className={styles.bettingWrap}>
                { this.state.resultModal &&
                    <PrevResultModal
                        prevGameResult={this.props.prevGameResult}
                        gameType={this.props.gameType}
                        resetPrevGameResult={() => this.props.resetPrevGameResult()}
                        destroyResultModal={() => this.destroyResultModal()}
                        destroyTimer={() => this.destroyTimer()}
                    />}
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
                        setPrintFlag={(printFlag) => this.props.setPrintFlag(printFlag)}
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