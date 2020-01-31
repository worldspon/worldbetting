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
            const data = `|${this.state.currentPassword}|${this.state.changePassword}|${this.state.userTel}|${this.state.userBank}|${this.state.userName}|${this.state.userAccount}|${this.state.userCoin}|${this.state.userCoinWallet}|`;
            this.props.requestChangeUserInfo(data);
        }

    }

    inputCheck() {
        if(this.state.changePassword !== this.state.changePasswordCheck) {
            alert(this.props.alert.errorChangePw);
            return false;
        }else if(this.state.currentPassword === '' || this.state.currentPassword.length < 4) {
            alert(this.props.alert.errorCurrentPw);
            return false;
        }else if(this.state.changePassword.length < 4 || this.state.changePasswordCheck.length < 4) {
            alert(this.props.alert.errorPwLength);
            return false;
        }else return true;
    }

    componentDidMount() {
        this.props.requestUserInfo();
    }


    render() {
        return (
            <div className={styles.infoChangeContentWrap}>
                <div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>{this.props.langPack.currentPw}</span>
                        <input
                            type="password"
                            readOnly={this.props.userInfoReadOnly == 0 ? true : false}
                            className={styles.currentPw}
                            value={this.state.currentPassword}
                            placeholder="current password"
                            maxLength='10'
                            onChange={(e) => this.setUserCurrentPw(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>{this.props.langPack.changePw}</span>
                        <input
                            type="password"
                            readOnly={this.props.userInfoReadOnly == 0 ? true : false}
                            className={styles.changePw}
                            value={this.state.changePassword}
                            placeholder="change password"
                            maxLength='10'
                            onChange={(e) => this.setUserChangePw(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>{this.props.langPack.checkPw}</span>
                        <input
                            type="password"
                            readOnly={this.props.userInfoReadOnly == 0 ? true : false}
                            className={styles.checkPw}
                            value={this.state.changePasswordCheck}
                            placeholder="password check"
                            maxLength='10'
                            onChange={(e) => this.setUserChangePwCheck(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>{this.props.langPack.tel}</span>
                        <input
                            type="tel"
                            readOnly={this.props.userInfoReadOnly == 0 ? true : false}
                            className={styles.phoneNum}
                            value={this.state.userTel}
                            placeholder="tel"
                            onChange={(e) => this.setUserTel(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>{this.props.langPack.account}</span>
                        <input
                            type="text"
                            readOnly={this.props.userInfoReadOnly == 0 ? true : false}
                            className={styles.bankName}
                            value={this.state.userBank}
                            placeholder="bank name"
                            onChange={(e) => this.setUserBank(e)}
                        />
                        <input
                            type="text"
                            readOnly={this.props.userInfoReadOnly == 0 ? true : false}
                            className={styles.accountUser}
                            value={this.state.userName}
                            placeholder="user"
                            onChange={(e) => this.setUserName(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}></span>
                        <input
                            type="text"
                            readOnly={this.props.userInfoReadOnly == 0 ? true : false}
                            className={styles.accountNum}
                            value={this.state.userAccount}
                            placeholder="account"
                            onChange={(e) => this.setUserAccount(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}>{this.props.langPack.coin}</span>
                        <input
                            type="text"
                            readOnly={this.props.userInfoReadOnly == 0 ? true : false}
                            className={styles.userCoinName}
                            value={this.state.userCoin}
                            placeholder="coin name"
                            onChange={(e) => this.setUserCoin(e)}
                        />
                    </div>
                    <div className={styles.infoRows}>
                        <span className={styles.rowTitle}></span>
                        <input
                            type="text"
                            readOnly={this.props.userInfoReadOnly == 0 ? true : false}
                            className={styles.userCoinWallet}
                            value={this.state.userCoinWallet}
                            placeholder="wallet"
                            onChange={(e) => this.setUserCoinWallet(e)}
                        />
                    </div>
                    <div className={styles.infoChangeCancelBox}>
                        <button className={styles.infoChangeButton} onClick={() => this.changeUserInfo()}>{this.props.langPack.changeInfo}</button>
                        <button className={styles.cancelButton} onClick={() => {this.props.destroyModal()}}>{this.props.langPack.cancel}</button>
                    </div>
                </div>
            </div>
        )
    }
}