import React from 'react';
import styles from './infochange.css';
import InfoChangeContent from './infochangecontent/infochangecontent';


export default class InfoChange extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.infoChangeApplyBox}>
                <div className={styles.infoChangeTitle}>
                    <h1>정보수정</h1>
                    <img
                        className={styles.cancelButton}
                        src={require('../../images/cancel_button.png')}
                        onClick={() => {this.props.destroyModal()}}
                    />
                </div>
                <div className={styles.infoChangeContentBox}>
                    <div className={styles.tapContentWrap}>
                        <InfoChangeContent
                            requestChangeUserInfo={(data) => this.props.requestChangeUserInfo(data)}
                            requestUserInfo={() => this.props.requestUserInfo()}
                            userInfo={this.props.userInfo}
                            destroyModal={() => {this.props.destroyModal()}} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}