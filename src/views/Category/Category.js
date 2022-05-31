// ** React Imports
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from "@components/breadcrumbs"


// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
  FormFeedback
} from 'reactstrap'

import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import AvatarGroup from '@components/avatar-group'

// ** FAQ Illustrations
import illustration from '@src/assets/images/illustration/faq-illustrations.svg'

// ** Vars
const data = [
  {
    totalUsers: 25,
    title: 'Droit administratif',
    users: [
      {
        size: 'sm',
        title: 'Consultant 1',
        img: require('@src/assets/images/avatars/2.png').default
      },
      {
        size: 'sm',
        title: 'Consultant 2',
        img: require('@src/assets/images/avatars/12.png').default
      },
      {
        size: 'sm',
        title: 'Consultant 3',
        img: require('@src/assets/images/avatars/6.png').default
      },
      {
        size: 'sm',
        title: 'Consultant 4',
        img: require('@src/assets/images/avatars/11.png').default
      }
    ]
  },
  {
    totalUsers: 32,
    title: 'droit financier',
    users: [
      {
        size: 'sm',
        title: 'Consultant 1',
        img: require('@src/assets/images/avatars/4.png').default
      },
      {
        size: 'sm',
        title: 'Consultant 2',
        img: require('@src/assets/images/avatars/1.png').default
      },
      {
        size: 'sm',
        title: 'KConsultant 3',
        img: require('@src/assets/images/avatars/2.png').default
      },
      {
        size: 'sm',
        title: 'Consultant 1',
        img: require('@src/assets/images/avatars/5.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/7.png').default
      }
    ]
  },
  {
    totalUsers: 15,
    title: 'Droit civil',
    users: [
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/6.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/9.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/2.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/10.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/8.png').default
      }
    ]
  },
  {
    totalUsers: 13,
    title: 'Droit de la famille',
    users: [
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/3.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/9.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/12.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/10.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/11.png').default
      }
    ]
  },
  {
    totalUsers: 12,
    title: 'Droit du travail',
    users: [
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/10.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/6.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/3.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/8.png').default
      },
      {
        size: 'sm',
        title: 'Consultant x',
        img: require('@src/assets/images/avatars/9.png').default
      }
    ]
  }
]


const RoleCards = () => {
  const [show, setShow] = useState(false)
  const [modalType, setModalType] = useState('Ajouter')

  // ** Hooks
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { roleName: '' } })

  const onSubmit = data => {
    if (data.roleName.length) {
      setShow(false)
    } else {
      setError('roleName', {
        type: 'manual'
      })
    }
  }

  const onReset = () => {
    setShow(false)
    reset({ roleName: '' })
  }

  const handleModalClosed = () => {
    setModalType('Add New')
    setValue('roleName')
  }

  return (
    <Fragment>
            <Breadcrumbs
        breadCrumbTitle="Catégorie"
        breadCrumbParent="Gestion des posts"
        breadCrumbActive="Catégorie"
      />
      <Row>
        {data.map((item, index) => {
          return (
            <Col key={index} xl={4} md={6}>
              <Card>
                <CardBody>
                  <div className='d-flex justify-content-between'>
                    <span>{` ${item.totalUsers} consultants compétants`}</span>
                    <AvatarGroup data={item.users} />
                  </div>
                  <div className='d-flex justify-content-between align-items-end mt-1 pt-25'>
                    <div className='role-heading'>
                      <h4 className='fw-bolder'>{item.title}</h4>
                      <Link
                        to='/'
                        className='role-edit-modal'
                        onClick={e => {
                          e.preventDefault()
                          setModalType('Modifier')
                          setShow(true)
                        }}
                      >
                        <small className='fw-bolder'>Modifier la catégorie</small>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          )
        })}
        <Col xl={4} md={6}>
          <Card>
            <Row>
              <Col sm={5}>
                <div className='d-flex align-items-end justify-content-center h-100'>
                  <img className='img-fluid mt-2' src={illustration} alt='Image' width={85} />
                </div>
              </Col>
              <Col sm={7}>
                <CardBody className='text-sm-end text-center ps-sm-0'>
                  <Button
                    color='primary'
                    className='text-nowrap mb-1'
                    style={{fontSize: '12px'}}
                    onClick={() => {
                      setModalType('Ajouter')
                      setShow(true)
                    }}
                  >
                    Ajouter une catégorie
                  </Button>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        isOpen={show}
        onClosed={handleModalClosed}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-5 pb-5'>
          <div className='text-center mb-4'>
            <h1>{modalType} Catégorie</h1>
          </div>
          <Row tag='form' onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
              <Label className='form-label' for='roleName'>
                Nom
              </Label>
              <Controller
                name='roleName'
                control={control}
                render={({ field }) => (
                  <Input {...field} id='roleName' placeholder='nom du categorie' invalid={errors.roleName && true} />
                )}
              />
              {errors.roleName && <FormFeedback>Please enter a valid name</FormFeedback>}
            </Col>
            <Col className='text-center mt-2' xs={12}>
              <Button type='submit' color='primary' className='me-1'>
                Confirmer
              </Button>
              <Button type='reset' outline onClick={onReset}>
                Annuler
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default RoleCards
