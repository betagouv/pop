
export const initialState = {
    notice: null,
    links: null,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
    case "notice/DID_FETCH": {
        const { notice, links } = action;
        return {
            ...state,
            notice,
            links,
        };
    }
    default:
        return state;
    }
};

export default {
    app: appReducer,
};
