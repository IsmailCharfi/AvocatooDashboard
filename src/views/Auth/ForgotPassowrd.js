import { Link, useHistory } from "react-router-dom"
import { ChevronLeft, Mail } from "react-feather"
import { Brand } from "../../assets/svg/brand"
import Avatar from '@components/avatar'
import {Card, CardBody, CardTitle, CardText, Form, Label, Input, Button} from "reactstrap"
import config from "../../configs/themeConfig"
import axios from "axios"

// ** Styles
import "@styles/react/pages/page-authentication.scss"
import env from "react-dotenv"
import { Slide, toast } from "react-toastify"

const ForgotPassword = () => {

    const history = useHistory()
    
    const handleSubmit = (evt) => {
        evt.preventDefault()
        const url = `${env.API_URL}/mail/send/reset-password`
        const email = evt.target.email.value
        axios.post(url, { email })
        history.push("/login")
        toast.success(
            <div className="toastify-header">
              <div className="title-wrapper">
                <Avatar size="sm" color="success" icon={<Mail size={12} />} />
                <h6 className="toast-title fw-bold">Mail de réinitialisation envoyé</h6>
              </div>
            </div>,
          { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
    } 

  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <div className="brand-logo">
              <Brand />
              <h2 className="brand-text text-primary ms-1">
                {config.app.appName}
              </h2>
            </div>
            <CardTitle tag="h4" className="mb-1 brand-logo">
              Mot de passe oublié? 🔒
            </CardTitle>
            <CardText className="mb-2">
              Entrez votre email et nous vous enverrons un mail de
              réinitialisation
            </CardText>
            <Form
              className="auth-forgot-password-form mt-2"
              onSubmit={handleSubmit}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="login-email"
                  placeholder="xyz@example.com"
                  autoFocus
                  required
                />
              </div>
              <Button color="primary" type="submit" block>
                Envoyer
              </Button>
            </Form>
            <p className="text-center mt-2">
              <Link to="/login">
                <ChevronLeft className="rotate-rtl me-25" size={14} />
                <span className="align-middle">Retour</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPassword
