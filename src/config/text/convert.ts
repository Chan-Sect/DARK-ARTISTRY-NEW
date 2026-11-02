import type Direction from "../directions/Direction.tsx";

export const convertToNestedPaths = (paths: string[]) => paths.reduce((acc: string[], cur) =>
{
    const last = acc[acc.length - 1] || '';
    const next = last + cur
    acc.push(next)
    return acc;
}, [])

export const flattenNodes = (array: Direction[]) =>
{
    const result: Direction[] = []

    const traverse = (node: Direction) =>
    {
        result.push(node)
        if (node.children) node.children.forEach(traverse)
    }

    array.forEach(traverse)
    return result
}

// export const getDeepValue = (obj, path, value) =>
// {
//     const keys = path.split('.')
//     const lastKey = keys.pop()
//
//     const output = keys.reduceRight((acc, key, _, arr) =>
//     {
//         return {
//             ...getByPath(obj, arr.slice(0, arr.length - acc.depth)),
//             [key]:
//             {
//                 ...getByPath(obj, arr.slice(0, arr.length - acc.depth + 1)),
//                 [acc.key]: acc.value
//             },
//             depth: acc.depth + 1,
//             key
//         }
//     }, { key: lastKey, value, depth: 1 })
//
//     delete output.depth
//     delete output.key
//
//     return output
// }
//
// const getByPath = (obj, keys) =>
// {
//     return keys.reduce((acc, key) => acc?.[key], obj)
// }
