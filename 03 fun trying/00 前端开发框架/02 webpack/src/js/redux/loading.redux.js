const SHOW_LAODING = 'SHOW_LAODING',
    HIDE_LOADING = 'HIDE_LOADING',
    initState = {
        ifShow: false,
    };

// reducer
export function loading(state = initState, action) {
    switch (action.type) {
    case SHOW_LAODING:
        return { ...state, ifShow: true };
    default:
        return state;
    }
}

// action creator
export function showLoading() {
    return {
        type: SHOW_LAODING,
    };
}

export function hideLoading() {
    return {
        type: HIDE_LOADING,
    };
}
