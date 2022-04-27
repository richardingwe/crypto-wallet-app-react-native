export const SET_TRADE_MODAL_VISIBILITY = 'SET_TRADE_MODAL_VISIBILITY';

export const setTradeModalVisibilitySuccess = (isVisble) => ({
    type: SET_TRADE_MODAL_VISIBILITY,
    payload: { isVisble }
});


export function setTradeModalVisibility(isVisible) {
    return dispatch => {
        dispatch(setTradeModalVisibilitySuccess(isVisible));
    };
}