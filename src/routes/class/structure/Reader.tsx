import HeaderEditor from "../../../components/structure/HeaderEditor"
import {useNavigate, useParams} from "react-router-dom"
import {Card, Stack, styled, TextField, useTheme} from "@mui/material";
import {MailLock, Phone} from "@mui/icons-material";
import {type ChangeEvent, Fragment, useEffect, useState} from "react";
import {useAlert, useController} from "../../../main/providers/main";
import SaveButton from "../../../components/controller/SaveButton.tsx";
import API from "../../../config/connections/main/API.ts";
import RestoreButton from "../../../components/controller/RestoreButton.tsx";
import {isEqual} from "../../../config/text/sort.ts";
import Path from "../../../config/directions/Path.ts";
import type {AccuracyType} from "../../../components/picker/AvatarPicker.tsx";

interface ClassData
{
    name: string
    mail: string
    phone: string
    image: string | null
}

const defaultData: ClassData =
{
    name: '',
    mail: '',
    phone: '',
    image: null
}

const Container = styled(Stack)(({ theme }) =>
({
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
}))

interface EditorProps
{
    edit?: boolean,
}


const Reader = ({ edit }: EditorProps) =>
{
    const { id } = useParams()
    const theme = useTheme()
    const { showError, showSuccess } = useAlert()
    const navigate = useNavigate()

    const [defaultValue, setDefaultValue] = useState<ClassData>(defaultData)
    const [value, setValue] = useState<ClassData>(defaultValue)
    const [image, setImage] = useState<AccuracyType | undefined>()

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(old => ({ ...old, [event.target.name] : event.target.value }))
    const onChangeImage = (value: AccuracyType) => setImage(value)
    const onRestore = () => setValue(defaultValue)

    const onCreate = async () =>
    {
        const result = await API.POST<ClassData>('classes', { ...value, file: image?.file })

        if (result.error) showError(result.message)
        else
        {
            showSuccess(`Thêm người dùng <${ result.name }> thành công`)
            navigate(Path.AccountStudent.url)
        }
    }

    const onEdit = async () =>
    {
        const result = await API.PATCH<ClassData>(`classes/${ id }`, { ...value, file: image?.file })

        if (result.error) showError(result.message)
        else
        {
            navigate(Path.AccountStudent.url)
            showSuccess(`Chỉnh sửa lớp <${ id }> thành công`)
        }
    }

    const isNotChange = isEqual(value, defaultValue) && !image?.file
    const nameDoesNotMatchRequireLength = value.name.length < 8 || value.name.length > 100

    const isInvalid = isNotChange || nameDoesNotMatchRequireLength

    useController(() =>
    {
        return edit ?
        <Fragment>
            <SaveButton onSave={ onEdit } disabled={ isInvalid }/>
            <RestoreButton onRestore={ onRestore } disabled={ isEqual(value, defaultValue) }/>
        </Fragment> :
        <Fragment>
            <SaveButton onSave={ onCreate } disabled={ isInvalid }/>
        </Fragment>
    }, [edit, value, image])

    useEffect(() =>
    {
        if (edit) API.GET<ClassData>(`classes/${ id }`).then(result => setValue(() =>
        {
            setDefaultValue(result)
            return result
        }))
    }, [edit, id])

    const color = edit ? "warning" : "success"
    return <HeaderEditor id={ id } color={ color } name={ value.name ?? '' } image={ value.image ?? undefined } onChangeName={ onChange } onChangePicture={ onChangeImage }>
        <Stack sx={{ padding: theme.spacing(0, 2, 1) }} spacing={ 1 }>
            <Stack spacing={ 1 } direction={{ xs: 'column' , sm: 'column', md: 'row' }}>
                <Card sx={{ flexGrow: 1 }}>
                    <Container direction='row' spacing={ 2 }>
                        <TextField value={ value.mail ?? '' } name='mail' onChange={ onChange } fullWidth label='Địa chỉ mail' slotProps={{ htmlInput: { style: { textAlign: 'right' } }, input: { startAdornment: <MailLock sx={{ margin: theme.spacing(0, 1, 0, 0) }} />, endAdornment: <b>@gmail.com</b> }}} />
                    </Container>
                </Card>
                <Card sx={{ flexGrow: 1 }}>
                    <Container direction='row' spacing={ 2 }>
                        <TextField value={ value.phone ?? '' } name='phone' onChange={ onChange } fullWidth label='Số điện thoại' slotProps={{ input: { startAdornment: <Phone sx={{ margin: theme.spacing(0, 1, 0, 0) }} /> }}} />
                    </Container>
                </Card>
            </Stack>
        </Stack>
    </HeaderEditor>
}

export default Reader
