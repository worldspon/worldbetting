import React from 'react';
import Pagination from '../../../commoncomponent/pagination/pagination';
import styles from './chargelisttype.css';


export default class ListType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chargeListCurrentPage: 0,
            chargeListEndPage: 0,
        }
    }

    // ---------페이지 이동 함수-------------
    movePage(pageNum) {
        this.setState({
            chargeListCurrentPage: pageNum
        }, () => {
            this.props.requestChargeExchangeListCount(1);
            this.props.requestChargeExchangeList(1, this.state.chargeListCurrentPage + 1);
        });
    }

    moveFirstPage() {
        this.setState({
            chargeListCurrentPage: 0
        }, () => {
            this.props.requestChargeExchangeListCount(1);
            this.props.requestChargeExchangeList(1, this.state.chargeListCurrentPage + 1);
        })
    }

    movePrevPhrase() {
        this.setState({
            chargeListCurrentPage: this.state.chargeListCurrentPage - 5 >= 0 ? this.state.chargeListCurrentPage-5 : 0
        }, () => {
            this.props.requestChargeExchangeListCount(1);
            this.props.requestChargeExchangeList(1, this.state.chargeListCurrentPage + 1);
        });
    }

    moveNextPhrase() {
        this.setState({
            chargeListCurrentPage: this.state.chargeListCurrentPage + 5 < this.props.chargeExchangeListEndPage ? this.state.chargeListCurrentPage + 5 : this.props.chargeExchangeListEndPage
        }, () => {
            this.props.requestChargeExchangeListCount(1);
            this.props.requestChargeExchangeList(1, this.state.chargeListCurrentPage + 1);
        });
    }

    moveEndPage() {
        this.setState({
            chargeListCurrentPage: this.props.chargeExchangeListEndPage
        }, () => {
            this.props.requestChargeExchangeListCount(1);
            this.props.requestChargeExchangeList(1, this.state.chargeListCurrentPage + 1);
        })
    }
    // ---------페이지 이동 함수-------------

    // LIST CONTENT JSX 및 END PAGE 업데이트 함수 제작
    // dhlottery.js createResultListJSX 함수 참고

    createChargeListJSX(chargeList) {
        const chargeListJSX = []
        for(const [index, value] of chargeList) {
            chargeListJSX.push((
                <tr
                    className={styles.listRow}
                    key={index}
                >
                    <td className={styles.userDeposit}>
                        <p className={styles.userDepositMoney}>{value.userPoint}원</p>
                        <p className={styles.userDepositCoin}>{value.userCoin}coin</p>
                    </td>
                    <td className={styles.accountInfo}>
                        <p className={styles.coinName}>{value.userBank}</p>
                        <p className={styles.accountName}>{value.userAccount}</p>
                        <p className={styles.applyDate + ' ' + styles.mobileTableElement}>{value.applyDate}</p>
                        <p className={styles.confirmDate + ' ' + styles.mobileTableElement}>{value.handleDate}</p>
                    </td>
                    <td className={styles.applyConfirmDate + ' ' + styles.pcTableElement}>
                        <p className={styles.applyDate}>{value.applyDate}</p>
                        <p className={styles.confirmDate}>{value.handleDate}</p>    
                    </td>
                    <td className={styles.listState}>{value.applyState === 0 ? this.props.langPack.wait : value.applyState === 1 ? this.props.langPack.completion : this.props.langPack.hold}</td>
                </tr>
            ));
        }

        return chargeListJSX;
    }

    componentDidMount() {
        this.props.requestChargeExchangeListCount(1);
        this.props.requestChargeExchangeList(1, this.state.chargeListCurrentPage + 1);
    }


    render() {
        const chargeList = []
        if(this.props.chargeExchangeList !== undefined){
            chargeList.push(...this.createChargeListJSX(this.props.chargeExchangeList.entries()));
        }

        return (
            <div className={styles.listTypeWrap}>
                <table className={styles.applyListTable}>
                    <thead>
                        <tr>
                            <th>{this.props.langPack.applyMoney}</th>
                            <th className={styles.pcTableElement}>{this.props.langPack.accountInfo}</th>
                            <th className={styles.mobileTableElement}>{this.props.langPack.applyInfo}</th>
                            <th className={styles.pcTableElement}>{this.props.langPack.result}</th>
                            <th>{this.props.langPack.state}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chargeList}
                    </tbody>
                </table>
                <Pagination
                    currentPage={this.state.chargeListCurrentPage}
                    endPage={this.props.chargeExchangeListEndPage}
                    movePage={(pageNum) => this.movePage(pageNum)}
                    moveFirstPage={() => this.moveFirstPage()}
                    movePrevPhrase={() => this.movePrevPhrase()}
                    moveNextPhrase={() => this.moveNextPhrase()}
                    moveEndPage={() => this.moveEndPage()}
                />
            </div>
        )
    }
}