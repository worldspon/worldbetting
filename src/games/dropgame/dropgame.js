import React from 'react';
import ReactDOM from 'react-dom';
import common from '../../common.css';
import Header from '../commoncomponent/header/header';
import GameBetting from './gamebetting';


class DropGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameCycleTime: 180000,
            gameCount: parseInt(Math.random() * 10**6),
            logoURL: '../../../images/zombiedrop_game_icon.png'
        }
    }

    render() {
        return (
            <div className={common.wrap}>
                <div className={common.main}>
                    <Header gameCount={this.state.gameCount} gameCycleTime={this.state.gameCycleTime} logoURL={this.state.logoURL} />
                    <GameBetting gameCount={this.state.gameCount} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <DropGame />,
    document.getElementById('root')
);