import 'antd/dist/antd.css';
import '../css/pc.css';
import '../css/mobile.css';

import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import {
    HashRouter,
    Route,
    Link,
    Switch,
} from 'react-router-dom';

import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';

class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query="(min-device-width: 1224px)">
                    <HashRouter>
                        <Switch>
                            <Route exact path="/" component={PCIndex} />
                        </Switch>
                    </HashRouter>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1224px)">
                    <HashRouter>
                        <Switch>
                            <Route exact path="/" component={MobileIndex} />
                        </Switch>
                    </HashRouter>
                </MediaQuery>
            </div>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('mainContainer'),
);
