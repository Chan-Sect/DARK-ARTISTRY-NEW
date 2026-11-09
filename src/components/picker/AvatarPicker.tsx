import {
    alpha, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack, styled,
    type Theme, Tooltip, useTheme
} from "@mui/material";
import {Close, Flip, Person, Rotate90DegreesCcw, Rotate90DegreesCw} from "@mui/icons-material"
import MuiCard from "@mui/material/Card";
import MuiCardActionArea from "@mui/material/CardActionArea"
import MuiAvatar from "@mui/material/Avatar"
import {type ChangeEvent, Fragment, type ReactNode, useEffect, useRef, useState} from "react";
import Cropper, {type ReactCropperElement} from "react-cropper";
import "cropperjs/dist/cropper.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useAlert} from "../../main/providers/main";
import URI from "../../config/connections/URI";
import {VisuallyHiddenInput} from "../../config/style/Input.tsx";

const style = (theme: Theme) =>
({
    maxWidth: 500,
    maxHeight: 500,
    width: '100%',
    height: 'auto',
    aspectRatio: '1/1',
    boxShadow: `${ alpha('#000', theme.palette.mode === 'dark' ? 1 : 0.5) } 0px 3px 6px -1.2px, ${ alpha('#FFF', 0.6) } 0px 1.8px 3.6px -1.8px`,
    '& *':
    {
        userSelect: 'none !important',
    }
})

const Circular = styled(MuiCard)(({ theme }) =>
({
    borderRadius: '50%',
    ...style(theme),
}))
const Rounded = styled(MuiCard)(({ theme }) =>
({
    borderRadius: theme.spacing(2),
    ...style(theme),
}))
const Square = styled(MuiCard)(({ theme }) =>
({
    borderRadius: 0,
    ...style(theme),
}))

const CardActionArea = styled(MuiCardActionArea)(({ theme }) =>
({
    width: '100%',
    height: '100%',
    padding: 0,
    color: theme.palette.action.active,
}))

const Avatar = styled(MuiAvatar)(() =>
({
    width: '100%',
    height: '100%',
    '& svg':
    {
        width: '70%',
        height: '70%'
    }
}))

interface CardProps
{
    variant: 'circular' | 'rounded' | 'square'
    children?: ReactNode
}
interface AvatarPickerProps extends CardProps
{
    value?: string | File
    onChange?: (value: AccuracyType) => void
    disabled?: boolean
    editor?: boolean
}

interface AccuracyType
{
    link?: string
    detail?: Cropper.Data
    file?: File
}


const Card = ({ variant, children }: CardProps) =>
{
    switch (variant)
    {
        case 'circular': return <Circular>{ children }</Circular>
        case 'rounded': return <Rounded>{ children }</Rounded>
        case 'square': return <Square>{ children }</Square>
    }
}

