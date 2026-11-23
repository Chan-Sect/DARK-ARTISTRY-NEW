import {useState, type FormEvent} from 'react'
import {Alert, Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, IconButton, InputAdornment, InputBase, Link as MuiLink, Typography} from '@mui/material'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import LockOutlined from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom'
import API from '../../config/connections/main/API.ts'
import BrandPanel from './BrandPanel.tsx'
import './login-page.css'

type FormErrors = { username?: string, password?: string }

const LoginPage = () =>
{
    const [username, setUsername] = useState(() => localStorage.getItem('dark-artistry-login') || '')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(Boolean(localStorage.getItem('dark-artistry-login')))
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const submit = async (event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault()
        const nextErrors: FormErrors = {}
        if (!username.trim()) nextErrors.username = 'Vui lòng nhập tên đăng nhập hoặc email.'
        if (!password) nextErrors.password = 'Vui lòng nhập mật khẩu.'
        setErrors(nextErrors)
        setMessage('')
        if (Object.keys(nextErrors).length) return

        setLoading(true)
        try
        {
            const result = await API.POST<{ token?: string }>('sign/admin', {name: username.trim(), mail: username.trim(), password, remember})
            if (result.error) setMessage(result.message || 'Không thể đăng nhập. Vui lòng thử lại.')
            else if (result.token)
            {
                if (remember) localStorage.setItem('dark-artistry-login', username.trim())
                else localStorage.removeItem('dark-artistry-login')
                navigate('/', {replace: true})
            }
            else setMessage('Máy chủ chưa xác nhận phiên đăng nhập. Vui lòng kiểm tra cấu hình API.')
        }
        catch { setMessage('Không thể kết nối máy chủ. Vui lòng thử lại sau.') }
        finally { setLoading(false) }
    }

    const isUnavailableRoute = location.pathname === '/signup' || location.pathname === '/forgot-password'
    const unavailableMessage = location.pathname === '/signup'
        ? 'Đăng ký tài khoản chưa được cấu hình trên máy chủ.'
        : 'Khôi phục mật khẩu chưa được cấu hình trên máy chủ.'

    return <Box component='main' className='login-shell'>
        <BrandPanel/>
        <Box component='section' className='form-panel' aria-label='Đăng nhập'>
            <Box className='login-form-wrap'>
                <Box className='form-heading'>
                    <Typography component='span' className='form-kicker notranslate' translate='no'>DARK ARTISTRY</Typography>
                    <Typography component='h2'>{isUnavailableRoute ? 'Welcome to DARK ARTISTRY.' : 'Chào mừng bạn trở lại'}</Typography>
                    <Typography component='p'>{isUnavailableRoute ? 'Some account features need to be connected to the server.' : 'Đăng nhập để tiếp tục hành trình sáng tạo của bạn.'}</Typography>
                </Box>
                {isUnavailableRoute ? <Box className='route-notice' role='status'>
                    <span className='notice-icon'>i</span><Box><Typography component='b'>Tính năng chưa khả dụng</Typography><Typography component='p'>{unavailableMessage}</Typography></Box><MuiLink component={RouterLink} to='/signin'>Quay lại đăng nhập</MuiLink>
                </Box> : <>
                    <Box component='form' className='login-form' onSubmit={submit} noValidate>
                        <Typography component='label' className='field-label' htmlFor='login-username'>Tên đăng nhập hoặc Email</Typography>
                        <Box className={`input-wrap ${errors.username ? 'has-error' : ''}`}>
                            <InputAdornment position='start' className='field-icon'><EmailOutlined fontSize='small'/></InputAdornment>
                            <InputBase id='login-username' fullWidth autoComplete='username' value={username} onChange={event => setUsername(event.target.value)} placeholder='Nhập tên đăng nhập hoặc email' inputProps={{'aria-invalid': Boolean(errors.username), 'aria-describedby': errors.username ? 'username-error' : undefined}}/>
                        </Box>
                        {errors.username && <Typography component='span' className='field-error' id='username-error'>{errors.username}</Typography>}
                        <Typography component='label' className='field-label password-label' htmlFor='login-password'>Mật khẩu</Typography>
                        <Box className={`input-wrap ${errors.password ? 'has-error' : ''}`}>
                            <InputAdornment position='start' className='field-icon lock-icon'><LockOutlined fontSize='small'/></InputAdornment>
                            <InputBase id='login-password' type={showPassword ? 'text' : 'password'} fullWidth autoComplete='current-password' value={password} onChange={event => setPassword(event.target.value)} placeholder='Nhập mật khẩu' inputProps={{'aria-invalid': Boolean(errors.password), 'aria-describedby': errors.password ? 'password-error' : undefined}}/>
                            <IconButton className='password-toggle' type='button' onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} size='small'>{showPassword ? <VisibilityOff fontSize='small'/> : <Visibility fontSize='small'/>}</IconButton>
                        </Box>
                        {errors.password && <Typography component='span' className='field-error' id='password-error'>{errors.password}</Typography>}
                        <Box className='form-options'>
                            <FormControlLabel className='remember-option' control={<Checkbox checked={remember} onChange={event => setRemember(event.target.checked)} size='small'/>} label='Ghi nhớ đăng nhập'/>
                            <MuiLink component={RouterLink} to='/forgot-password'>Quên mật khẩu?</MuiLink>
                        </Box>
                        {message && <Alert className='form-message' severity='error'>{message}</Alert>}
                        <Button className='submit-button' type='submit' disabled={loading} disableRipple>{loading && <CircularProgress className='spinner' size={14}/ >}{loading ? 'Đang đăng nhập…' : 'Đăng nhập'}<span aria-hidden='true'>→</span></Button>
                    </Box>
                    <Divider className='divider'><Typography component='b'>HOẶC</Typography></Divider>
                    <Button className='google-button' type='button' onClick={() => setMessage('Đăng nhập Google chưa được bật vì dự án chưa có OAuth callback được cấu hình.')} disableRipple>
                        <svg viewBox='0 0 48 48' aria-hidden='true'><path fill='#FFC107' d='M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z'/><path fill='#FF3D00' d='M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4 2-6.9 2-5.3 0-9.8-3.6-11.4-8.5H5.8v5.3A20 20 0 0 0 24 44Z'/><path fill='#4CAF50' d='M12.6 27.5a12 12 0 0 1 0-7v-5.3H5.8a20 20 0 0 0 0 17.6l6.8-5.3Z'/><path fill='#1976D2' d='M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.3C14.2 15.6 18.7 12 24 12Z'/></svg>Tiếp tục với Google
                    </Button>
                    <Typography component='p' className='signup-prompt'>Chưa có tài khoản? <MuiLink component={RouterLink} to='/signup'>Đăng ký</MuiLink></Typography>
                </>}
                <Box className='form-footer'><span>© 2026 DARK ARTISTRY</span><span>CREATIVITY, WITH PURPOSE.</span></Box>
            </Box>
        </Box>
    </Box>
}

export default LoginPage
