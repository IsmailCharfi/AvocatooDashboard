import Avatar from '@components/avatar'
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { Eye, Trash, MoreVertical, Unlock, Lock } from 'react-feather'  
import env from 'react-dotenv'
import { Link } from 'react-router-dom'


const renderUser = row => {
  const stateNum = Math.floor(Math.random() * 5),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary'],
    color = states[stateNum]

  if (row.lpData) {
    const imagesrc = `${env.API_URL}/${row.lpData.image}`
    return <Avatar className='me-50' img={imagesrc} width='32' height='32' status={row.isOnline ? 'online' : 'busy'}/>
  } else {
    return <Avatar color={color} className='me-50' content={`${row.firstName} ${row.lastName}`} initials status={row.isOnline ? 'online' : 'busy'}/>
  }
}

export const columns = (activateUser, deactivateUser, deleteUser, getRow) => [
  {
    name: 'Utilisateur',
    minWidth: '350px',
    selector: row => row.firstName,
    cell: row => {
      const fullName = `${row.firstName} ${row.lastName}`
      
/*       return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderUser(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{fullName}</h6>
            <small className='text-truncate text-muted mb-0'>{row.email}</small>
          </div>
        </div>
      ) */
      return (
        <div className='d-flex justify-content-left align-items-center'>
        {renderUser(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/user/${row.id}`}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{fullName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
      )
    }
  },
  {
    name: 'Numéro de téléphone',
    minWidth: '100px',
    center: true,
    selector: row => row.phoneNumber,
    cell: row => row.phoneNumber
  },
  {
    name: 'A rejoint le',
    minWidth: '100px',
    center: true,
    cell: row => new Date(row.createdAt).toLocaleDateString()
  },
  {
    name: 'Compte',
    minWidth: '100px',
    center: true,
    selector: row => row.isActive,
    cell: row => {
      return row.isActivated  ? (
        <Badge color='light-success' pill>
          Compte activé
        </Badge>
      ) : (
        <Badge color='light-danger' pill>
          Compte désactivé
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    minWidth: '30px',
    center: true,
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu end>
          <DropdownItem tag='div'  className='w-100' onClick={row.isActivated  ? () => deactivateUser(row) : () => activateUser(row)} >
           { row.isActivated ? (
              <><Lock size={14} className='me-50' /><span className='align-middle'>Désactiver</span></>
            ) : (
              <><Unlock size={14} className='me-50' /><span className='align-middle'>Activer</span></>
            )}
            </DropdownItem>
            <DropdownItem tag={'div'} className='w-100' onClick={() => getRow(row)}>
              <Eye size={14} className='me-50' />
              <span className='align-middle'>Voir plus</span>
            </DropdownItem>
            <DropdownItem tag='div'className='w-100' onClick={() => deleteUser(row)}>
              <Trash size={14} className='me-50' />
              <span className='align-middle'>Supprimer</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
