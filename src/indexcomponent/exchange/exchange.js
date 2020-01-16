import React from 'react';
import styles from './exchange.css';
import ApplyCoinType from './exchangecontent/exchangetypecoin';
import ApplyAccountType from './exchangecontent/exchangetypeaccount';
import ListType from './exchangecontent/exchangelisttype';


export default class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTap: 'apply'
        }
    }

    changeTap(tapName) {
        this.setState({
            activeTap: tapName
        })
    }

    render() {
        return (
            <div className={styles.exChangeApplyBox}>
                <div className={styles.exChangeTitle}>
                    <h1>환전</h1>
                    <img
                        className={styles.cancelButton}
                        src={require('../../images/cancel_button.png')}
                        onClick={() => {this.props.destroyModal()}}
                    />
                </div>
                <div className={styles.exChangeContentBox}>
                    <div className={styles.tapTitleWrap}>
                        <div
                            className={styles.exChangeApplyTap + ' ' +
                            `${this.state.activeTap === 'apply' ? styles.activeTap : ''}`}
                            onClick={() => {this.changeTap('apply')}}
                            >
                            <span>환전신청</span>
                        </div>
                        <div
                            className={styles.exChangeListTap + ' ' +
                            `${this.state.activeTap === 'list' ? styles.activeTap : ''}`}
                            onClick={() => {this.changeTap('list')}}
                            >
                            <span>환전내역</span>
                        </div>
                    </div>
                    <div className={styles.tapContentWrap}>
                        {/* props type [0]계좌 [1]코인 */}
                        {
                            (this.props.type === 1 &&
                            this.state.activeTap === 'apply') &&
                            <ApplyCoinType
                                userPoint={this.props.userPoint}
                                requestChargeExchange={(data) => this.props.requestChargeExchange(data)}
                                destroyModal={() => this.props.destroyModal()}
                            />
                        }
                        {
                            (this.props.type === 0 &&
                            this.state.activeTap === 'apply') &&
                            <ApplyAccountType
                                userPoint={this.props.userPoint}
                                requestChargeExchange={(data) => this.props.requestChargeExchange(data)}
                                destroyModal={() => this.props.destroyModal()}
                            />
                        }
                        {
                            this.state.activeTap === 'list' &&
                            <ListType
                                chargeExchangeListEndPage={this.props.chargeExchangeListEndPage}
                                chargeExchangeList={this.props.chargeExchangeList}
                                requestChargeExchangeListCount={(type) => this.props.requestChargeExchangeListCount(type)}
                                requestChargeExchangeList={(type, page) =>
                                this.props.requestChargeExchangeList(type, page)}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}