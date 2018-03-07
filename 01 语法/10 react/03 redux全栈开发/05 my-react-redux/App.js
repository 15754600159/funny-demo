/*
 * @Author: 果实o 
 * @Date: 2018-03-07 11:15:47 
 * @Last Modified by:   果实o 
 * @Last Modified time: 2018-03-07 11:15:47 
 */
import React from 'react';
import { connect } from 'react-redux';

import { addGun, removeGun, addGunAsync } from './index.redux';

@connect(
    state => {num: state},
    { addGun, removeGun, addGunAsync }
)
class App extends React.Component{
    render() {
        return (
            <div>
                <h2>现在有机枪{this.props.num}把</h2>
                <button onClick={this.props.addGun}>申请武器</button>
                <button onClick={this.props.removeGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>拖两天再给</button>
            </div>
        );
    }
}

export default App;