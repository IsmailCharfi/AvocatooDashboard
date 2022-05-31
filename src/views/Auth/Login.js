import { useSkin } from '@hooks/useSkin'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, Form, Label, Input, Button } from 'reactstrap'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

import '@styles/react/pages/page-authentication.scss'
import { Brand } from '../../assets/svg/brand'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { handleLogin } from '@store/authentication'
import { Fragment } from 'react'
import { Bell, Coffee, X } from 'react-feather'
import { isUserLoggedIn } from '../../auth/utils'
import config from '../../configs/themeConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsClapping } from '@fortawesome/free-solid-svg-icons'


const LoginCover = () => {
  const { skin } = useSkin()
  const history = useHistory()
  const dispatch = useDispatch()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({defaultValues: {loginEmail: "", password: ""}})

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  
    const ToastContent = ({ name }) => (
      <Fragment>
        <div className='toastify-header'>
          <div className='title-wrapper'>
            <Avatar size='sm' color='success' icon={<FontAwesomeIcon icon={faHandsClapping}/>} />
            <h6 className='toast-title fw-bold'>Bonjour, {name}</h6>
          </div>
        </div>
      </Fragment>
    )

    const onSubmit = data => {
      if (Object.values(data).every(field => field.length > 0)) {
        useJwt
          .login({ email: data.loginEmail, password: data.password })
          .then(res => {
            const data = { ...res.data.data.userData, accessToken: res.data.data.accessToken }
            dispatch(handleLogin(data))
            history.push("/")
            if (isUserLoggedIn()) {
              toast.success(
                <ToastContent name={data.firstName || config.app.appName} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 1500 }
              )
            }
          })
          .catch(error => {
            setError("loginEmail")
            setError("password")
            toast.error(
              <div className="toastify-header">
                <div className="title-wrapper">
                  <Avatar size="sm" color="danger" icon={<X size={12} />} />
                  <h6 className="toast-title fw-bold">{error.response.data.message}</h6>
                </div>
              </div>,
              { icon: false, transition: Slide, hideProgressBar: true, autoClose: 5000 }
            )

          })
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

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <div className='brand-logo' aria-disabled>
          <Brand />
          <h2 className='brand-text text-primary ms-1'>{config.app.appName}</h2>
        </div>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <div className="d-flex justify-content-center">
            <CardTitle tag='h2' className='brand-text text-primary fw-bold mb-1'>
            <Brand className="me-1" />
            Avocatoo Dashboard
            </CardTitle>
            </div>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='xyz@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  ) }
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Mot de passe
                  </Label>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <Button type='submit' color='primary' block>
                Se connecter
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Mot de passe oublié?</span>
              <Link to='/forgot-password'>
                réinitialiser le
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default LoginCover