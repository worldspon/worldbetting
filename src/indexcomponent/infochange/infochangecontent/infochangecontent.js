import React from 'react';
import styles from './infochangecontent.css';


export default class InfoChangeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            changePassword: '',
            changePasswordCheck: '',
            userTel: this.props.userInfo.tel,
            userBank: this.props.userInfo.bank,
            userName: this.props.userInfo.name,
            userAccount: this.props.userInfo.account,
            userCoin: this.props.userInfo.coin,
            userCoinWallet: this.props.userInfo.coinWallet
        }
    }

    setUserCurrentPw(e) {
        this.setState({
            currentPassword: e.target.value.trim()
        })
    }

    setUserChangePw(e) {
        this.setState({
            changePassword: e.target.value.trim()
        })
    }

    setUserChangePwCheck(e) {
        this.setState({
            changePasswordCheck: e.target.value.trim()
        })
    }

    setUserTel(e) {
        const regEx = /[^0-9]+/gi;
        this.setState({
            userTel: e.target.value.replace(regEx, '').trim()
        })
    }

    setUserBank(e) {
        this.setState({
            userBank: e.target.value.trim()
        })
    }

    setUserName(e) {
        this.setState({
            userName: e.target.value.trim()
        })
    }

    setUserAccount(e) {
        this.setState({
            userAccount: e.target.value.trim()
        })
    }

    setUserCoin(e) {
        this.setState({
            userCoin: e.target.value.trim()
        })
    }
    
    setUserCoinWallet(e) {
        this.setState({
            userCoinWallet: e.target.value.trim()
        })
    }

    changeUserInfo() {
        if(this.inputCheck()) {
            const data = `|${this.state.changePassword}|${this.state.userTel}|${this.state.userBank}|${this.state.userName}|${this.state.userAccount}|${this.state.userCoin}|${this.state.userCoinWallet}|`;
            this.props.requestChangeUserInfo(data);
        } else {
            alert('변경할 비밀번호를 다시 확인해주세요.');
        }

    }

    inputCheck() {
        if(this.state.changePassword === this.state.changePasswordCheck) return true; else return false;
    }

    componentDidMount() {
        this.props.requestUserInfo();
    }


    render() {
        return (
            <div className={styles.infoChangeContentWrap}>
                <div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>현재 비밀번호</span>
                        <input
                            type="password"
                            className={styles.currentPw}
                            value={this.state.currentPassword}
                            placeholder="현재 비밀번호"
                            onChange={(e) => this.setUserCurrentPw(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>변경할 비밀번호</span>
                        <input
                            type="password"
                            className={styles.changePw}
                            value={this.state.changePassword}
                            placeholder="변경할 비밀번호"
                            onChange={(e) => this.setUserChangePw(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>변경할 비밀번호 확인</span>
                        <input
                            type="password"
                            className={styles.checkPw}
                            value={this.state.changePasswordCheck}
                            placeholder="비밀번호 확인"
                            onChange={(e) => this.setUserChangePwCheck(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>전화번호</span>
                        <input
                            type="tel"
                            className={styles.phoneNum}
                            value={this.state.userTel}
                            placeholder="전화번호"
                            onChange={(e) => this.setUserTel(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>계좌정보</span>
                        <input
                            type="text"
                            className={styles.bankName}
                            value={this.state.userBank}
                            placeholder="은행명"
                            onChange={(e) => this.setUserBank(e)}
                        />
                        <input
                            type="text"
                            className={styles.accountUser}
                            value={this.state.userName}
                            placeholder="예금주"
                            onChange={(e) => this.setUserName(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}></span>
                        <input
                            type="text"
                            className={styles.accountNum}
                            value={this.state.userAccount}
                            placeholder="계좌번호"
                            onChange={(e) => this.setUserAccount(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>코인정보</span>
                        <input
                            type="text"
                            className={styles.userCoinName}
                            value={this.state.userCoin}
                            placeholder="코인명"
                            onChange={(e) => this.setUserCoin(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}></span>
                        <input
                            type="text"
                            className={styles.userCoinWallet}
                            value={this.state.userCoinWallet}
                            placeholder="지갑주소"
                            onChange={(e) => this.setUserCoinWallet(e)}
                        />
                    </div>
                    <div className={styles.infoChangeCancelBox}>
                        <button className={styles.infoChangeButton} onClick={() => this.changeUserInfo()}>정보수정</button>
                        <button className={styles.cancelButton} onClick={() => {this.props.destroyModal()}}>취소</button>
                    </div>
                </div>
            </div>
        )
    }
}