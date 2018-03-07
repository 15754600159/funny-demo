import React from 'react';
import { connect } from 'react-redux';
import {
    List,
    Badge,
} from 'antd-mobile';

@connect(
    state => state
)
class Msg extends React.Component {
    render() {
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []; // 初始新建数组
            msgGroup[v.chatid].push(v);
        });
        const chatList = Object.values(msgGroup).sort((a, b) => {
                const a_last = a[a.length - 1].create_time,
                    b_last = b[b.length - 1].create_time;
                return b_last - a_last;
            }),
            userid = this.props.user._id,
            users = this.props.chat.users;
        return (
            <div>
                {chatList.map(v => {
                    const lasItem = v[v.length - 1],
                        fromid = lasItem.from === userid ? lasItem.to : lasItem.from,
                        from = users[fromid],
                        unreadNum = v.filter(elem => !elem.read && elem.to === userid).length;

                    if (!from) {
                        return null;
                    }
                    return (
                        <List key={lasItem._id}>
                            <List.Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../avatar-selector/images/${from.avatar}.png`)}
                                arrow="horizontal"
                                onClick={() => this.props.history.push(`/chat/${fromid}`)}
                            >
                                {from.name}
                                <List.Item.Brief>{lasItem.content}</List.Item.Brief>
                            </List.Item>
                        </List>
                    );
                })}
            </div>
        );
    }
}

export default Msg;