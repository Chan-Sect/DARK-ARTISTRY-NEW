import {useState, type FormEvent} from 'react'
import {Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, InputAdornment, Link as MuiLink, TextField, Typography} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Close from '@mui/icons-material/Close'
import {Link as RouterLink} from 'react-router-dom'
import BrandPanel from './BrandPanel.tsx'
import './login-page.css'
import './register.css'

type Policy = 'terms' | 'privacy' | null
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const Register = () =>
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [accepted, setAccepted] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [policy, setPolicy] = useState<Policy>(null)

    const emailValid = emailPattern.test(email.trim())
    const passwordsMatch = Boolean(password) && password === confirmPassword
    const isValid = emailValid && passwordsMatch && accepted
    const onSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true) }

    return <Box component='main' className='register-shell'>
        <BrandPanel/>
        <Box component='section' className='register-panel' aria-label='Tạo tài khoản'>
            <Box className='register-content'>
                <Box component='header' className='register-heading'>
                    <Typography component='span' className='form-kicker notranslate' translate='no'>DARK ARTISTRY</Typography>
                    <Typography component='h1'>Tạo tài khoản của bạn</Typography>
                    <Typography component='p'>Chỉ cần vài chi tiết nữa thôi là bạn đã sẵn sàng.</Typography>
                </Box>
                <Box component='form' className='register-form' onSubmit={onSubmit} noValidate>
                    <Box className='register-field'>
                        <Typography component='label' htmlFor='register-email'>Địa chỉ email</Typography>
                        <TextField id='register-email' className='register-text-field' type='email' autoComplete='email' placeholder='name@example.com' value={email} onChange={event => setEmail(event.target.value)} error={Boolean(email) && !emailValid} slotProps={{htmlInput: {'aria-describedby': email && !emailValid ? 'register-email-error' : undefined}}} fullWidth size='small'/>
                        {email && !emailValid && <Typography component='small' className='register-error' id='register-email-error'>Nhập địa chỉ email hợp lệ.</Typography>}
                    </Box>
                    <Box className='register-field'>
                        <Typography component='label' htmlFor='register-password'>Mật khẩu</Typography>
                        <TextField id='register-password' className='register-text-field' type={showPassword ? 'text' : 'password'} autoComplete='new-password' placeholder='Mật khẩu của bạn' value={password} onChange={event => setPassword(event.target.value)} error={submitted && !password} fullWidth size='small' slotProps={{input: {endAdornment: <InputAdornment position='end'><IconButton type='button' onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} size='small'>{showPassword ? <VisibilityOff fontSize='small'/> : <Visibility fontSize='small'/>}</IconButton></InputAdornment>}}}/>
                        {submitted && !password && <Typography component='small' className='register-error'>Vui lòng nhập mật khẩu.</Typography>}
                    </Box>
                    <Box className='register-field'>
                        <Typography component='label' htmlFor='register-confirm-password'>Xác nhận mật khẩu</Typography>
                        <TextField id='register-confirm-password' className='register-text-field' type={showConfirmPassword ? 'text' : 'password'} autoComplete='new-password' placeholder='Nhập lại mật khẩu' value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} error={Boolean(confirmPassword) && !passwordsMatch} fullWidth size='small' slotProps={{htmlInput: {'aria-describedby': confirmPassword && !passwordsMatch ? 'register-confirm-error' : undefined}, input: {endAdornment: <InputAdornment position='end'><IconButton type='button' onClick={() => setShowConfirmPassword(value => !value)} aria-label={showConfirmPassword ? 'Ẩn mật khẩu xác nhận' : 'Hiện mật khẩu xác nhận'} size='small'>{showConfirmPassword ? <VisibilityOff fontSize='small'/> : <Visibility fontSize='small'/>}</IconButton></InputAdornment>}}}/>
                        {confirmPassword && !passwordsMatch && <Typography component='small' className='register-error' id='register-confirm-error'>Mật khẩu xác nhận chưa trùng khớp.</Typography>}
                    </Box>
                    <FormControlLabel className='register-terms' control={<Checkbox id='register-accepted' checked={accepted} onChange={event => setAccepted(event.target.checked)} size='small'/>} label={<span>Tôi đồng ý với <Button className='policy-link' type='button' onClick={() => setPolicy('terms')}>điều khoản</Button> và <Button className='policy-link' type='button' onClick={() => setPolicy('privacy')}>chính sách bảo mật</Button></span>}/>
                    <Button className='register-submit' type='submit' disabled={!isValid} disableRipple>Tạo tài khoản</Button>
                    {submitted && isValid && <Typography component='p' className='register-backend-note' role='status'>Biểu mẫu hợp lệ. Tính năng tạo tài khoản chưa được kết nối với máy chủ.</Typography>}
                </Box>
                <Typography component='p' className='register-login'>Đã có tài khoản? <MuiLink component={RouterLink} to='/signin'>Đăng nhập</MuiLink></Typography>
            </Box>
        </Box>
        <Dialog open={Boolean(policy)} onClose={() => setPolicy(null)} aria-labelledby='policy-title' slotProps={{paper: {className: 'policy-dialog'}}}>
            <IconButton className='policy-close' type='button' onClick={() => setPolicy(null)} aria-label='Đóng'><Close fontSize='small'/></IconButton>
            <DialogTitle id='policy-title'>{policy === 'terms' ? 'Điều khoản sử dụng' : 'Chính sách bảo mật'}</DialogTitle>
            <DialogContent><Typography component='p'>Nội dung {policy === 'terms' ? 'điều khoản sử dụng' : 'chính sách bảo mật'} chưa được cung cấp trong ứng dụng này.</Typography></DialogContent>
        </Dialog>
    </Box>
}

export default Register
