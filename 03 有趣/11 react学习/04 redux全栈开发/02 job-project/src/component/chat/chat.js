import React from 'react';
import { connect } from 'react-redux';
import { 
    List,
    InputItem, 
} from 'antd-mobile';

import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
        };
    }

    componentDidMount() {
        this.props.getMsgList();
        this.props.recvMsg();
    }

    handleSubmit = () => {
        const from = this.props.user._id,
            to = this.props.match.params.user,
            msg = this.state.text;
        this.props.sendMsg({from, to, msg});
        this.setState({text: ''});
    }

    render() {
        return (
            <div>
                {this.state.msg.map(v => (
                    <p key={v}>{v}</p>
                ))}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => this.setState({text: v})}
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                        ></InputItem>
                    </List>
                </div>
            </div>
        );
    }
}

export default Chat;