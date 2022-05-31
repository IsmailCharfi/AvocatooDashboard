import { Row, Col } from 'reactstrap'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { User, UserPlus, UserCheck, UserX, Users } from 'react-feather'
import Breadcrumbs from "@components/breadcrumbs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faScaleBalanced, faQuestion } from '@fortawesome/free-solid-svg-icons'
import {useHistory} from "react-router-dom"

import '@styles/react/apps/app-users.scss'
import Stats from './Stats'

const Home = () => {
  const history = useHistory()

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="Acceuil"
        breadCrumbParent="Home"
        breadCrumbActive="stats"
      />
    <div className='app-user-list'>
      <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Utilisateurs'
            icon={<Users size={20} />}
            onClick={() => history.push("/users")}
            renderStats={<h3 className='fw-bolder mb-75'>990</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='Consultants juridique'
            icon={<FontAwesomeIcon icon={faScaleBalanced} />}
            onClick={() => history.push("/users/lp")}
            renderStats={<h3 className='fw-bolder mb-75'>78</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Clients'
            icon={<User size={20} />}
            onClick={() => history.push("/users/client")}
            renderStats={<h3 className='fw-bolder mb-75'>919</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='Questions posées'
            icon={<FontAwesomeIcon icon={faQuestion} />}
            onClick={() => history.push("/questions")}
            renderStats={<h3 className='fw-bolder mb-75'>237</h3>}
          />
        </Col>
        <Stats />
      </Row>
    </div>
  </>
  )
}

export default Home
