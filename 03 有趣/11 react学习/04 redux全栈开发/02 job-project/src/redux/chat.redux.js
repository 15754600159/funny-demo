import io from 'socket.io-client';
import axios from 'axios';

const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST', // 获取聊天列表
    MSG_RECV = 'MSG_RECV', // 读取信息
    MSG_READ = 'MSG_READ';  // 标识已读

const initState = {
    chatmsg: [],
    unread: 0,
}

// reducer
export function chat(state = initState, action) {
    switch(action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload.msgs,
                users: action.payload.users,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length,
            };
        case MSG_RECV:
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload.msg],
                unread: action.payload.msg.to === action.payload.userid ? state.unread + 1 : state.unread,
            };
        // case MSG_READ:
        default:
            return state;
    }
}

// action creator
function msgList(msgs, users, userid) {
    return {type: MSG_LIST, payload: {msgs, users, userid}};
}

function msgRecv(msg, userid) {
    return {type: MSG_RECV, payload: {msg, userid}};
}

// business function
export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userid = getState().user._id;
                    dispatch(msgList(res.data.msgs, res.data.users, userid));
                }
            });
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg});
    };
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.off('recievemsg').on('recievemsg', (data) => { // 避免重复监听
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid));
        })
    };
}


