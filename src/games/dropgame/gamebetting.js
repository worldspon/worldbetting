import React from 'react';
import styles from './gamebetting.css';

export default class GameBetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            gameCount: this.props.gameCount,
            bettingMoney: 0,
            ballType: '',
            gameType: '',
            bettingListObjects: [],
            bettingListTag: null
        }
    }

    // 클릭한 타입에 그림자 효과를 넣고 뺌
    toggleShadowClass(e) {

        // 그림자 효과 클래스 저장
        const bettingShadowClass = styles.bettingTypeButtonSelect;
        // 현재 선택된 클래스
        const currentSelectType = document.getElementsByClassName(bettingShadowClass);

        // 선택 클래스가 있으면 제거 후 추가, 없으면 추가만 함
        if(currentSelectType.length > 0) {
            const target = e.target.tagName === 'BUTTON' ? e.target : e.target.parentNode;
            // 현재 선택 버튼과 클릭버튼이 같으면 제거만 함
            if(currentSelectType['0'] !== target) {
                this.removeShadowClass();
                this.addShadowClass(target);
            } else {
                this.removeShadowClass();
            }
        } else {
            const target = e.target.tagName === 'BUTTON' ? e.target : e.target.parentNode;
            this.addShadowClass(target);
        }
    }

    addShadowClass(target) {
        const bettingShadowClass = styles.bettingTypeButtonSelect;
        this.setState({
            ballType: target.dataset.ball,
            gameType: target.dataset.game
        });
        target.classList.add(bettingShadowClass);
    }

    removeShadowClass() {
        // 그림자 효과 클래스 저장
        const bettingShadowClass = styles.bettingTypeButtonSelect;
        // 현재 선택된 클래스
        const currentSelectType = document.getElementsByClassName(bettingShadowClass);
        currentSelectType.length > 0 ? currentSelectType['0'].classList.remove(bettingShadowClass) : '';
        this.setState({
            ballType: '',
            gameType: ''
        });
    }

    updateBettingMoney(e) {
        if( this.state.bettingMoney + parseInt(e.target.innerText) * 10000 > 2000000 ) {
            alert('최대 베팅 금액을 초과하였습니다.');
        } else {
            this.setState({
                bettingMoney: this.state.bettingMoney + parseInt(e.target.innerText) * 10000
            });
        }
    }

    // 화폐 형식으로 변환해주는 함수
    currencyFormat(income) {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', minimumFractionDigits: 0 }).format(parseFloat(income));
    }

    bindAddShadowEvent() {
        const bettingTypeButtonClass = styles.bettingTypeButton;
        const buttonClassArray = document.getElementsByClassName(bettingTypeButtonClass);
        for(const buttonClass of buttonClassArray) {
            buttonClass.addEventListener('click', (e)=>{
                this.toggleShadowClass(e);
            })
        }
    }

    allClear() {
        this.bettingMoneyClear();
        this.removeShadowClass();
    }

    bettingMoneyClear() {
        this.setState({
            bettingMoney: 0
        });
    }

    bindBettingMoneyChangeEvent() {
        const bettingNumberButtonClass = styles.bettingNumberButton;
        const buttonClassArray = document.getElementsByClassName(bettingNumberButtonClass);
        for(const buttonClass of buttonClassArray) {
            buttonClass.addEventListener('click', (e)=>{
                this.updateBettingMoney(e);
            })
        }
    }

    bettingButtonEvent() {
        if( this.state.ballType === '') {
            alert('게임을 선택해주세요.');
        } else if(this.state.bettingMoney <= 0) {
            alert('베팅 금액을 입력해주세요.');
        } else {
            const bettingList = this.state.bettingListObjects;
            const listObject = {
                ballType: this.state.ballType,
                gameType: this.state.gameType,
                bettingMoney: this.state.bettingMoney,
                allocation: this.state.bettingMoney * 1.93
            }
            bettingList.push(listObject)
            this.setState({
                bettingListObjects: bettingList
            }, this.setBettingTag());
            this.allClear();
        }
    }

    setBettingTag() {
        const bettingListTagArray = this.state.bettingListObjects.map((obj, index) =>
            <tr className={styles.bettingListRow} key={index}>
                <td>{index + 1}</td>
                <td>{this.state.gameCount}</td>
                <td>({obj.ballType})<span className={styles.noBreakWords}>{obj.gameType}</span></td>
                <td>{obj.bettingMoney}</td>
                <td>{obj.allocation}</td>
                <td>
                    <button className={styles.bettingCancelButton} data-index={index} onClick={(e) => {this.cancelBetting(e)}}>취소</button>
                </td>
            </tr>
        )
        this.setState({
            bettingListTag: bettingListTagArray
        })
    }

    cancelBetting(e) {
        if(confirm('정말로 취소하시겠습니까?')) {
            const bettingObject = this.state.bettingListObjects;
            bettingObject.splice(e.target.dataset.index, 1);
            this.setState({
                bettingListObjects: bettingObject
            }, this.setBettingTag())
        }
    }

    componentDidMount() {
        this.bindAddShadowEvent();
        this.bindBettingMoneyChangeEvent();
    }

    render() {

        return (
            <div className={styles.bettingWrap}>
                <div className={styles.bettingTitleBox}>
                    <h1 className={styles.bettingTitle}>Zombie Drop</h1>
                    <span>Online Premium Sports Books.</span>
                </div>
                <div className={styles.bettingBoard}>
                    <div className={styles.bettingChoiceBox}>
                        <div className={styles.bettingGameTitleBox}>
                            <img className={styles.ballIcon} src={require('../../images/ball_icon.png')} />
                            <h2 className={styles.currentGameTitle}>좀비낙하 {this.state.year}-{this.state.month < 10 ? '0' + this.state.month : this.state.month}-{this.state.day < 10 ? '0' + this.state.day : this.state.day} [140] {this.state.gameCount} 회차</h2>
                        </div>
                        <div className={styles.bettingButtonBoard}>
                            <div className={styles.bettingCategoryBox + ' ' + styles.bettingSingleDouble}>
                                <span className={styles.bettingCategoryTitle}>
                                    홀짝 / 언더 오버
                                </span>
                                <div className={styles.singleDoubleInnerWrap}>
                                    <div className={styles.bettingTypeButtonBox}>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingBlueButton} data-ball="일반" data-game="홀">
                                            <span className={styles.bettingType}>홀</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingBlueButton} data-ball="일반" data-game="언더">
                                            <span className={styles.bettingType}>언더</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingBlueButton} data-ball="일반" data-game="홀 + 언더">
                                            <span className={styles.bettingType}>홀 + 언더</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingBlueButton} data-ball="일반" data-game="홀 + 오버">
                                            <span className={styles.bettingType}>홀 + 오버</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                    </div>
                                    <div className={styles.bettingTypeButtonBox}>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingRedButton} data-ball="일반" data-game="짝">
                                            <span className={styles.bettingType}>짝</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingRedButton} data-ball="일반" data-game="오버">
                                            <span className={styles.bettingType}>오버</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingRedButton} data-ball="일반" data-game="짝 + 언더">
                                            <span className={styles.bettingType}>짝 + 언더</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingRedButton} data-ball="일반" data-game="짝 + 오버">
                                            <span className={styles.bettingType}>짝 + 오버</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.bettingCategoryBox + ' ' + styles.bettingSizeMix}>
                                <span className={styles.bettingCategoryTitle}>
                                    대중소 조합
                                </span>
                                <div className={styles.sizeMixInnerWrap}>
                                    <div className={styles.bettingTypeButtonBox}>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingGrayButton} data-ball="일반" data-game="대">
                                            <span className={styles.bettingType}>대</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingBlueButton} data-ball="일반" data-game="홀 + 대">
                                            <span className={styles.bettingType}>홀 + 대</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingRedButton} data-ball="일반" data-game="짝 + 대">
                                            <span className={styles.bettingType}>짝 + 대</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                    </div>
                                    <div className={styles.bettingTypeButtonBox}>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingGrayButton} data-ball="일반" data-game="중">
                                            <span className={styles.bettingType}>중</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingBlueButton} data-ball="일반" data-game="홀 + 중">
                                            <span className={styles.bettingType}>홀 + 중</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingRedButton} data-ball="일반" data-game="짝 + 중">
                                            <span className={styles.bettingType}>짝 + 중</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                    </div>
                                    <div className={styles.bettingTypeButtonBox}>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingGrayButton} data-ball="일반" data-game="소">
                                            <span className={styles.bettingType}>소</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingBlueButton} data-ball="일반" data-game="홀 + 소">
                                            <span className={styles.bettingType}>홀 + 소</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                        <button className={styles.bettingTypeButton + ' ' + styles.bettingRedButton} data-ball="일반" data-game="짝 + 소">
                                            <span className={styles.bettingType}>짝 + 소</span>
                                            <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bettingCategoryBox + ' ' + styles.bettingLastBall}>
                                <span className={styles.bettingCategoryTitle}>
                                    마지막숫자(좀비볼)
                                </span>
                                <div className={styles.bettingTypeButtonBox}>
                                    <button className={styles.bettingTypeButton + ' ' + styles.bettingBlueButton} data-ball="일반" data-game="홀">
                                        <span className={styles.bettingType}>일반볼 홀</span>
                                        <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                    </button>
                                    <button className={styles.bettingTypeButton + ' ' + styles.bettingRedButton} data-ball="일반" data-game="짝">
                                        <span className={styles.bettingType}>일반볼 짝</span>
                                        <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                    </button>
                                    <button className={styles.bettingTypeButton + ' ' + styles.bettingBlueButton} data-ball="일반" data-game="언더">
                                        <span className={styles.bettingType}>일반볼 언더</span>
                                        <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                    </button>
                                    <button className={styles.bettingTypeButton + ' ' + styles.bettingRedButton} data-ball="일반" data-game="오버">
                                        <span className={styles.bettingType}>일반볼 오버</span>
                                        <span className={styles.bettingAllocation}>(1.93 / 200)</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bettingSlipBox}>
                        <div className={styles.bettingSlipTitleBox}>
                            <p className={styles.bettingSlipTitle}>BET SLIP</p>
                            <button className={styles.bettingAllClearButton} onClick={() => {
                                this.allClear();
                            }}>전체 초기화</button>
                        </div>
                        <div className={styles.bettingSlipNumberBox}>
                            <p className={styles.bettingMoney}>{this.currencyFormat(this.state.bettingMoney)}</p>
                            <div className={styles.bettingNumberRow}>
                                <button className={styles.bettingNumberButton}>1</button>
                                <button className={styles.bettingNumberButton}>3</button>
                            </div>
                            <div className={styles.bettingNumberRow}>
                                <button className={styles.bettingNumberButton}>5</button>
                                <button className={styles.bettingNumberButton}>10</button>
                            </div>
                            <div className={styles.bettingNumberRow}>
                                <button className={styles.bettingNumberButton}>20</button>
                                <button className={styles.bettingNumberButton}>30</button>
                            </div>
                            <div className={styles.bettingNumberRow}>
                                <button className={styles.bettingNumberButton}>50</button>
                                <button className={styles.bettingNumberButton}>100</button>
                            </div>
                            <div className={styles.bettingNumberRow}>
                                <button className={styles.bettingNumberClearButton} onClick={() => {
                                    this.bettingMoneyClear();
                                }}>C</button>
                            </div>
                            <div className={styles.bettingNumberRow}>
                                <button className={styles.bettingButton} onClick={() => {this.bettingButtonEvent();}}>베팅하기</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                            {this.state.bettingListTag}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}