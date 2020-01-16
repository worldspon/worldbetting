import React from 'react';
import styles from './header.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 윈도우 넓이에 맞게 레이아웃을 변경하는 용도로 쓰임
            windowWidth: window.innerWidth,
            remainMinute: null,
            remainSecond: null,
            userLevel: sessionStorage.getItem('level')
        }

        // resize 이벤트 발생시 윈도우 넓이 최신화
        window.addEventListener('resize', () => {
            this.setState({windowWidth: window.innerWidth});
        });
    }

    // 로비로 이동
    locationLobby() {
        location.href="/"
    }

    render() {
        return (
            <header>
                {/* 모바일 헤더 */}
                { this.state.windowWidth <= 1024 && 
                    <div className={styles.mobileLogoBox} style={{backgroundImage: `url(${this.props.logoURL})`}}>
                        <div className={styles.mobileLogoutBox} onClick={() => this.props.tcpLogout()}>
                            <img className={styles.mobileLogoutIcon} src={require('../../../images/mobile_logout.png')} />
                            <span>로그아웃</span>
                        </div>
                    </div>
                }
                <nav>
                    <ul className={styles.menuBox}>
                        <li onClick={() => this.locationLobby()}>로비</li>
                        <li onClick={() => this.props.showBettingResultComponent()}>베팅내역</li>
                        <li onClick={() => this.props.showGameResultComponent()}>게임결과</li>
                        {this.state.windowWidth > 1024 &&
                            <li onClick={() => this.props.tcpLogout()}>로그아웃</li>
                        }
                    </ul>
                </nav>
                <div className={styles.infoBox}>
                    <div className={styles.userInfo}>
                        <div className={styles.userNameBox}>
                            <div className={styles.levelBox}>
                                <span className={styles.levelText}>Lv</span>
                                <span className={styles.levelNum}>{this.state.userLevel}</span>
                            </div>
                            <span className={styles.userName}>{this.props.trademark}님 <span className={styles.noBreakWords}>반갑습니다.</span></span>
                        </div>
                        <div className={styles.userPointBox}>
                            <div>
                                <span className={styles.symbol}>P</span>
                                <span className={styles.userPoint}>{new Intl.NumberFormat().format(this.props.userPoint)}</span>
                            </div>
                            <div>
                                <span className={styles.symbol}>B</span>
                                <span className={styles.userPoint}>{new Intl.NumberFormat().format(this.props.userBonus)}</span>
                            </div>
                        </div>
                        <div className={styles.commissionBox}>
                            <span className={styles.symbol}>C</span>
                            <span className={styles.commission}>{new Intl.NumberFormat().format(this.props.userCommission)}</span>
                            <button className={styles.changeCommissionButton} onClick={() => this.props.requestChangeCommission()}>포인트전환</button>
                        </div>
                    </div>
                    <div className={styles.gameInfo}>
                        <p className={styles.gameHeadline}>TODAY GAMES</p>
                        <div className={styles.gameCountBox}>
                            <span className={styles.gameCount}>{this.props.gameRound}</span>
                            <span className={(this.props.gameCount < this.props.bettingAllowEnd || this.props.gameCount > this.props.bettingAllowStart) ?styles.timerRed : styles.timerBlue}>{Math.floor(this.props.gameCount / 60)}:{this.props.gameCount % 60 < 10 ? '0' + this.props.gameCount % 60 : this.props.gameCount % 60}</span>
                        </div>
                    </div>
                    {this.state.windowWidth > 1024 &&
                        <div className={styles.logoInfo}>
                            {/* <img className={styles.logoImg} src={require('../../../images/dhlottery_game_icon.png')}></img> */}
                            <img className={styles.logoImg} src={this.props.logoURL}></img>
                        </div>
                    }
                </div>
            </header>
        )
    }
}