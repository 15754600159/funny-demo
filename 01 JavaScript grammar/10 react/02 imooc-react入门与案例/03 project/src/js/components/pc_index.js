import React from 'react';

import PCHeader from './pc_header';
import PCNewsContainer from './pc_newscontainer';
import PCFooter from './pc_footer';

class PCIndex extends React.Component {
    render() {
        return (
            <div>
                <PCHeader></PCHeader>
                <PCNewsContainer></PCNewsContainer>
                <PCFooter></PCFooter>
            </div>
        );
    };
}

export default PCIndex;