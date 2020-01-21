import React from 'react';
import ReactDOM from 'react-dom';
import styles from './guide.css';

class Guide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            printDriverGuideView: false,
            webDriverGuideView: false
        }
    }

    showPrintDriver() {
        this.setState({
            printDriverGuideView: true,
            webDriverGuideView: false
        })
    }

    showWebDriver() {
        this.setState({
            printDriverGuideView: false,
            webDriverGuideView: true
        })
    }

    render() {

        return (
            <div className={styles.wrap}>
                <h1>프린터 설치 및 적용 가이드</h1>
                <p className={styles.alertSpan}>*Google Chrome 사용을 권장합니다.</p>
                <h2>크롬 설치 방법</h2>
                <a href="https://www.google.com/intl/ko/chrome/" target="_blank">크롬 다운로드</a>
                <p>위 링크로 접속하여 크롬을 다운로드 받아 설치합니다.</p>
                <p>아래 링크를 클릭하면 가이드가 표시됩니다.</p>
                <p className={styles.downloadSpan} onClick={() => this.showPrintDriver()}>1. 프린터 드라이버 다운로드 및 설치</p>
                <p className={styles.downloadSpan} onClick={() => this.showWebDriver()}>2. 웹 드라이버 다운로드 및 설치</p>
                { this.state.printDriverGuideView &&
                    <div>
                        <a href="http://worldupdate.biz/worldbet/SRP-330II_332II_Windows_Driver_V1.2.0.zip">드라이버 다운로드</a>
                        <img className={styles.guideImg} src={require('../images/driver1.jpg')} />
                        <img className={styles.guideImg} src={require('../images/driver2.jpg')} />
                        <img className={styles.guideImg} src={require('../images/driver3.jpg')} />
                        <img className={styles.guideImg} src={require('../images/driver4.jpg')} />
                        <img className={styles.guideImg} src={require('../images/driver5.jpg')} />
                        <img className={styles.guideImg} src={require('../images/driver6.jpg')} />
                        <img className={styles.guideImg} src={require('../images/driver7.jpg')} />
                        <img className={styles.guideImg} src={require('../images/driver8.jpg')} />
                    </div>
                }
                { this.state.webDriverGuideView &&
                    <div>
                        <a href="http://worldupdate.biz/worldbet/Web_driver_Setup_EN_V1.0.2.zip">드라이버 다운로드</a>
                        <img className={styles.guideImg} src={require('../images/webdriver1.jpg')} />
                        <img className={styles.guideImg} src={require('../images/webdriver2.jpg')} />
                        <img className={styles.guideImg} src={require('../images/webdriver3.jpg')} />
                        <img className={styles.guideImg} src={require('../images/webdriver4.jpg')} />
                        <img className={styles.guideImg} src={require('../images/webdriver5.jpg')} />
                    </div>
                }

            </div>
        )
    }
}


ReactDOM.render(
    <Guide />,
    document.getElementById('root')
);