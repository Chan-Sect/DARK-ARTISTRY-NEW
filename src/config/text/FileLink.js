import axios from "axios";

export class Type
{
    /**
     * @returns {string}
     */
    static get Text() { return 'text' }
    /**
     * @returns {string}
     */
    static get Link() { return 'link' }
    /**
     * @returns {string}
     */
    static get Image() { return 'image' }
    /**
     * @returns {string}
     */
    static get Audio() { return 'audio' }
    /**
     * @returns {string}
     */
    static get Video() { return 'video' }
    /**
     * @returns {string}
     */
    static get File() { return 'file' }
    /**
     * @returns {string}
     */
    static get Art() { return 'art' }
    /**
     * @returns {string}
     */
    static get Music() { return 'music' }
    /**
     * @returns {string}
     */
    static get Post() { return 'post' }
    /**
     * @returns {string}
     */
    static get Application() { return 'application' }
    /**
     * @returns {string}
     */
    static get Unknown() { return 'unknown' }

    /**
     * @returns {string}
     */
    static check = file =>
    {
        if (!file || !file.type) return Type.Unknown
        else if (file.type.startsWith('image/')) return Type.Image
        else if (file.type.startsWith('audio/')) return Type.Audio
        else if (file.type.startsWith('video/')) return Type.Video
        else return Type.File
    }
}

class FileLink
{
    static #_fromFile = async file =>
    {
        return await new Promise(resolve =>
        {
            const video = document.createElement('video')
            video.src = URL.createObjectURL(file)
            video.crossOrigin = 'anonymous'
            video.muted = true
            video.playsInline = true

            video.onloadeddata = () =>
            {
                video.currentTime = 0
            }

            video.onseeked = () =>
            {
                const canvas = document.createElement('canvas')
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight

                const ctx = canvas.getContext('2d')
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

                canvas.toBlob(blob =>
                {
                    const blobURL = URL.createObjectURL(blob)
                    resolve(blobURL)
                }, 'image/jpeg')
            }
        })
    }
    static #_fromURL = async url =>
    {
        return await new Promise(resolve =>
        {
            const video = document.createElement('video')
            video.src = url
            video.crossOrigin = 'anonymous'
            video.muted = true
            video.playsInline = true

            video.onloadeddata = () => video.currentTime = 0

            video.onseeked = () =>
            {
                const canvas = document.createElement('canvas')
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight

                const ctx = canvas.getContext('2d')
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

                canvas.toBlob(blob =>
                {
                    const blobURL = URL.createObjectURL(blob)
                    resolve(blobURL)
                }, 'image/jpeg')
            }
        })
    }

