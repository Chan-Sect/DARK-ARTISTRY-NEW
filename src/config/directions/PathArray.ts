import Path from "./Path.ts";

class PathArray extends Array<Path | string>
{
    public clearString(): Path[]
    {
        return this.filter(data => typeof data !== 'string')
    }
}

export default PathArray