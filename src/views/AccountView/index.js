// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Alert } from 'reactstrap'
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'
import {useHttp} from "@hooks/useHttp"

import '@styles/react/apps/app-users.scss'
import env from 'react-dotenv'
import SpinnerComponent from '../../@core/components/spinner/Fallback-spinner'

const UserView = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [isLoading, error, sendRequest] = useHttp()

  // ** Get suer on mount
  useEffect(() => {
    (async function getUser() {
      try {
        const resposne = await sendRequest(`${env.API_URL}/users/${id}`)
        setUser(resposne.data)
      } catch (err) {
        console.log(err, error, isLoading)
      }

    })()
  }, [refresh])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  if (isLoading) return <SpinnerComponent />

  return user !== null && user !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={user} setRefresh={setRefresh} sendRequest={sendRequest}/>
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} user={user} setRefresh={setRefresh} sendRequest={sendRequest} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <Row  className='d-flex justify-content-center'>
          <Col xs={12} >
      <h4 className='alert-heading text-align-center'>utilisateur n'existe pas</h4>
          </Col>
          <Col xs={12}>
      <div className='alert-body'>
        l'utilisateur d'id: {id} n'existe pas . Pour consulter tous les utilisateurs : <Link to='/users/'>Liste</Link>
      </div>
          </Col>
      </Row>
    </Alert>
  )
}
export default UserView
