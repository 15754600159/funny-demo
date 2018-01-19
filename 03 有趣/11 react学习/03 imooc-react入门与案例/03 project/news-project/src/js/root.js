import 'antd/dist/antd.css';
import '../css/pc.css';

import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './components/pc_index';

class Root extends React.Component {
    render() {
        return (
            <div>
                <PCIndex></PCIndex>
            </div>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('mainContainer')
);
