
export interface TimeType
{
    createTime: { from: number | null; to: number | null },
    updateTime: { from: number | null; to: number | null },
}
export interface FilterType extends TimeType
{
    search: string
}
export const PropertyTypeValues = ['name', 'mail', 'createTime', 'updateTime'] as const
export type PropertyType = typeof PropertyTypeValues[number]
export interface UserType
{
    id: string
    name: string
    mail: string
    image: string
    createTime: number
    updateTime: number
}