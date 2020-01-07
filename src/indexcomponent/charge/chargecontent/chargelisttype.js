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
            // 리스트 비동기 or 소켓 emit 함수 호출
        });
    }

    moveFirstPage() {
        this.setState({
            chargeListCurrentPage: 0
        }, () => {
            // 리스트 비동기 or 소켓 emit 함수 호출
        })
    }

    movePrevPhrase() {
        this.setState({
            chargeListCurrentPage: this.state.chargeListCurrentPage - 5 >= 0 ? this.state.chargeListCurrentPage-5 : 0
        }, () => {
            // 리스트 비동기 or 소켓 emit 함수 호출
        });
    }

    moveNextPhrase() {
        this.setState({
            chargeListCurrentPage: this.state.chargeListCurrentPage + 5 < this.state.chargeListEndPage ? this.state.chargeListCurrentPage + 5 : this.state.chargeListEndPage
        }, () => {
            // 리스트 비동기 or 소켓 emit 함수 호출
        });
    }

    moveEndPage() {
        this.setState({
            chargeListCurrentPage: this.state.chargeListEndPage
        }, () => {
            // 리스트 비동기 or 소켓 emit 함수 호출
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

        return chargeListJSX;
    }

    componentDidMount() {
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
                            <th>신청금액</th>
                            <th className={styles.pcTableElement}>계좌정보</th>
                            <th className={styles.mobileTableElement}>신청정보</th>
                            <th className={styles.pcTableElement}>신청/처리</th>
                            <th>진행상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chargeList}
                    </tbody>
                </table>
                <Pagination
                    currentPage={this.state.chargeListCurrentPage}
                    endPage={this.state.chargeListEndPage}
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