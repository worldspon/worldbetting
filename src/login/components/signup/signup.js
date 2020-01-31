import React from 'react';
import styles from './signup.css';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpId: '',
            signUpPw: '',
            signUpPwCheck: '',
            signUpTel: '',
            signUpRecommend: ''
        }
        this.idInputRef = React.createRef();
    }

    // 회원가입 id input 입력시 state 최신화
    signUpIdInputChange(e) {
        // 영문 숫자 이외의 문자 제거
        const regEx = /[^A-Za-z0-9]/gi;
        this.setState({
            signUpId: e.target.value.replace(regEx, '').trim()
        })
    }

    // 회원가입 pw input 입력시 state 최신화
    signUpPwInputChange(e) {
        this.setState({
            signUpPw: e.target.value.trim()
        })
    }

    // 회원가입 pw check input 입력시 state 최신화
    signUpPwCheckInputChange(e) {
        this.setState({
            signUpPwCheck: e.target.value.trim()
        })
    }

    // 회원가입 tel input 입력시 state 최신화
    signUpTelInputChange(e) {
        const regEx = /[^0-9]+/gi;
        this.setState({
            signUpTel: e.target.value.replace(regEx, '').trim()
        })
    }

    // // 회원가입 추천인 input 입력시 state 최신화
    signUpRecommendInputChange(e) {
        this.setState({
            signUpRecommend: e.target.value.trim()
        }) 
    }

    // 회원가입 객체 생성 및 이벤트 방출
    createUserObject() {
        const userObject = {
            id: this.state.signUpId,
            pw: this.state.signUpPw,
            tel: this.state.signUpTel,
            recommend: this.state.signUpRecommend
        }

        if(userObject.id.length < 4) {
            // 아이디 네 자 이상
            alert(this.props.langPack.alert.idLength);
        } else if(userObject.pw.length < 1) {
            // 비밀번호 네 자 이상
            alert(this.props.langPack.alert.pwLength);
        } else if(userObject.pw !== this.state.signUpPwCheck) {
            // 비밀번호 불일치
            alert(this.props.langPack.alert.pwCheck);
        } else if(userObject.tel.length < 10) {
            // 전화번호 형식 오류
            alert(this.props.langPack.alert.phCheck);
        } else if(userObject.recommend.length < 4) {
            // 추천인 아이디 미입력
            alert(this.props.langPack.alert.noInputReferrer);
        } else {
            this.props.requestSignUp(userObject);
        }
    }

    render() {
        return (
            <div className={styles.signUpForm}>
                { !this.props.signUpFlag &&
                    <div>
                        <input
                            className={this.state.signUpId.length <= 3 ? '' : this.props.checkInputClass}
                            type="text"
                            placeholder="ID"
                            maxLength="10"
                            ref={this.idInputRef}
                            onChange={(e) => this.signUpIdInputChange(e)}
                            value={this.state.signUpId}
                        />
                        <input
                            className={this.state.signUpPw.length <= 3 ? '' : this.props.checkInputClass}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => this.signUpPwInputChange(e)}
                            value={this.state.signUpPw}
                        />
                        <input
                            className={this.state.signUpPwCheck.length <= 3 ? '' : this.state.signUpPw === this.state.signUpPwCheck ? this.props.checkInputClass : ''}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => this.signUpPwCheckInputChange(e)}
                            value={this.state.signUpPwCheck}
                        />
                        <input
                            className={this.state.signUpTel.length <= 9 ? '' : this.props.checkInputClass}
                            type="tel"
                            placeholder="Phone"
                            onChange={(e) => this.signUpTelInputChange(e)}
                            value={this.state.signUpTel}
                        />
                        <input
                            className={this.state.signUpRecommend.length <= 3 ? '' : this.props.checkInputClass}
                            type="text"
                            placeholder="Referrer ID"
                            onChange={(e) => this.signUpRecommendInputChange(e)}
                            onKeyPress={(e) => e.key === 'Enter' ? this.createUserObject() : ''}
                            value={this.state.signUpRecommend}
                        />
                        <button className={styles.signUpButton} onClick={() => this.createUserObject()}>{this.props.langPack.button.signUp}</button>
                    </div>
                }
                { this.props.signUpFlag &&
                    <div>
                        {/* <p className={styles.signUpMessage}>축하합니다.</p> */}
                        <p className={styles.signUpMessage}>{this.props.langPack.paragraph}</p>
                        <button className={styles.signUpButton} onClick={() => this.props.hideModal()}>{this.props.langPack.button.confirm}</button>
                    </div>
                }
            </div>
        )
    }
}