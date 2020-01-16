import React from 'react';
import styles from './bettingresult.css';

export default class BettingResult extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.responseBettingResultCount();
        this.props.responseBettingResult();
    }

    // 컴포넌트 unmount시 props 데이터 초기화 함수 호출
    componentWillUnmount() {
        this.props.resetPageState();
    }

    render() {

        return (
            <div className={styles.gameResultWrap}>
                <div className={styles.gameResultTitleBox}>
                    <h1 className={styles.gameResultTitle}>{this.props.gameTitle} Betting Result</h1>
                    <img className={styles.cancelButton} src={require('../../../images/cancel_button.png')} onClick={() => {this.props.destroyBettingResultComponent()}}/>
                </div>
                <div className={styles.gameResultListBox}>
                    <table className={styles.gameResultListTable}>
                        <thead>
                            <tr className={styles.gameResultTableHeader}>
                                <th rowSpan='2' className={styles.gameCountTh}>회차</th>
                                <th colSpan='4' className={styles.resultHeaderTh}>결과</th>
                            </tr>
                            <tr className={styles.gameResultTableHeader}>
                                <th className={styles.resultFirstTh}>베팅일시</th>
                                <th className={styles.resultLastTh}>베팅타입</th>
                                <th className={styles.resultLastTh}>베팅금액</th>
                                <th className={styles.resultLastTh}>결과</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.bettingResultList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}