    static getVideoPicture = async data => typeof data === 'string' ? await this.#_fromURL(data) : await this.#_fromFile(data)
    static getFileSize = async url =>
    {
        if (url === null) return 0
        try
        {
            const response = await fetch(url, { method: 'HEAD' })
            const contentLength = response.headers.get('Content-Length')
            return contentLength ? parseInt(contentLength) : null
        }
        catch
        {
            return 0
        }
    }
    static getFileClassName = value =>
    {
        let type

        if (value === null) return 'fa-file'
        else if (typeof value === 'string')
        {
            type = value.split(".")
            type = type[type.length - 1]
        }
        else if (typeof value === 'object')
        {
            const parts = value.name.split('.')
            type = parts.length > 1 ? parts.pop().toLowerCase() : ''
        }

        switch (type)
        {
            case 'exe':
            case 'msi':
            case 'apk':
            case 'dmg':
            case 'deb':
            case 'rpm':
            case 'pkg':
            case 'appimage':
            case 'bin':
            case 'run': return 'fa-file-fragment'
            case 'mp3':
            case 'wav':
            case 'aac':
            case 'ogg':
            case 'flac':
            case 'wma':
            case 'aiff':
            case 'alac':
            case 'm4a':
            case 'webm':
            case 'amr': return 'fa-file-audio'
            case 'mp4':
            case 'mkv':
            case 'avi':
            case 'mov':
            case 'wmv':
            case 'flv':
            case 'mpeg':
            case 'mpg':
            case '3gp': return 'fa-file-video'
            case 'ai':
            case 'eps':
            case 'psd':
            case 'tiff':
            case 'tif':
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
            case 'webp':
            case 'raw': return 'fa-file-image'
            case 'doc':
            case 'docx':
            case 'dot':
            case 'dotx':
            case 'docm':
            case 'dotm': return 'fa-file-word'
            case 'xls':
            case 'xlsx':
            case 'xlsm':
            case 'xlt':
            case 'xltx': return 'fa-file-excel'
            case 'ppt':
            case 'pptx':
            case 'pptm':
            case 'pot':
            case 'potx':
            case 'potm': return 'fa-file-powerpoint'
            case 'rar':
            case '7z':
            case 'tar':
            case 'gz':
            case 'bz2':
            case 'xz':
            case 'zip': return 'fa-file-zipper'
            case 'js':
            case 'ts':
            case 'jsx':
            case 'tsx':
            case 'html':
            case 'css':
            case 'scss':
            case 'less':
            case 'json':
            case 'xml':
            case 'yml':
            case 'yaml':
            case 'c':
            case 'cpp':
            case 'h':
            case 'hpp':
            case 'cs':
            case 'java':
            case 'py':
            case 'rb':
            case 'php':
            case 'go':
            case 'rs':
            case 'swift':
            case 'kt':
            case 'sql':
            case 'sh':
            case 'bat':
            case 'pl':
            case 'lua': return 'fa-file-code'
            case 'csv': return 'fa-file-csv'
            case 'pdf': return 'fa-file-pdf'
            case 'txt': return 'fa-file-lines'
            default: return 'fa-file'
        }
    }

    static getAPIC = async url =>
    {
        try
        {
            const res = await axios.get(url, { responseType: 'arraybuffer' })
            const u = new Uint8Array(res.data)

            if (u[0] !== 0x49 || u[1] !== 0x44 || u[2] !== 0x33) return null

            const tagSize = ((u[6] & 0x7f) << 21) | ((u[7] & 0x7f) << 14) | ((u[8] & 0x7f) << 7) | (u[9] & 0x7f)
            let pos = 10

            while (pos < tagSize)
            {
                const id = String.fromCharCode(...u.slice(pos, pos+4))
                const frameSize = (u[pos+4]<<24) | (u[pos+5]<<16) | (u[pos+6]<<8) | u[pos+7]

                if (id === "APIC")
                {
                    let offset = pos + 10

                    const encoding = u[offset]
                    offset += 1

                    let mimeEnd = offset
                    while (u[mimeEnd] !== 0) mimeEnd++

                    let mime = new TextDecoder().decode(u.slice(offset, mimeEnd)).trim().toLowerCase()
                    offset = mimeEnd + 1

                    if (!mime || mime === "" || mime === "image/jpg" || mime === "image/jpe" || mime === "image/jfif" || mime === "jpeg") mime = "image/jpeg"
                    if (mime === "jpg") mime = "image/jpeg"
                    if (mime === "png") mime = "image/png"

                    offset += 1

                    if (encoding === 0 || encoding === 3)
                    {
                        while (u[offset] !== 0) offset++
                        offset++
                    }
                    else if (encoding === 1 || encoding === 2)
                    {
                        while (!(u[offset] === 0 && u[offset + 1] === 0)) offset += 2
                        offset += 2
                    }

                    const imageData = u.slice(offset, pos + 10 + frameSize)
                    const blob = new Blob([imageData], { type: mime })

                    return URL.createObjectURL(blob)
                }
                pos += 10 + frameSize
            }

            return null
        }
        catch
        {
            return null
        }
    }
}

export default FileLink