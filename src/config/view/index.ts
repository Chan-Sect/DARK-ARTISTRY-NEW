import {ViewList, ViewModule} from "@mui/icons-material";
import { ViewKey } from "./Key.ts";

class View
{
    public readonly value: ViewKey

    protected constructor(value: ViewKey)
    {
        this.value = value
    }

    get Icon()
    {
        switch (this.value)
        {
            case ViewKey.List: return ViewList
            case ViewKey.Grid: return ViewModule
        }
    }
}

export default View