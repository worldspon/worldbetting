import React from 'react';
import styles from './bettinglist.css';
import searchGameType from '../../../commonfunction/searchgametype';
import searchAllocation from '../../../commonfunction/searchallocation';

export default class BettingList extends React.Component {
    constructor(props) {
        super(props);
        this.gameResultModal = React.createRef();
    }

    createBettingListJSX(data) {
        const listArray = [];
        for(const [index, obj] of Object.entries(data)) {
            const typeObject = searchGameType(obj.gameType);
            const allocationMoney = Math.round(searchAllocation(this.props.gameType, obj.gameType, this.props.allocation) * obj.bettingMoney);
            listArray.push(
            <tr className={styles.bettingListRow}
                key={index}
            >
                <td>{parseInt(index) + 1}</td>
                <td>{this.props.gameRound}</td>
                <td>({typeObject.ballType})<span className={styles.noBreakWords}>{typeObject.gameType}</span></td>
                <td>{new Intl.NumberFormat().format(obj.bettingMoney)}</td>
                <td>{new Intl.NumberFormat().format(allocationMoney)}</td>
                <td>
                    <button className={styles.bettingCancelButton} data-type={obj.gameType} data-unique={obj.listUnique} onClick={(e) => this.props.requestCancelBetting(e)}>취소</button>
                </td>
            </tr>);
        }
        return listArray;
    }


    destroyResultModal() {
        this.gameResultModal.current.style.display = 'none';
    }

    componentDidMount() {
        // this.bindAddShadowEvent();
        // this.bindBettingMoneyChangeEvent();
    }

    render() {
        const bettingListJSX = [];
        if(this.props.bettingList.length !== 0) {
            bettingListJSX.push(...this.createBettingListJSX(this.props.bettingList));
        }

        return (
            <div className={styles.bettingListBox}>
                <table className={styles.bettingListTable}>
                    <thead>
                        <tr className={styles.bettingTableHeader}>
                            <th>순번</th>
                            <th>베팅회차</th>
                            <th>베팅</th>
                            <th>베팅금액</th>
                            <th>당첨예상금</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bettingListJSX}
                    </tbody>
                </table>
            </div>
        )
    }
}