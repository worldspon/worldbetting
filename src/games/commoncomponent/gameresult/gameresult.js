import React from 'react';
import styles from './gameresult.css';

export default class GameResult extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getGameResult();
    }

    // 컴포넌트 unmount시 props 데이터 초기화 함수 호출
    componentWillUnmount() {
        this.props.resetPageState();
    }

    render() {

        return (
            <div className={styles.gameResultWrap}>
                <div className={styles.gameResultTitleBox}>
                    <h1 className={styles.gameResultTitle}>{this.props.gameTitle} Game Result</h1>
                    <img className={styles.cancelButton} src={require('../../../images/cancel_button.png')} onClick={() => {this.props.destroyGameResultComponent()}}/>
                </div>
                <div className={styles.gameResultListBox}>
                    <table className={styles.gameResultListTable}>
                        <thead>
                            <tr className={styles.gameResultTableHeader}>
                                <th rowSpan='2' className={styles.gameCountTh}>회차</th>
                                <th colSpan='2' className={styles.resultHeaderTh}>결과</th>
                            </tr>
                            <tr className={styles.gameResultTableHeader}>
                                <th className={styles.resultFirstTh}>{this.props.gameResultThText[0]}</th>
                                <th className={styles.resultLastTh}>{this.props.gameResultThText[1]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.gameResultList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}