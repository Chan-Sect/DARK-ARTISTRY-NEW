const descendingComparator = (a, b, orderBy) =>
{
    const getValue = (obj, path) => path.split('.').reduce((o, key) => o?.[key], obj)
    const valueA = getValue(a, orderBy)
    const valueB = getValue(b, orderBy)

    if (valueB < valueA) return -1
    if (valueB > valueA) return 1
    return 0;
};

export const getComparator = (order, orderBy) => order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)

export const stableSort = (array = [], comparator) =>
{
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) =>
    {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

export const prioritizeContain = (array = [], contain = []) =>
{
    if (!Array.isArray(array) || !Array.isArray(contain)) return array

    return [...array].sort((a, b) =>
    {
        const aIncluded = contain.includes(a?.id)
        const bIncluded = contain.includes(b?.id)

        if (aIncluded && !bIncluded) return -1
        if (!aIncluded && bIncluded) return 1
        return 0
    })
}
export const prioritizeID = (array = [], id = '') =>
{
    if (!Array.isArray(array) || typeof id !== 'string') return array

    return [...array].sort((a, b) =>
    {
        const aEqual = a?.id === id
        const bEqual = b?.id === id

        if (aEqual && !bEqual) return -1
        if (!aEqual && bEqual) return 1
        return 0
    })
}

export const isEqual = (a, b) =>
{
    if (a === b) return true
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false

    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)

    if (aKeys.length !== bKeys.length) return false

    for (const key of aKeys)
    {
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false
        if (!isEqual(a[key], b[key])) return false
    }

    return true
}