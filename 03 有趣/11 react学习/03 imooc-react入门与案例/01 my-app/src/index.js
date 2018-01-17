import React from 'react';
import ReactDOM from 'react-dom';

import ComponentHeader from './components/header.js';
import ComponentBody from './components/body.js';
import ComponentFooter from './components/footer.js';

class Index extends React.Component{
    render() {
        return (
            <div>
                {/* 注释 */}
                <ComponentHeader/>
                <ComponentBody/>
                <ComponentFooter/>
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('example')
);