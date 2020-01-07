import React from 'react';
import styles from './findaccount.css';

export default class FindAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            findAccountTel: ''
        }

        this.telInput = React.createRef();
    }

    findAccountTelInputChange(e) {
        // 숫자 이외의 문자는 전부 차단함
        const regEx = /[^0-9]+/gi;
        this.setState({
            findAccountTel: e.target.value.replace(regEx, '').trim()
        });
    }

    render() {
        return (
            <div className={styles.findAccountForm}>
                { this.props.findAccount === null &&
                    <div>
                        <input
                        className={styles.userTelInput + ' ' + `${this.state.findAccountTel.length <= 9 ? '' : this.props.checkInputClass}`}
                        type="tel"
                        value={this.state.findAccountTel}
                        placeholder="휴대폰번호"
                        onChange={(e) => this.findAccountTelInputChange(e)}
                        onKeyPress={(e) => {e.key === 'Enter' ? this.props.requestUserId(this.state.findAccountTel) : ''}}
                    />
                        <button className={styles.findAccountButton} onClick={() => this.props.requestUserId(this.state.findAccountTel)}>아이디찾기</button>
                    </div>
                }
                { this.props.findAccount !== null &&
                    <div>
                        <p className={styles.findMessage}>{this.state.findAccountTel}님의 아이디는</p>
                        <p className={styles.findMessage}>{this.props.findAccount}입니다.</p>
                        <button className={styles.findAccountButton} onClick={() => this.props.hideModal()}>확인</button>
                    </div>
                }
            </div>
        )
    }
}