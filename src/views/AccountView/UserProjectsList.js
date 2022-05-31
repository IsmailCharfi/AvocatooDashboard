// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import Avatar from '@components/avatar'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const projectsArr = [
{
  progress: 60,
  consultant: 'Mr x',
  progressColor: 'info',
  subtitle: 'Catégorie 1',
  title: 'Ticket 1'
},
{
  consultant: 'Mr y',
  progress: 15,
  progressColor: 'danger',
  subtitle: 'Catégorie 2',
  title: 'Ticket 2'
},
{
  progress: 90,
  consultant: 'Mr z',
  progressColor: 'success',
  subtitle: 'Catégorie 3',
  title: 'Ticket 3'
},
{
  consultant: 'Mr z',
  progress: 49,
  progressColor: 'warning',
  subtitle: 'Catégorie 1',
  title: 'Ticket 4'
}

]


const UserProjectsList = ({user}) => {

 const columns = [
  {
    minWidth: '300px',
    name: 'Tciket',
    selector: row => row.title,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
            <Avatar className='me-1' icon={<FontAwesomeIcon icon={faQuestion} />} color='light-primary' />
          </div>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.title}</span>
            <small className='text-muted'>{row.subtitle}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Satisfaction',
    selector: row => row.progress,
    sortable: true,
    cell: row => {
      return (
        <div className='d-flex flex-column w-100'>
          <small className='mb-1'>{`${row.progress}%`}</small>
          <Progress
            value={row.progress}
            style={{ height: '6px' }}
            className={`w-100 progress-bar-${row.progressColor}`}
          />
        </div>
      )
    }
  },
 {name: user.role === "ROLE_CLIENT" ? 'Consultant' : "Client", selector: row => row.consultant}
]


  return (
    <Card>
      <CardHeader tag='h4'>Tickets</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default UserProjectsList
