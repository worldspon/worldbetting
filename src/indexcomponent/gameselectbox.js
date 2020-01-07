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
                    <img className={styles.certificationMark} src={require('../images/certification_mark.png')} />
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>복권</span>
                        {/* <img className={styles.gameIcon} src={require('../images/lotto_icon.png')} /> */}
                    </div>
                </div>
                <div className={styles.gameBox + ' ' + styles.worldLotto3Box} onClick={() => this.locationWorldLotto3M()}>
                    <img className={styles.certificationMark} src={require('../images/certification_mark.png')} />
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>월드로또3분</span>
                        <img className={styles.minuteSymbol} src={require('../images/worldlotto_3m_symbol.png')}></img>
                        {/* <img className={styles.gameIcon} src={require('../images/wlotto_icon.png')} />
                        <img className={styles.lottoMinuteSymbol} src={require('../images/worldlotto_3m_symbol.png')}></img> */}
                    </div>
                </div>
                <div className={styles.gameBox + ' ' + styles.worldLotto5Box} onClick={() => this.locationWorldLotto5M()}>
                    <img className={styles.certificationMark} src={require('../images/certification_mark2.png')} />
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>월드로또5분</span>
                        <img className={styles.minuteSymbol} src={require('../images/worldlotto_5m_symbol.png')}></img>
                        {/* <img className={styles.gameIcon} src={require('../images/wlotto_icon.png')} />
                        <img className={styles.lottoMinuteSymbol} src={require('../images/worldlotto_5m_symbol.png')}></img> */}
                    </div>
                </div>
                <div className={styles.gameBox + ' ' + styles.zombieDrop} onClick={() => this.locationDropGame()}>
                    <img className={styles.certificationMark} src={require('../images/certification_mark.png')} />
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>낙하</span>
                        {/* <img className={styles.gameIcon} src={require('../images/drop_icon.png')} /> */}
                    </div>
                </div>
                <div className={styles.gameBox + ' ' + styles.zombieBreak} onClick={() => this.locationBreakGame()}>
                    <img className={styles.certificationMark} src={require('../images/certification_mark.png')} />
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>격파</span>
                        {/* <img className={styles.gameIcon} src={require('../images/break_icon.png')} /> */}
                    </div>
                </div>
                <div className={styles.gameBox + ' ' + styles.rcpGame} onClick={() => this.locationRspGame()}>
                    <img className={styles.certificationMark} src={require('../images/certification_mark2.png')} />
                    <img className={styles.gameBoxBackgroundImage} src={require('../images/lobby_icon_bg.jpg')} />
                    <div className={styles.gameContentBox}>
                        <span className={styles.gameTitle}>가위바위보</span>
                        {/* <img className={styles.gameIcon} src={require('../images/rsp_icon.png')} /> */}
                    </div>
                </div>
            </div>
        )
    }
}