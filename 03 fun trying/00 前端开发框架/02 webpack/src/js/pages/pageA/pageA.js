import React from 'react';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';
import axios from 'axios';

import Icon from '../../../images/sprite.png';
import { showLoding } from '../../redux/loading.redux';

@connect(
    null,
    { showLoding },
)
class PageA extends React.Component {
    getData = () => {
        axios.get('/user/login')
            .then((res) => {
                console.log(res);
            });
    }

    render() {
        return (
            <div>
                I am PageA!
                <DatePicker />
                <img src={Icon} alt="icon" />
                <button onClick={this.props.showLoding} type="primary">显示Loading</button>
                <button onClick={this.getData} type="primary">请求</button>
            </div>
        );
    }
}

export default PageA;
