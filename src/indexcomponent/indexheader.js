import React from 'react';
import styles from './indexheader.css';

export default class LobbyHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <nav>
                    <ul className={styles.menuBox}>
                        <li onClick={() => this.props.showChargeModal()}>충전신청</li>
                        <li onClick={() => this.props.showExchangeModal()}>환전신청</li>
                        <li onClick={() => this.props.showInfoChangeModal()}>정보수정</li>
                        <li onClick={() => this.props.tryLogout()}>로그아웃</li>
                    </ul>
                </nav>
                <div className={styles.infoBox}>
                    <div className={styles.userInfo}>
                        <img src={require('../images/main_logo.png')} />
                        <span className={styles.userName}>{this.props.trademark}님 <span className={styles.noBreakWords}>반갑습니다.</span></span>
                    </div>
                    <div className={styles.pointInfo}>
                        <div className={styles.pointCommissionInnerBox}>
                            <img className={styles.pointSymbol} src={require('../images/point_symbol.png')} />
                            <span className={styles.currentPoint}>{new Intl.NumberFormat().format(this.props.userPoint)}</span>
                        </div>
                    </div>
                    <div className={styles.commissionInfo}>
                        <div className={styles.pointCommissionInnerBox}>
                            <img className={styles.commissionSymbol} src={require('../images/commission_symbol.png')} />
                            <span className={styles.currentCommission}>{new Intl.NumberFormat().format(this.props.userCommission)}</span>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}