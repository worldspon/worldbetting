import React from 'react';
import styles from './pagination.css';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: this.props.currentPage,
            startPhrase: Math.floor(this.props.currentPage/5) * 5,
            endPhrase: (Math.floor(this.props.currentPage/5)+1) * 5 - 1,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.currentPage !== nextProps.currentPage) {
            return {
                currentPage: nextProps.currentPage,
                startPhrase: Math.floor(nextProps.currentPage/5) * 5,
                endPhrase: (Math.floor(nextProps.currentPage/5)+1) * 5 - 1
            }
        }
        return null
    }

    render() {
        const pageNumJSX = [];

        for(let i = this.state.startPhrase; i <= this.state.endPhrase; i++ ) {
            if(i > this.props.endPage) break;
            pageNumJSX.push(
                (
                    <div
                        className={styles.pageButton + ' ' +
                        `${this.state.currentPage === i ? styles.currentPageButton : ''}`}
                        onClick={() => this.props.movePage(i)}
                        key={i}
                    >
                        <span>{i + 1}</span>
                    </div>
                )
            )
        }
        return (
            <div className={styles.paginationWrap}>
                <div className={styles.pageButton}
                    onClick={() => this.props.moveFirstPage()}
                >
                    <img className={styles.pageButtonImage} src={require('../../images/first_page_icon.png')} />
                </div>
                <div className={styles.pageButton}
                    onClick={() => this.props.movePrevPhrase()}
                >
                    <img className={styles.pageButtonImageSmall} src={require('../../images/prev_page_icon.png')} />
                </div>
                { pageNumJSX }
                <div className={styles.pageButton}
                    onClick={() => this.props.moveNextPhrase()}
                >
                    <img className={styles.pageButtonImageSmall} src={require('../../images/next_page_icon.png')} />
                </div>
                <div
                    className={styles.pageButton}
                    onClick={() => this.props.moveEndPage()}
                >
                    <img className={styles.pageButtonImage} src={require('../../images/last_page_icon.png')} />
                </div>
            </div>
        );
    }
}