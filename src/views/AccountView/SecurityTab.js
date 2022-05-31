// ** React Imports
import { Fragment } from 'react'
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback
} from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import * as yup from 'yup'
import 'cleave.js/dist/addons/cleave-phone.us'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { confirm } from '../../utility/Utils'
import env from 'react-dotenv'

const SignupSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})


const defaultValues = {
  password: '',
  confirmPassword: ''
}


const SecurityTab = ({user, sendRequest, setRefresh}) => {
  // ** Hooks
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    trigger()
    confirm("changer le mot de passe", 'warning', async () => {
      const response = await sendRequest(`${env.API_URL}/users/${user.id}`, "PATCH", JSON.stringify({password: data.password}))
      if (!response || response.statusCode > 300) throw new Error()
      setRefresh(prev => !prev)
    })
  }
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Changer le mot de passe</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className='mb-2' md={6}>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='nouveau mot de passe'
                      htmlFor='password'
                      className='input-group-merge'
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors.password && <FormFeedback className='d-block'>{errors.password.message}</FormFeedback>}
              </Col>
              <Col className='mb-2' md={6}>
                <Controller
                  control={control}
                  id='confirmPassword'
                  name='confirmPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Confirmer mot de passe'
                      htmlFor='confirmPassword'
                      className='input-group-merge'
                      invalid={errors.confirmPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormFeedback className='d-block'>{errors.confirmPassword.message}</FormFeedback>
                )}
              </Col>
              <Col xs={12}>
                <Button type='submit' color='primary'>
                  Confirmer
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default SecurityTab
