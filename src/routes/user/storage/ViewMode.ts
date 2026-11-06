import View from "../../../config/view";
import {ViewKey} from "../../../config/view/Key.ts";

class ViewMode extends View
{
    public constructor(value: ViewKey)
    {
        super(value)
    }

    public static get List()
    {
        return new ViewMode(ViewKey.List)
    }
    public static get Grid()
    {
        return new ViewMode(ViewKey.Grid)
    }

    public get max()
    {
        switch (this.value)
        {
            case ViewKey.List: return 9
            case ViewKey.Grid: return 12
        }
    }
}

export default ViewMode