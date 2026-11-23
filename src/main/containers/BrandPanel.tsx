import {Box} from '@mui/material'
import {Link} from 'react-router-dom'

const BrandPanel = () => <Box component='section' className='brand-panel' aria-label='DARK ARTISTRY' translate='no'>
    <Box className='brand-atmosphere' aria-hidden='true'>
        <span className='brand-glow'/>
        <span className='brand-ring brand-ring-one'/><span className='brand-ring brand-ring-two'/><span className='brand-ring brand-ring-three'/>
        <span className='brand-particle particle-one'/><span className='brand-particle particle-two'/><span className='brand-particle particle-three'/><span className='brand-particle particle-four'/><span className='brand-particle particle-five'/><span className='brand-particle particle-six'/>
        <span className='brand-shooting-star shooting-star-one'/><span className='brand-shooting-star shooting-star-two'/><span className='brand-shooting-star shooting-star-three'/><span className='brand-shooting-star shooting-star-four'/><span className='brand-shooting-star shooting-star-five'/><span className='brand-shooting-star shooting-star-six'/><span className='brand-shooting-star shooting-star-seven'/>
    </Box>
    <Link className='brand-centered notranslate' to='/signin' aria-label='DARK ARTISTRY, trang đăng nhập' translate='no'>
        <img src='/favicon.svg' alt=''/><span>DARK <b>ARTISTRY</b></span>
    </Link>
</Box>

export default BrandPanel
