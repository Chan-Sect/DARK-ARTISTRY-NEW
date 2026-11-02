export const removeVietnameseTones = str => str.replace(/[\u0300-\u036f]/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")

export const encodeToSlug = str => removeVietnameseTones(str.toLowerCase()).replace(/[^a-z0-9\- ]/g, '').trim()

export const formatTime = (time, short = false) =>
{
    const date = new Date(time)

    const offset = - new Date().getTimezoneOffset() / 60
    const sign = offset >= 0 ? '+' : '-'
    const timeZone = `GMT${sign}${Math.abs(offset)}`

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    return short ? `${ hours }:${ minutes }` : `${ hours }:${ minutes }:${ seconds } (${ timeZone })`
}
export const formatDate = (time, short = false) =>
{
    const date = new Date(time)

    const offset = - new Date().getTimezoneOffset() / 60
    const sign = offset >= 0 ? '+' : '-'
    const timeZone = `GMT${sign}${Math.abs(offset)}`

    const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const dayOfWeek = daysOfWeek[date.getDay()]

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return short ? `${ day }/${ month }/${ year }` : `${ formatTime(time, true) } ${ dayOfWeek }, ngày ${ day }/${ month }/${ year } (${ timeZone })`
}
export const encodeTime = time =>
{
    const date = new Date(time)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${ day }${ month }${ year }`
}
export const decodeTime = str =>
{
    if (str)
    {
        try
        {
            const day = str.slice(0, 2)
            const month = str.slice(2, 4)
            const year = str.slice(4)

            return new Date(`${ year }-${ month }-${ day }`).getTime()
        }
        catch {}

    }
   return Date.now().getTime()
}
export const firstDay = time => new Date(new Date(time).getFullYear(), new Date(time).getMonth(), new Date(time).getDate()).getTime()
export const lastDay = time => new Date(new Date(time).getFullYear(), new Date(time).getMonth(), new Date(time).getDate() + 1).getTime() - 1
export const isToday = date => isSameDate(date, Date.now())
export const isSameDate = (date1, date2) =>
{
    date1 = new Date(date1)
    date2 = new Date(date2)
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
}

export const isValidDate = date => !isNaN(new Date(date).getTime())
export const randomCode = length =>
{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
export const formatStorageSize = size =>
{
    const units = ['byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let unitIndex = 0

    while (size >= 1024 && ++unitIndex) size /= 1024

    return `${ parseFloat(size.toFixed(unitIndex ? 1 : 0))} ${units[unitIndex]} `
}
export const formatTimeDifferent = (diff, showSecond = false) =>
{
    if (diff === -1) return ''
    const second = 1000
    const minute = 60 * second
    const hour = 60 * minute
    const day = 24 * hour
    const week = 7 * day
    const month = 30 * day
    const year = 365 * day

    if (diff < minute) return showSecond ? `${ Math.floor(diff / second)} giây` : `Vừa xong`
    if (diff < hour) return `${Math.floor(diff / minute)} phút`
    if (diff < day) return `${Math.floor(diff / hour)} giờ`
    if (diff < week) return `${Math.floor(diff / day)} ngày`
    if (diff < month) return `${Math.floor(diff / week)} tuần`
    if (diff < year) return `${Math.floor(diff / month)} tháng`
    return `${Math.floor(diff / year)} năm`
}
export const formatDuration = seconds =>
{
    if (typeof seconds !== 'number') return ''
    const pad = num => num.toString().padStart(2, '0')

    const totalSeconds = Math.floor(seconds)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60

    return hours > 0 ? `${ pad(hours) }:${ pad(minutes) }:${ pad(secs) }` : `${ pad(minutes) }:${ pad(secs) }`
}