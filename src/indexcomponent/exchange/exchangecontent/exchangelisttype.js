import React from 'react';
import styles from './exchangelisttype.css';
import Pagination from '../../../commoncomponent/pagination/pagination';


export default class ListType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exchangeListCurrentPage: 0,
            exchangeListEndPage: 0,
        }
    }

    // ---------페이지 이동 함수-------------
    movePage(pageNum) {
        this.setState({
            exchangeListCurrentPage: pageNum
        }, () => {
            this.props.requestChargeExchangeListCount(2);
            this.props.requestChargeExchangeList(2, this.state.exchangeListCurrentPage + 1);
        });
    }

    moveFirstPage() {
        this.setState({
            exchangeListCurrentPage: 0
        }, () => {
            this.props.requestChargeExchangeListCount(2);
            this.props.requestChargeExchangeList(2, this.state.exchangeListCurrentPage + 1);
        })
    }

    movePrevPhrase() {
        this.setState({
            exchangeListCurrentPage: this.state.exchangeListCurrentPage - 5 >= 0 ? this.state.exchangeListCurrentPage-5 : 0
        }, () => {
            this.props.requestChargeExchangeListCount(2);
            this.props.requestChargeExchangeList(2, this.state.exchangeListCurrentPage + 1);
        });
    }

    moveNextPhrase() {
        this.setState({
            exchangeListCurrentPage: this.state.exchangeListCurrentPage + 5 < this.props.chargeExchangeListEndPage ? this.state.exchangeListCurrentPage + 5 : this.props.chargeExchangeListEndPage
        }, () => {
            this.props.requestChargeExchangeListCount(2);
            this.props.requestChargeExchangeList(2, this.state.exchangeListCurrentPage + 1);
        });
    }

    moveEndPage() {
        this.setState({
            exchangeListCurrentPage: this.props.chargeExchangeListEndPage
        }, () => {
            this.props.requestChargeExchangeListCount(2);
            this.props.requestChargeExchangeList(2, this.state.exchangeListCurrentPage + 1);
        })
    }
    // ---------페이지 이동 함수-------------

    // LIST CONTENT JSX 및 END PAGE 업데이트 함수 제작
    // dhlottery.js createResultListJSX 함수 참고

    createExchangeListJSX(exchangeList) {
        const exchangeListJSX = []
        for(const [index, value] of exchangeList) {
            exchangeListJSX.push((
                <tr
                    className={styles.listRow}
                    key={index}
                >
                    <td className={styles.userDeposit}>
                        <p className={styles.userDepositMoney}>{value.userPoint}원</p>
                        <p className={styles.userDepositCoin}>{value.userCoin}코인</p>
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
                    <td className={styles.listState}>{value.applyState === 0 ? '대기' : value.applyState === 1 ? '완료' : '보류'}</td>
                </tr>
            ));
        }

        return exchangeListJSX;
    }

    componentDidMount() {
        this.props.requestChargeExchangeListCount(2);
        this.props.requestChargeExchangeList(2, this.state.exchangeListCurrentPage + 1);
    }

    render() {
        const exchangeList = []
        if(this.props.chargeExchangeList !== undefined){
            exchangeList.push(...this.createExchangeListJSX(this.props.chargeExchangeList.entries()));
        }

        return (
            <div className={styles.listTypeWrap}>
                <table className={styles.applyListTable}>
                    <thead>
                        <tr>
                            <th>신청금액</th>
                            <th className={styles.pcTableElement}>계좌정보</th>
                            <th className={styles.mobileTableElement}>신청정보</th>
                            <th className={styles.pcTableElement}>신청/처리</th>
                            <th>진행상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exchangeList}
                    </tbody>
                </table>
                <Pagination
                    currentPage={this.state.exchangeListCurrentPage}
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