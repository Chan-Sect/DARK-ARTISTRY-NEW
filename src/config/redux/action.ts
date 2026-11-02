export interface ActionType
{
    value: boolean
    type: 'SET' | 'ERROR'
}

class Action
{
    static SET = 'SET'
    static ERROR = 'ERROR'
    static set = (value: boolean) => ({ type : this.SET, value })
    static error = { type : this.ERROR }
}

export default Action