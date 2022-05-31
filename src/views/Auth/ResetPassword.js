import { Link, useHistory, useParams } from 'react-router-dom'
import { ChevronLeft, Lock } from 'react-feather'
import InputPassword from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, Label, Button, Spinner } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import { Brand } from '../../assets/svg/brand'
import SpinnerComponent from '../../@core/components/spinner/Fallback-spinner'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Slide, toast } from 'react-toastify'
import env from 'react-dotenv'
import Avatar from '@components/avatar'
import config from "../../configs/themeConfig"

const ResetPassword = () => {
    let {hash} = useParams()
    hash = decodeURIComponent(hash)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [password, setPassword] = useState("")
    const [confirmPassword, setComfirmPassword] = useState("")

    useEffect(() => {
        (async function isHashValid() {
            const url = `${env.API_URL}/auth/reset-password/hash/valid/${hash}`
            const response = await axios.post(url)
            if (!response) history.push("/")
            const isValid = response.data.isValid
                if (!isValid) {
                history.push("/")
                toast.success(
                    <div className="toastify-header">
                    <div className="title-wrapper">
                        <Avatar size="sm" color="danger" icon={<Lock size={12} />} />
                        <h6 className="toast-title fw-bold">Lien non valide</h6>
                    </div>
                    </div>,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
            }
            setIsLoading(false)
        })()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `${env.API_URL}/auth/reset-password`
        if (password === confirmPassword) { 
            await axios.post(url, {password, hash})
                history.push("/")
                toast.success(
                    <div className="toastify-header">
                    <div className="title-wrapper">
                        <Avatar size="sm" color="success" icon={<Lock size={12} />} />
                        <h6 className="toast-title fw-bold">Mot de passe réinitialisé</h6>
                    </div>
                    </div>,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
                )
        }
    }
    

    if (isLoading) {
        return <SpinnerComponent />
    }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <div className='brand-logo'>
              <Brand />
              <h2 className='brand-text text-primary ms-1'>{config.app.appName}</h2>
            </div>
            <CardTitle tag='h4' className='mb-1 brand-logo'>
              Réinitialisation mot de passe🔒
            </CardTitle>
            <Form className='auth-reset-password-form mt-2' onSubmit={handleSubmit}>
              <div className='mb-1'>
                <Label className='form-label' for='new-password'>
                  Nouveau mot de passe
                </Label>
                <InputPassword className='input-group-merge' id='new-password' autoFocus onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='confirm-password'>
                  Confirmer le mot de passe
                </Label>
                <InputPassword className='input-group-merge' id='confirm-password' onChange={(e) => setComfirmPassword(e.target.value)}/>
              </div>
              <Button color='primary' type="submit" block>
                Confirmer
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/login'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Retour</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ResetPassword
