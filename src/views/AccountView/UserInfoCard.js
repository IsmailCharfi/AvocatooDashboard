import { useState, Fragment } from 'react'
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import Avatar from '@components/avatar'
import '@styles/react/libs/react-select/_react-select.scss'
import env from 'react-dotenv'
import { confirm } from '../../utility/Utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDollarToSlot, faTicket } from '@fortawesome/free-solid-svg-icons'

/*eslint quote-props: ["error", "as-needed"]*/
/*eslint-env es6*/
const roles = {
  ["ROLE_ADMIN"]: { color: 'light-secondary', text: "Admin" },
  ["ROLE_CLIENT"]: { color: 'light-success', text: "Client" },
  ["ROLE_LP"]: { color: 'light-primary', text: "Consultant juridique" },
  ["ROLE_DEV"]: { color: 'light-info', text: "Developperur" }
}

/*eslint quote-props: ["error", "consistent"]*/
/*eslint-env es6*/
const statusColors = {
  "active": 'light-success',
  "inactive": 'light-danger'
}

const UserInfoCard = ({ selectedUser, setRefresh, sendRequest }) => {
  const fullName = `${selectedUser.firstName} ${selectedUser.lastName}`
  const [show, setShow] = useState(false)

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      lastName: selectedUser.lastName,
      firstName: selectedUser.firstName,
      email: selectedUser.email,
      phoneNumber: selectedUser.phoneNumber
    }
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.lpData !== null && selectedUser.lpData.image) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          crossOrigin='anonymous'
          src={`${env.API_URL}/${selectedUser.lpData.image}`}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      const stateNum = Math.floor(Math.random() * 2),
        states = ['light-danger', 'light-warning'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded mt-3 mb-2'
          content={fullName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  const onSubmit = async data => {
    if (Object.values(data).every(field => field.length > 0)) {
      await sendRequest(`${env.API_URL}/users/${selectedUser.id}`, "PATCH", JSON.stringify(data))
      setRefresh(prev => !prev)
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleActivation = () => {
    let message = "activer ce compte"
    let action = "activate"
    if (selectedUser.isActivated) {
      message = "desactiver ce compte"
      action = "deactivate"
    }
    confirm(message, 'warning', async () => {
      const response = await sendRequest(`${env.API_URL}/users/${action}/${selectedUser.id}`, "POST")
      if (!response || response.statusCode > 300) throw new Error()
      setRefresh(prev => !prev)
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser !== null ? fullName : 'Avocatoo User'}</h4>
                  {selectedUser !== null ? (
                    <Badge color={roles[selectedUser.role].color} className='text-capitalize'>
                      {roles[selectedUser.role].text}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75 ms-1'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <FontAwesomeIcon className='font-medium-2'  icon={faCircleDollarToSlot}/>              
              </Badge>
              <div className='ms-75'>
                <h6 className='mb-0'>268</h6>
                <small>Avocatoo Points</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <FontAwesomeIcon className='font-medium-2'  icon={faTicket}/>
              </Badge>
              <div className='ms-75'>
                <h6 className='mb-0'>4</h6>
                <small>Tickets réalisé</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>email:</span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>date de naissance: </span>
                  <span>{new Date(selectedUser.dateOfBirth).toLocaleDateString()}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status du compte:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser.isActivated ? "active" : "inactive"]}>
                    {selectedUser.isActivated ? "activé" : "compte désactivé"}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>{selectedUser.phoneNumber}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Modifier
            </Button>
            <Button className='ms-1' color='danger' outline onClick={handleActivation}>
              {selectedUser.isActivated ? "Désactiver" : "activer"}
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-md'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Modifier les informations de l'utilisateur</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  Prénom
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='firstName'
                  name='firstName'
                  render={({ field }) => (
                    <Input {...field} id='firstName' placeholder='Prénom' invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  Nom
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lastName'
                  name='lastName'
                  render={({ field }) => (
                    <Input {...field} id='lastName' placeholder='Nom' invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col xs={6}>
                <Label className='form-label' for='email'>
                  email
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='email'
                  name='email'
                  render={({ field }) => (
                    <Input {...field} id='email' placeholder='xyz@email.com' invalid={errors.email && true} />
                  )}
                />
              </Col>
              <Col xs={6}>
                <Label className='form-label' for='phoneNumber'>
                  num de téléphone
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='phoneNumber'
                  name='phoneNumber'
                  render={({ field }) => (
                    <Input {...field} id='phoneNumber'  invalid={errors.phoneNumber && true} />
                  )}
                />
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Confirmer
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => setShow(false)}
                >
                  Annuler
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
