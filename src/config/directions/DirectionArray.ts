import Direction from "./Direction.tsx";
import PathArray from "./PathArray.ts";

class DirectionArray extends Array<Direction | string>
{
    public toPath(): PathArray
    {
        return new PathArray(...this.map(data => typeof data === 'string' ? data : data.path))
    }

    public clearString(): Direction[]
    {
        return this.filter(data => typeof data !== 'string')
    }
}

export default DirectionArray