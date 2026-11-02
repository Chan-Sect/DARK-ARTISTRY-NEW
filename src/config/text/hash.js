import CryptoJS from 'crypto-js'
import { hexToRgb } from "@mui/material";

export const MD5 = password => password.length ? CryptoJS.MD5(password).toString() : ''

export const encodeBase64url = str => btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
export const base64urlToBase64 = str => str.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(str.length / 4) * 4, '=')
export const arrayToBase64 = buffer => btoa(String.fromCharCode(...new Uint8Array(buffer))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
export const blend = (color1, color2, ratio) =>
{
    if (ratio <= 0) return color2
    if (ratio >= 1) return color1

    const rgb1 = hexToRgb(color1).match(/\d+/g).map(Number)
    const rgb2 = hexToRgb(color2).match(/\d+/g).map(Number)

    const blended = rgb1.map((c1, i) =>
    {
        const c2 = rgb2[i]
        return Math.round(c1 * ratio + c2 * (1 - ratio))
    })

    const toHex = n => n.toString(16).padStart(2, '0')
    return `#${blended.map(toHex).join('')}`
}