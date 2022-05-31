import { useState, useEffect } from 'react'
import { columns } from './columns'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import {Row, Col, Card, Input, CardHeader, CardTitle, Button, Modal, ModalHeader, ModalBody, Label} from "reactstrap"
import Breadcrumbs from "@components/breadcrumbs"
import LoadingSpinner from "@components/spinner/Loading-spinner"
import CustomPagination from "@components/custom-pagination"
import { useHttp } from "@hooks/useHttp"
import { confirm } from '../../utility/Utils'
import TryAgain from "@components/try-again"
import env from "react-dotenv"
import { useHistory } from 'react-router-dom'
const API_PATH = env.API_URL

import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import { Slide, toast } from 'react-toastify'


const ClientsList = () => {
  const [users, setUsers] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [take, setTake] = useState(10)
  const [refresh, setRefresh] = useState(false)
  const [firstTime, setFirstTime] = useState(true)
  const [isLoading, error, sendRequest] = useHttp()
  const history = useHistory()

  const CustomHeader = ({ setSearch, search, setTake, take }) => {
    const [modal, setModal] = useState(false)
    const [, , sendRequest] = useHttp()
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
  
        const user = {
          email,
          password,
          firstName,
          lastName,
          dateOfBirth: new Date().toDateString(),
          phoneNumber: '123456789'
        }
        await sendRequest(`${API_PATH}/auth/register/client`, "POST", JSON.stringify(user))
        setModal(false)
        toast.success(<>Success</>, {transition: Slide, hideProgressBar: true, autoClose: 1500 })
        setRefresh(prev => !prev)
      }
  
    return (
      <div className='invoice-list-table-header w-100 py-2'>
        <Row>
          <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
            <div className='d-flex align-items-center me-2'>
              <label htmlFor='rows-per-page'>Afficher</label>
              <Input
                type='select'
                id='rows-per-page'
                value={take}
                onChange={e => setTake(e.target.value)}
                className='form-control ms-50 pe-3'
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='20'>20</option>
              </Input>
            </div>
          </Col>
          <Col
            lg='6'
            className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
          >
            <div className='d-flex align-items-center'>
              <label htmlFor='search-invoice'>Recherche</label>
              <Input
                id='search-invoice'
                className='ms-50 me-2 w-100'
                type='text'
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder='Recherche'
              />
            </div>
            <Button color='primary' onClick={() => setModal(true)}>Ajouter</Button>
          </Col>
        </Row>
        {
          modal && (
            <Modal
          isOpen={modal}
          onClosed={() => setModal(false)}
          toggle={() => setModal(false)}
          className='modal-dialog-centered modal-lg'
        >
          <ModalHeader className='bg-transparent' toggle={() => setModal(false)}></ModalHeader>
          <ModalBody className='px-5 pb-5'>
            <div className='text-center mb-4'>
              <h1>Ajout</h1>
            </div>
            <Row tag='form' onSubmit={handleSubmit}>
              <Col xs={6}>
                <Label className='form-label' for='roleName'>
                  Email
                </Label>
                <Input name="email" id='email' placeholder='email' type='email' />
              </Col>
              <Col xs={6}>
                <Label className='form-label' for='roleName'>
                  mot de passe
                </Label>
                <Input name="password" id='passwrd' placeholder='mot de passe' type="password" />
              </Col>
              <Col xs={6}>
                <Label className='form-label' for='roleName'>
                  Nom
                </Label>
                <Input name="lastName" id='name' placeholder='nom' />
              </Col>
              <Col xs={6}>
                <Label className='form-label' for='roleName'>
                  Prenom
                </Label>
                <Input name="firstName" id='lastname' placeholder='prenom' />
              </Col>
              <Col className='text-center mt-2' xs={12}>
                <Button type='submit' color='primary' className='me-1'>
                  Confirmer
                </Button>
                <Button type='reset' outline onClick={() => setModal(false)}>
                  Annuler
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
          )
        }
      </div>
    )
  }

  useEffect(() => {

    async function getUsers() {
        const response = await sendRequest(`${API_PATH}/users/client/?page=${page}&take=${take}&search=${search}`)
        setUsers(response.data.pageData)
        setDataCount(response.data.meta.itemCount)
        setFirstTime(false)
    }

    const getDataTimer = setTimeout(getUsers, 400)
    return () => clearTimeout(getDataTimer)
  }, [page, take, search, refresh])


  const activateUser = async (row) => {
    confirm('activer ce compte', 'warning', async () => {
      const response  = await sendRequest(`${API_PATH}/users/activate/${row.id}`, "POST")
      if (response.statusCode > 300) throw new Error()
      setTimeout(() => setRefresh(prev => !prev), 500)
    })
  }

  const deactivateUser = async (row) => {
    confirm("desactiver ce compte", "warning", async () => {
      const response  = await sendRequest(`${API_PATH}/users/deactivate/${row.id}`, "POST")
      if (response.statusCode > 300) throw new Error()
      setTimeout(() => setRefresh(prev => !prev), 500)
    })
  }

  const deleteUser = async (row) => {
    confirm("supprimer ce compte", "warning", async () => {
      const response  = await sendRequest(`${API_PATH}/users/${row.id}`, "DELETE")
      if (response.statusCode > 300) throw new Error()
      setTimeout(() => setRefresh(prev => !prev), 500)
    })
  }

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="Clients"
        breadCrumbParent="Gestion des utilisateurs"
        breadCrumbActive="Clients"
      />
      {  error ? (<TryAgain cb={() => setRefresh(prev => !prev)} />) : (
      <Card >
            <div className='invoice-list-wrapper'>
              <div className='invoice-list-dataTable react-dataTable'>
                <DataTable
                  noHeader
                  highlightOnHover
                  pagination
                  paginationServer
                  subHeader={true}
                  columns={ columns(activateUser, deactivateUser, deleteUser, (e) => { history.push(`/user/${e.id}`) }) }
                  responsive={true}
                  data={users}
                  sortIcon={<ChevronDown size={10} />}
                  className='react-dataTable'
                  paginationDefaultPage={page}
                  paginationComponent={() => {
                    return (
                      <CustomPagination
                        page={page}
                        limit={take}
                        dataCount={dataCount}
                        handlePagination={page => setPage(page.selected + 1)}
                      />
                    )
                  }}
                  noDataComponent={!firstTime ? <p>Pas d'utilisateurs</p> : <></>}
                  subHeaderComponent={
                    <CustomHeader
                      search={search}
                      setSearch={setSearch}
                      take={take}
                      setTake={setTake}
                    />
                }
                progressPending={isLoading}
                progressComponent={<LoadingSpinner />}
                />
              </div>
            </div>
      </Card>
                  )}
    </>

    
  )
}

export default ClientsList