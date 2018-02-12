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
                chatmsg: action.payload,
                unread: action.payload.filter(v => !v.read).length,
            };
        case MSG_RECV:
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload],
            };
        // case MSG_READ:
        default:
            return state;
    }
}

// action creator
function msgList(msgs) {
    return {type: MSG_LIST, payload: msgs};
}

function msgRecv(msg) {
    return {type: MSG_RECV, payload: msg};
}

// business function
export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.state === 200 && res.data.code === 0) {
                    dispatch(msgList(res.data.msgs));
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
    return dispatch => {
        socket.on('recievemsg', (data) => {
            dispatch(msgRecv(data));
        })
    };
}


