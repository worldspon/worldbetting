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
                    <h1>{this.props.langPack.headLine}</h1>
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
                            <span>{this.props.langPack.chargeApply}</span>
                        </div>
                        <div
                            className={styles.chargeListTap + ' ' +
                            `${this.state.activeTap === 'list' ? styles.activeTap : ''}`}
                            onClick={() => this.changeTap('list')}
                            >
                            <span>{this.props.langPack.chargeList}</span>
                        </div>
                    </div>
                    <div className={styles.tapContentWrap}>
                        {/* props type [0]계좌 [1]코인 */}
                        {
                            (this.props.type === 1 && this.state.activeTap === 'apply') &&
                            <ApplyCoinType
                                langPack={this.props.langPack.coinType}
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
                                langPack={this.props.langPack.accountType}
                                uniqueId={this.props.uniqueId}
                                companyAccount={this.props.companyAccount}
                                requestCompanyAccount={() => this.props.requestCompanyAccount()}
                                requestChargeExchange={(data) => this.props.requestChargeExchange(data)}
                                destroyModal={() => this.props.destroyModal()}
                            />
                        }
                        {
                            this.state.activeTap === 'list' &&
                            <ListType
                                langPack={this.props.langPack.listType}
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