import { Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { User, Lock } from 'react-feather'

import SecurityTab from './SecurityTab'
import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab, user, setRefresh, sendRequest }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Infos</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Sécurité</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList user={user} setRefresh={setRefresh} sendRequest={sendRequest}/>
        </TabPane>
        <TabPane tabId='2'>
          <SecurityTab user={user} setRefresh={setRefresh} sendRequest={sendRequest}/>
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
