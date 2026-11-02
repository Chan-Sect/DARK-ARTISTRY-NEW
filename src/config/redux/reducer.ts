import {combineReducers} from "redux";
import Action, {type ActionType} from "./action";

const initStateLoad = false
const initStateError = false

const load = (state = initStateLoad, action: ActionType) =>
{
    switch (action.type)
    {
        case Action.SET:
            state = action.value
            return state
    }
    return state
}
const error = (state = initStateError, action: ActionType) =>
{
    switch (action.type)
    {
        case Action.ERROR:
            state = true
            return state
    }
    return state
}

const reducers = combineReducers({ load, error })
export default reducers