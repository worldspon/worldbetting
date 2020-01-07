import React from 'react';
import styles from './charge.css';
import ApplyCoinType from './chargecontent/applycointype';
import ListType from './chargecontent/chargelisttype';
import ApplyAccountType from './chargecontent/applyaccounttype';


export default class Charge extends React.Component {
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
            <div className={styles.chargeApplyBox}>
                <div className={styles.chargeTitle}>
                    <h1>충전</h1>
                    <img
                        className={styles.cancelButton}
                        src={require('../../images/cancel_button.png')}
                        onClick={() => {this.props.destroyModal()}}
                    />
                </div>
                <div className={styles.chargeContentBox}>
                    <div className={styles.tapTitleWrap}>
                        <div
                            className={styles.chargeApplyTap + ' ' +
                            `${this.state.activeTap === 'apply' ? styles.activeTap : ''}`}
                            onClick={() => this.changeTap('apply')}
                            >
                            <span>충전신청</span>
                        </div>
                        <div
                            className={styles.chargeListTap + ' ' +
                            `${this.state.activeTap === 'list' ? styles.activeTap : ''}`}
                            onClick={() => this.changeTap('list')}
                            >
                            <span>충전내역</span>
                        </div>
                    </div>
                    <div className={styles.tapContentWrap}>
                        {/* props type [0]계좌 [1]코인 */}
                        {
                            (this.props.type === 1 && this.state.activeTap === 'apply') &&
                            <ApplyCoinType
                                uniqueId={this.props.uniqueId}
                                companyCoinList={this.props.companyCoinList}
                                requestCompanyCoinList={() => this.props.requestCompanyCoinList()}
                                requestChargeExchange={(data) => this.props.requestChargeExchange(data)}
                                destroyModal={() => this.props.destroyModal()}
                            />
                        }
                        {
                            (this.props.type === 0 && this.state.activeTap === 'apply') &&
                            <ApplyAccountType
                                requestChargeExchange={(data) => this.props.requestChargeExchange(data)}
                                destroyModal={() => this.props.destroyModal()}
                            />
                        }
                        {
                            this.state.activeTap === 'list' &&
                            <ListType
                                chargeExchangeList={this.props.chargeExchangeList}
                                requestChargeExchangeList={(type) =>
                                this.props.requestChargeExchangeList(type)}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}