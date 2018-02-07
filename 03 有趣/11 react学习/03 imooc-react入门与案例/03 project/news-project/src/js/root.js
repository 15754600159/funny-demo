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
import PCNewsDetail from './components/pc_news_detail';
import MobileNewsDetail from './components/mobile_news_detail';
import PCUserCenter from './components/pc_usercenter';
import MobileUserCenter from './components/mobile_usercenter';

class Root extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query="(min-device-width: 1224px)">
                    <HashRouter>
                        <Switch>
                            <Route exact path="/" component={PCIndex}></Route>
                            <Route path="/details/:uniquekey" component={PCNewsDetail}></Route>
                            <Route path="/usercenter" component={PCUserCenter}></Route>
                        </Switch>
                    </HashRouter>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1224px)">
                    <HashRouter>
                        <Switch>
                            <Route exact path="/" component={MobileIndex}></Route>
                            <Route path="/details/:uniquekey" component={MobileNewsDetail}></Route>
                            <Route path="/usercenter" component={MobileUserCenter}></Route>
                        </Switch>
                    </HashRouter>
                </MediaQuery>
            </div>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('mainContainer')
);
