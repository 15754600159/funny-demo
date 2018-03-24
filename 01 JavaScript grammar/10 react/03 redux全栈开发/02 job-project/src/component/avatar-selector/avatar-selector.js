import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component{
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const avatarList = 'bat, beatles, butterfly, chameleon, cock, crocodile, dog, elephant, hippo, husky, kangaroo, manatee, monkey, rabbit, whale'
            .split(', ')
            .map(v => ({
                icon: require(`./images/${v}.png`),
                text: v,
            }));
        const gridHeader = this.state.icon 
        ? (<div>
            <span>已选择头像</span>
            <img style={{width:20}} src={this.state.icon} alt="avatar"/>
        </div>)
        :
        '请选择头像';

        return (
            <List renderHeader={() => gridHeader}>
                <Grid 
                data={avatarList} 
                columnNum={5}
                onClick={elem => {
                    this.setState(elem);
                    this.props.selectAvatar(elem.text);
                }}
                />
            </List>
        );
    }
}

export default AvatarSelector;