const AvatarPicker = ({ value, onChange, disabled, variant = 'circular', children, editor }: AvatarPickerProps) =>
{
    const cropperRef = useRef<ReactCropperElement>(null)
    const oldCropperRef = useRef<ReactCropperElement>(null)


    const [oldSize, setOldSize] = useState({ width: 0, height: 0 })

    const theme = useTheme()
    const { showError } = useAlert()

    const [timer, setTimer] = useState<number>(Date.now)

    const [file, setFile] = useState<File | undefined>(undefined)
    const [open, setOpen] = useState(false)
    const [link, setLink] = useState<string | undefined>(undefined)
    const [detail, setDetail] = useState<Cropper.Data | undefined>(undefined)
    const [accuracy, setAccuracy] = useState<AccuracyType | undefined>(undefined)

    const xs = useMediaQuery(theme.breakpoints.down('sm'))

    const onOpen = () => setOpen(true)

    const onImageSelected = async (event: ChangeEvent<HTMLInputElement>) =>
    {
        event.currentTarget.blur()

        const newFile = event.target.files === null ? null : event.target.files[0]
        // event.target.value = null

        const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg']

        if (newFile)
        {
            if (!acceptedTypes.includes(newFile.type)) showError('Chỉ chấp nhận các định dạng file .png, .jpg, .jpeg')
            else
            {
                const newLink = URL.createObjectURL(newFile)

                setFile(newFile)
                setLink(acc =>
                {
                    if (acc && acc !== accuracy?.link) URL.revokeObjectURL(acc)
                    return newLink
                })

                if (editor) onOpen()
                else if (onChange) onChange({ file: newFile, link: newLink })
                // else setLink(acc =>
                //     {
                //         if (acc && acc !== accuracy?.link) URL.revokeObjectURL(acc)
                //         return newLink
                //     })
            }
        }
    }

    const onCrop = (event: Cropper.CropEvent<HTMLImageElement>) => setDetail(event.detail)
    const onCancel = () =>
    {
        if (!accuracy)
        {
            setLink(old =>
            {
                if (old) URL.revokeObjectURL(old)
                return undefined
            })
            setDetail(undefined)
            setFile(undefined)
        }
        else
        {
            setLink(acc =>
            {
                if (acc && acc !== accuracy.link) URL.revokeObjectURL(acc)
                return accuracy.link
            })
            setDetail(accuracy.detail)
        }

        setOpen(false)

    }
    const onConfirm = () =>
    {
        setAccuracy(old =>
        {
            if (old?.link && old?.link !== link) URL.revokeObjectURL(old.link)
            return { link, detail }
        })

        if (onChange) onChange({ file, detail, link })

        setOpen(false)
    }
    const rotate = (angle: number) =>
    {
        const cropper = cropperRef.current?.cropper

        if (cropper && detail)
        {
            const scaleX = detail.scaleX
            const scaleY = detail.scaleY
            const rotate = detail.rotate

            cropper.reset()
            cropper.setData({ scaleX, scaleY, rotate: rotate + 90 * angle })
        }
    }
    const flip = (horizontal = true) =>
    {
        const cropper = cropperRef.current?.cropper

        if (cropper && detail)
        {
            const check = detail.rotate % 180 === 0
            if (check) cropper[`scale${ horizontal ? 'X' : 'Y' }`](detail[`scale${ horizontal ? 'X' : 'Y' }`] * -1)
            else cropper[`scale${ horizontal ? 'Y' : 'X' }`](detail[`scale${ horizontal ? 'Y' : 'X' }`] * -1)

        }
    }
    const readyOld = () => setTimer(Date.now())
    const ready = () =>
    {
        const cropper = cropperRef.current?.cropper

        if (cropper && accuracy)
        {
            if (accuracy && accuracy.link === link && accuracy.detail) cropper.setData(accuracy.detail)
            const containerData = cropper.getContainerData()
            setOldSize({ width: containerData.width, height: containerData.height })
        }
    }

    useEffect(() =>
    {
        const isFile = value instanceof File

        if (!isFile)
        {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (!String(value).startsWith('blob')) setLink(old =>
            {
                if (old) URL.revokeObjectURL(old)
                return undefined
            })

            setDetail(undefined)
            setAccuracy(undefined)
        }
    }, [value])
    useEffect(() =>
    {
        const cropper = oldCropperRef.current?.cropper
        if (cropper && accuracy && accuracy.detail) cropper.setData(accuracy.detail)
    }, [accuracy, timer])
    useEffect(() =>
    {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTimer(Date.now())
    }, [open])
    useEffect(() =>
    {
        if (!accuracy) return

        const handleResize = () =>
        {
            const cropper = oldCropperRef.current?.cropper
            if (!cropper) return

            const cropBoxData = cropper.getCropBoxData()
            const canvasData = cropper.getCanvasData()

            cropper.setCanvasData(canvasData)
            cropper.setCropBoxData(cropBoxData)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [accuracy])

    const renderSelector = () => <MuiCardActionArea disabled={ disabled } component="label" sx={{  width: '100%', height: '100%', padding: 0, color: theme.palette.action.active }}>
        <VisuallyHiddenInput type='file' onChange={ onImageSelected } accept=".png, .jpg, .jpeg" />
        <Avatar variant='square' src={ typeof value === 'string' ? value.startsWith('blob') ? value : `${ URI.server }/${ value }` : undefined }>
            { children || <Person/> }
        </Avatar>
    </MuiCardActionArea>
    const renderEditor = () => <CardActionArea disabled={ disabled } onClick={ onOpen }>
        <div className='avatar-preview' style={{ width: '100%', height: '100%' }}/>
    </CardActionArea>
    const renderPreview = () => accuracy?.link ? renderEditor() : renderSelector()

    return <Fragment>
        <Box sx={{ width: 0, height: 0, overflow: 'hidden', position: 'absolute', zIndex: -99999 }}>
            <Cropper src={ accuracy?.link } ref={ oldCropperRef }
                     preview=".avatar-preview"
                     ready={ readyOld }
                     style={{ width: oldSize.width, height: oldSize.height, background: 'transparent' }}
                     aspectRatio={ 1 } autoCropArea={ 1 }
                     zoomable={ false } dragMode={ undefined } movable={ false }
            />
        </Box>
        <Tooltip title={ disabled ? '' : accuracy?.link ? 'Chỉnh sửa' : 'Chọn ảnh' } arrow disableInteractive>
            <Card variant={ variant }>
                { renderPreview() }
            </Card>
        </Tooltip>
        <Dialog open={ open } fullScreen  closeAfterTransition={ false }>
            <IconButton onClick={ onCancel } sx={{ position: 'absolute', top: theme.spacing(0.5), right: theme.spacing(0.5) }}><Close/></IconButton>
            <DialogTitle>Chỉnh sửa ảnh</DialogTitle>
            <DialogContent sx={{ display: 'flex', overflow: 'auto', justifyContent: 'center' }}>
                <Box sx={{ aspectRatio: '1/1', height: 'auto', maxHeight: '100%', maxWidth: '100%', display: 'flex' }}>
                    <Cropper src={ link } crop={ onCrop } ref={ cropperRef }
                             viewMode={ 1 }
                             ready={ ready }
                             preview=".editor-preview"
                             rotatable scalable
                             style={{ height: '100%', maxHeight: '100%', width: '100%', maxWidth: '100%', background: 'transparent' }}
                             aspectRatio={ 1 } autoCropArea={ 1 }
                             minCropBoxHeight={ 50 } minCropBoxWidth={ 50 } background={ false }
                             zoomable={ false } dragMode={ undefined } movable={ false }/>
                </Box>
            </DialogContent>
            <DialogActions sx={{ padding: theme.spacing(0, 2, 1 )}}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0 , sm: 2 }} sx={{ width: '100%', alignItems: 'center' }}>
                    <Box sx={{ width: 150 }}>
                        <Tooltip title='Chọn ảnh khác' arrow disableInteractive>
                            <Card variant={ variant }>
                                <MuiCardActionArea component="label"  sx={{  width: '100%', height: '100%', padding: 0, color: theme.palette.action.active }}>
                                    <VisuallyHiddenInput type='file' onChange={ onImageSelected } accept=".png, .jpg, .jpeg" />
                                    <div className='editor-preview' style={{ width: '100%', height: '100%' }}/>
                                </MuiCardActionArea>
                            </Card>
                        </Tooltip>
                    </Box>
                    <Stack spacing={ 1 } sx={{ flexGrow: 1, width: '100%' }}>
                        <Grid columns={{ sm: 2, md: 4 }} spacing={ 1 } container sx={{ display: xs ? 'none' : 'default' }}>
                            <Grid size={ 1 }>
                                <Button startIcon={ <Rotate90DegreesCw/> } variant='outlined' fullWidth onClick={ () => rotate(1) }>Xoay phải 90°</Button>
                            </Grid>
                            <Grid size={ 1 }>
                                <Button startIcon={ <Rotate90DegreesCcw/> } variant='outlined' fullWidth onClick={ () => rotate(-1) }>Xoay trái 90°</Button>
                            </Grid>
                            <Grid size={ 1 }>
                                <Button startIcon={ <Flip/> } variant='outlined' fullWidth onClick={ () => flip(true) }>Lật ngang</Button>
                            </Grid>
                            <Grid size={ 1 }>
                                <Button startIcon={ <Flip sx={{ transform: 'rotate(90deg)'}}/> } variant='outlined' fullWidth onClick={ () => flip(false) }>Lật dọc</Button>
                            </Grid>
                        </Grid>
                        <Stack direction='row' spacing={ 1 } sx={{ display: xs ? 'default' : 'none', justifyContent: 'center', alignItems: 'center' }}>
                            <Tooltip title='Xoay phải 90°'>
                                <IconButton onClick={ () => rotate(1) }>
                                    <Rotate90DegreesCw/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Xoay trái 90°'>
                                <IconButton onClick={ () => rotate(-1) }>
                                    <Rotate90DegreesCcw/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Lật ngang'>
                                <IconButton onClick={ () => flip(true) }>
                                    <Flip/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Lật dọc'>
                                <IconButton onClick={ () => flip(false) }>
                                    <Flip sx={{ transform: 'rotate(90deg)'}}/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Button variant='contained' fullWidth onClick={ onConfirm } tabIndex={ -1 }>Xác nhận</Button>
                    </Stack>
                </Stack>
            </DialogActions>
        </Dialog>
    </Fragment>
}

export default AvatarPicker
