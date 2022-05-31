// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { handleLogout } from '@store/authentication'
import { useDispatch } from 'react-redux'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import { User, Settings, Power, Bell } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import SpinnerComponent from '../../../components/spinner/Fallback-spinner'
import { Slide, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsClapping } from '@fortawesome/free-solid-svg-icons'

const UserDropdown = () => {
  // ** State
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()

  // ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  
  if (!userData) {
    return <SpinnerComponent />
  }

  const userName = `${userData["firstName"]} ${userData["lastName"]}`

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold h5' style={{marginTop: "0.5rem"}}>{userName}</span>
        </div>
        <Avatar color='light-success'  content={userName} initials status={'online'}/>
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/profile' >
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/settings" >
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem 
          tag={Link} 
          to='/login' 
          onClick={ () => { 
            dispatch(handleLogout({id: userData.id}))
            toast.success(      
            <>
              <div className='toastify-header'>
                <div className='title-wrapper'>
                  <Avatar size='sm' color='success' icon={<FontAwesomeIcon icon={faHandsClapping} />} />
                  <h6 className='toast-title fw-bold'>Au revoir</h6>
                </div>
              </div>
            </>,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 1500 }
            ) 
          } }
        >
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
