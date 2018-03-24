import React from 'react';
import { connect } from 'react-redux';
import {
    List,
    InputItem,
    NavBar,
    Icon,
    Grid,
} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim'; // 进场动画

import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux';
import { getChartId } from '../../util';

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '', // 当前返送信息
            msg: [], // 全部信息
            showEmoji: false, // 是否显示emoji列表
        };
    }

    componentDidMount() {
        this.props.getMsgList();
        this.props.recvMsg();
    }
    
    componentWillUnmount() {
        const from = this.props.match.params.user;
        
        this.props.readMsg(from);
    }
    
    // 解决emoji grid的显示问题
    fixCarousel = () => {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 0)
    }

    handleSubmit = () => {
        const from = this.props.user._id,
            to = this.props.match.params.user,
            msg = this.state.text;
        this.props.sendMsg({ from, to, msg });
        this.setState({ text: '' });
    }

    render() {
        const userid = this.props.match.params.user,
            users = this.props.chat.users,
            chatid = getChartId(this.props.user._id, userid),
            chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid),
            emoji = `😀 😁 😂 🤣 😃 😄 😅 😆 😉 
                    😊 😋 😎 😍 😘 😗 😙 😚 🙂 
                    🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 
                    😣 😥 😮 🤐 😯 😪 😫 😴 😌 
                    😛 😜 😝 🤤 😒 😓 😔 😕 🙃 
                    🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 
                    😭 😦 😧 😨 😩 🤯 😬 😰 😱 
                    😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 
                    🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 
                    🧐 🤓 😈 👿 👹 👺 💀 👻 👽 
                    🤖 💩 😺 😸 😹 😻 😼 😽 🙀 
                    😿 😾`
                .replace(/[\r\n]/g, "")
                .replace(/\s+/g, ' ')
                .split(' ')
                .map(v => ({ text: v }));

        if (!users || !users[userid]) {
            return null;
        }
        return (
            <div id="chat-page">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[userid].name}
                </NavBar>
                <div className="msg-content">
                    <QueueAnim>
                        {chatmsg.map(v => {
                            const avatar = require(`../avatar-selector/images/${users[v.from].avatar}.png`);

                            return v.from === userid ?
                                (
                                    <List key={v._id}>
                                        <List.Item
                                            thumb={avatar}
                                        >{v.content}</List.Item>
                                    </List>
                                ) : (
                                    <List key={v._id}>
                                        <List.Item
                                            className="chat-me"
                                            extra={<img src={avatar} alt="avatar" />}
                                        >{v.content}</List.Item>
                                    </List>
                                );
                        })}
                    </QueueAnim>
                </div>
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => this.setState({ text: v })}
                            extra={
                                <div>
                                    <span
                                        role="img"
                                        aria-label="jsx-a11y/aria-proptypes"
                                        style={{ marginRight: 10, lineHeight: '22px', }}
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: !this.state.showEmoji,
                                            });
                                            this.fixCarousel();
                                        }}
                                    >🤣</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji ?
                        <Grid
                            data={emoji}
                            columnNum={9}
                            isCarousel
                            carouselMaxRow={4}
                            onClick={el => {
                                this.setState({
                                    text: this.state.text + el.text,
                                });
                            }}
                        ></Grid>
                        :
                        null
                    }

                </div>
            </div>
        );
    }
}

export default Chat;