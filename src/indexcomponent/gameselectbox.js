import React from 'react';
import styles from './gameselectbox.css';

export default class GameSelectBox extends React.Component {
    constructor(props) {
        super(props);
    }

    locationWorldLotto3M() {
        location.href="/worldlotto3m";
    }
    locationWorldLotto5M() {
        location.href="/worldlotto5m";
    }
    locationdhLottery() {
        location.href="/dhlottery";
    }
    locationRspGame() {
        location.href="/rspgame";
    }

    locationDropGame() {
        location.href="/dropgame";
    }

    locationBreakGame() {
        location.href="/breakgame";
    }

    render() {
        return (
            <div className={styles.gameSelectWrap}>
                <div className={styles.gameBox + ' ' + styles.lottoBox} onClick={() => this.locationdhLottery()}>
                    {
                        this.props.certification.powerBall !== undefined ?
                        this.props.certification.powerBall == 0 ? <img className={styles.certificationMark} src={require('../images/certification_mark.png')} /> : this.props.certification.powerBall == 2 ? '' : <img className={styles.certificationMark} src={require('../images/certification_mark2.png')} /> : ''
                    }
                    {/* <img className={styles.certificationMark} src={require('../images/certification_mark.png')} /> */}
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    {
                        this.props.connectState.powerBall !== undefined ?
                        this.props.connectState.powerBall == 0 ? <div className={styles.prohibitionBox + ' ' + styles.examineImg}>
                        </div> : this.props.connectState.powerBall == 2 ? <div className={styles.prohibitionBox + ' ' + styles.prohibitionImg}>
                        </div> : <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>복권</span>
                        </div> : ''
                    }
                </div>
                <div className={styles.gameBox + ' ' + styles.worldLotto3Box} onClick={() => this.locationWorldLotto3M()}>
                    {
                        this.props.certification.worldBall3 !== undefined ?
                        this.props.certification.worldBall3 == 0 ? <img className={styles.certificationMark} src={require('../images/certification_mark.png')} /> : this.props.certification.worldBall3 == 2 ? '' : <img className={styles.certificationMark} src={require('../images/certification_mark2.png')} /> : ''
                    }
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    {
                        this.props.connectState.worldBall3 !== undefined ?
                        this.props.connectState.worldBall3 == 0 ? <div className={styles.prohibitionBox + ' ' + styles.examineImg}>
                        </div> : this.props.connectState.worldBall3 == 2 ? <div className={styles.prohibitionBox + ' ' + styles.prohibitionImg}>
                        </div> : <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>월드로또3분</span>
                        <img className={styles.minuteSymbol} src={require('../images/worldlotto_3m_symbol.png')}></img>
                        </div> : ''
                    }
                </div>
                <div className={styles.gameBox + ' ' + styles.worldLotto5Box} onClick={() => this.locationWorldLotto5M()}>
                    {
                        this.props.certification.worldBall5 !== undefined ?
                        this.props.certification.worldBall5 == 0 ? <img className={styles.certificationMark} src={require('../images/certification_mark.png')} /> : this.props.certification.worldBall5 == 2 ? '' : <img className={styles.certificationMark} src={require('../images/certification_mark2.png')} /> : ''
                    }
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    {
                        this.props.connectState.worldBall5 !== undefined ?
                        this.props.connectState.worldBall5 == 0 ? <div className={styles.prohibitionBox + ' ' + styles.examineImg}>
                        </div> : this.props.connectState.worldBall5 == 2 ? <div className={styles.prohibitionBox + ' ' + styles.prohibitionImg}>
                        </div> : <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>월드로또5분</span>
                        <img className={styles.minuteSymbol} src={require('../images/worldlotto_5m_symbol.png')}></img>
                        </div> : ''
                    }
                </div>
                <div className={styles.gameBox + ' ' + styles.zombieDrop} onClick={() => this.locationDropGame()}>
                    {
                        this.props.certification.zombieDrop !== undefined ?
                        this.props.certification.zombieDrop == 0 ? <img className={styles.certificationMark} src={require('../images/certification_mark.png')} /> : this.props.certification.zombieDrop == 2 ? '' : <img className={styles.certificationMark} src={require('../images/certification_mark2.png')} /> : ''
                    }
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    {
                        this.props.connectState.zombieDrop !== undefined ?
                        this.props.connectState.zombieDrop == 0 ? <div className={styles.prohibitionBox + ' ' + styles.examineImg}>
                        </div> : this.props.connectState.zombieDrop == 2 ? <div className={styles.prohibitionBox + ' ' + styles.prohibitionImg}>
                        </div> : <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>낙하</span>
                        </div> : ''
                    }
                </div>
                <div className={styles.gameBox + ' ' + styles.zombieBreak} onClick={() => this.locationBreakGame()}>
                    {
                        this.props.certification.zombieBreak !== undefined ?
                        this.props.certification.zombieBreak == 0 ? <img className={styles.certificationMark} src={require('../images/certification_mark.png')} /> : this.props.certification.zombieBreak == 2 ? '' : <img className={styles.certificationMark} src={require('../images/certification_mark2.png')} /> : ''
                    }
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    {
                        this.props.connectState.zombieBreak !== undefined ?
                        this.props.connectState.zombieBreak == 0 ? <div className={styles.prohibitionBox + ' ' + styles.examineImg}>
                        </div> : this.props.connectState.zombieBreak == 2 ? <div className={styles.prohibitionBox + ' ' + styles.prohibitionImg}>
                        </div> : <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>격파</span>
                        </div> : ''
                    }
                </div>
                <div className={styles.gameBox + ' ' + styles.rcpGame} onClick={() => this.locationRspGame()}>
                    {
                        this.props.certification.rsp !== undefined ?
                        this.props.certification.rsp == 0 ? <img className={styles.certificationMark} src={require('../images/certification_mark.png')} /> : this.props.certification.rsp == 2 ? '' : <img className={styles.certificationMark} src={require('../images/certification_mark2.png')} /> : ''
                    }
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    {
                        this.props.connectState.rsp !== undefined ?
                        this.props.connectState.rsp == 0 ? <div className={styles.prohibitionBox + ' ' + styles.examineImg}>
                        </div> : this.props.connectState.rsp == 2 ? <div className={styles.prohibitionBox + ' ' + styles.prohibitionImg}>
                        </div> : <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>가위바위보</span>
                        </div> : ''
                    }
                </div>
            </div>
        )
    }
}