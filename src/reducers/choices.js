import {CHOICES_SET, CHOICES_SET_IDS} from "../constants/actionTypes";
import stageTypes from "../constants/stageTypes";

let initialState = {
    ids: []
};
for (const stage of stageTypes) {
    if (stage) initialState[stage.type] = [];
}

export default (state = initialState, action) => {

    if (action.type === CHOICES_SET) {
        return Object.assign({}, state, {
            [action.payload.type]: action.payload.choice
        });
    } else if (action.type === CHOICES_SET_IDS) {
        return Object.assign({}, state, {
            ids: action.payload
        });
    }

    return state;
}
