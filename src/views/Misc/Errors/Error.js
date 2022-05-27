// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import config from '@configs/themeConfig'

// ** Styles
import '@styles/base/pages/page-misc.scss'
import { Brand } from '../../../assets/svg/brand'

const Error = () => {
  // ** Hooks
  const { skin } = useSkin()

  const illustration = skin === 'dark' ? 'error-dark.svg' : 'error.svg'
  let source = require(`@src/assets/images/pages/${illustration}`).default
  source = require("../../../assets/svg/not-found.svg").default
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
        <Brand />
        <h2 className='brand-text text-primary ms-1'>{config.app.appName}</h2>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Page non trouvée 🕵🏻‍♀️</h2>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
            Retour
          </Button>
          <div className='mt-1'>
            <img className='img-fluid' src={source} alt='Not authorized page' />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Error
