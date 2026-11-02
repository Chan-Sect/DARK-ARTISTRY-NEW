import { Lock, Public, PeopleAlt, QuestionMark } from "@mui/icons-material";


class Privacy
{
    #_type

    constructor(type)
    {
        this.#_type = type || 1
    }

    get Icon()
    {
        switch (this.#_type)
        {
            case 3: return Lock
            case 2: return PeopleAlt
            case 1: return Public
            default: return QuestionMark
        }
    }

    get name()
    {
        switch (this.#_type)
        {
            case 3: return 'Riêng tư'
            case 2: return 'Bạn bè'
            case 1: return 'Công khai'
            default: return ''
        }
    }

    get value()
    {
        return this.#_type
    }

    static get Private()
    {
        return new Privacy(3)
    }

    static get Friend()
    {
        return new Privacy(2)
    }

    static get Public()
    {
        return new Privacy(1)
    }
}

export default Privacy